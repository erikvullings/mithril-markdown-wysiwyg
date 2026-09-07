import { describe, expect, it, vi } from "vitest";
import { PAGE_BREAK_HTML } from "slimdown-js";
import { EditorActions } from "./editor-actions";

const makeKeyEvent = (
  overrides: Partial<{
    key: string;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
  }> = {},
) => ({
  key: "Enter",
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  ...overrides,
});

const makeEditor = () => {
  const notified: string[] = [];
  const actions = new EditorActions((content) => {
    notified.push(content);
    // Mirrors how editor.ts's handleContentChange re-feeds every WYSIWYG
    // content change (typing or an undo/redo notification alike) back into
    // the history — recordHistory must ignore this while restoring, or
    // undo/redo would corrupt their own stacks.
    actions.recordHistory(content);
  });
  actions.setMode("wysiwyg");
  const div = document.createElement("div");
  div.innerHTML = "hello";
  actions.setContentEditable(div);
  actions.initHistory(div.innerHTML);
  return { actions, div, notified };
};

describe("EditorActions undo/redo history", () => {
  it("has nothing to undo right after initialization", () => {
    const { actions } = makeEditor();

    expect(actions.canUndo()).toBe(false);
    expect(actions.canRedo()).toBe(false);
  });

  it("undoes a WYSIWYG edit back to the prior content", () => {
    const { actions, div, notified } = makeEditor();

    div.innerHTML = "hello world";
    actions.recordHistory(div.innerHTML);
    expect(actions.canUndo()).toBe(true);

    actions.undo();

    expect(div.innerHTML).toBe("hello");
    expect(notified[notified.length - 1]).toBe("hello");
  });

  it("redoes back to the edit after an undo", () => {
    const { actions, div } = makeEditor();

    div.innerHTML = "hello world";
    actions.recordHistory(div.innerHTML);
    actions.undo();

    expect(actions.canRedo()).toBe(true);
    actions.redo();

    expect(div.innerHTML).toBe("hello world");
  });

  it("does not undo or redo in markdown mode", () => {
    const { actions, div } = makeEditor();
    div.innerHTML = "hello world";
    actions.recordHistory(div.innerHTML);

    actions.setMode("markdown");
    expect(actions.canUndo()).toBe(false);

    actions.undo();
    expect(div.innerHTML).toBe("hello world");
  });
});

describe("EditorActions.handleKeyDown", () => {
  it("continues a markdown list on Enter and notifies the resulting content", () => {
    const notified: string[] = [];
    const actions = new EditorActions((content) => notified.push(content));
    actions.setMode("markdown");
    const textarea = document.createElement("textarea");
    textarea.value = "- item 1";
    document.body.appendChild(textarea);
    textarea.setSelectionRange(8, 8);
    actions.setTextarea(textarea);

    actions.handleKeyDown(makeKeyEvent({ key: "Enter" }) as unknown as Event);

    expect(textarea.value).toBe("- item 1\n- ");
    expect(notified[notified.length - 1]).toBe("- item 1\n- ");
  });

  it("starts a Markdown paragraph on Enter", () => {
    const notified: string[] = [];
    const actions = new EditorActions((content) => notified.push(content));
    actions.setMode("markdown");
    const textarea = document.createElement("textarea");
    textarea.value = "first";
    textarea.setSelectionRange(5, 5);
    actions.setTextarea(textarea);
    const event = makeKeyEvent({ key: "Enter" });

    actions.handleKeyDown(event as unknown as Event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(textarea.value).toBe("first\n\n");
    expect(notified[notified.length - 1]).toBe("first\n\n");
  });

  it("starts a hard line break on Shift+Enter", () => {
    const notified: string[] = [];
    const actions = new EditorActions((content) => notified.push(content));
    actions.setMode("markdown");
    const textarea = document.createElement("textarea");
    textarea.value = "first";
    textarea.setSelectionRange(5, 5);
    actions.setTextarea(textarea);
    const event = makeKeyEvent({ key: "Enter", shiftKey: true });

    actions.handleKeyDown(event as unknown as Event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(textarea.value).toBe("first  \n");
    expect(notified[notified.length - 1]).toBe("first  \n");
  });

  it.each(["~~~", "``````"])(
    "uses a single newline inside a %s fenced code block",
    (fence) => {
      const actions = new EditorActions();
      actions.setMode("markdown");
      const textarea = document.createElement("textarea");
      textarea.value = `${fence}\ncode`;
      document.body.appendChild(textarea);
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      actions.setTextarea(textarea);

      actions.handleKeyDown(
        makeKeyEvent({ key: "Enter" }) as unknown as Event,
      );

      expect(textarea.value).toBe(`${fence}\ncode\n`);
    },
  );

  it("indents on Tab in markdown mode and notifies the resulting content", () => {
    const notified: string[] = [];
    const actions = new EditorActions((content) => notified.push(content));
    actions.setMode("markdown");
    const textarea = document.createElement("textarea");
    textarea.value = "- item 1";
    document.body.appendChild(textarea);
    textarea.setSelectionRange(0, 0);
    actions.setTextarea(textarea);

    actions.handleKeyDown(makeKeyEvent({ key: "Tab" }) as unknown as Event);

    expect(textarea.value).toBe("  - item 1");
    expect(notified[notified.length - 1]).toBe("  - item 1");
  });

  it("continues a WYSIWYG task list item on Enter with a fresh checkbox", () => {
    const notified: string[] = [];
    const actions = new EditorActions((content) => notified.push(content));
    actions.setMode("wysiwyg");
    document.body.innerHTML =
      '<div contenteditable><ul><li><input type="checkbox"> task one</li></ul></div>';
    const div = document.querySelector("div") as HTMLElement;
    actions.setContentEditable(div);

    const li = document.querySelector("li") as HTMLLIElement;
    const range = document.createRange();
    range.selectNodeContents(li.lastChild as Node);
    range.collapse(false);
    const selection = document.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const event = makeKeyEvent({ key: "Enter" });
    actions.handleKeyDown(event as unknown as Event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(div.querySelectorAll("li").length).toBe(2);
    expect(
      div.querySelectorAll("li")[1].querySelector('input[type="checkbox"]'),
    ).toBeTruthy();
    expect(notified.length).toBeGreaterThan(0);
  });

  it("leaves plain WYSIWYG list Enter handling to the browser", () => {
    const actions = new EditorActions();
    actions.setMode("wysiwyg");
    document.body.innerHTML = "<div contenteditable><ul><li>plain</li></ul></div>";
    const div = document.querySelector("div") as HTMLElement;
    actions.setContentEditable(div);

    const li = document.querySelector("li") as HTMLLIElement;
    const range = document.createRange();
    range.selectNodeContents(li.firstChild as Node);
    range.collapse(false);
    const selection = document.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const event = makeKeyEvent({ key: "Enter" });
    actions.handleKeyDown(event as unknown as Event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(div.querySelectorAll("li").length).toBe(1);
  });
});

describe("EditorActions taskList action", () => {
  it("turns the current markdown line into a task item via executeAction", () => {
    const notified: string[] = [];
    const actions = new EditorActions((content) => notified.push(content));
    actions.setMode("markdown");
    const textarea = document.createElement("textarea");
    textarea.value = "buy milk";
    document.body.appendChild(textarea);
    textarea.setSelectionRange(4, 4);
    actions.setTextarea(textarea);

    actions.executeAction("taskList");

    expect(textarea.value).toBe("- [ ] buy milk");
    expect(notified[notified.length - 1]).toBe("- [ ] buy milk");
  });

  describe("EditorActions pageBreak action", () => {
    it("inserts the portable page-break marker in Markdown mode", () => {
      const actions = new EditorActions();
      actions.setMode("markdown");
      const textarea = document.createElement("textarea");
      textarea.value = "before";
      textarea.setSelectionRange(6, 6);
      actions.setTextarea(textarea);

      actions.executeAction("pageBreak");

      expect(textarea.value).toBe(
        "before\n\n<!-- markdown:page-break -->\n\n",
      );
    });

    it("inserts the semantic element in WYSIWYG mode with undo and redo", () => {
      const { actions, div } = makeEditor();
      const originalExecCommand = document.execCommand;
      document.execCommand = vi.fn((_command, _showUi, value) => {
        div.insertAdjacentHTML("beforeend", String(value));
        return true;
      }) as typeof document.execCommand;

      try {
        actions.executeAction("pageBreak");
        expect(
          div.querySelector('[data-markdown-page-break="true"]')?.outerHTML,
        ).toBe(PAGE_BREAK_HTML);

        actions.undo();
        expect(
          div.querySelector('[data-markdown-page-break="true"]'),
        ).toBeNull();

        actions.redo();
        expect(
          div.querySelector('[data-markdown-page-break="true"]')?.outerHTML,
        ).toBe(PAGE_BREAK_HTML);
      } finally {
        document.execCommand = originalExecCommand;
      }
    });
  });

  it("adds a checkbox to the current WYSIWYG list item via executeAction", () => {
    const notified: string[] = [];
    const actions = new EditorActions((content) => notified.push(content));
    actions.setMode("wysiwyg");
    document.body.innerHTML =
      "<div contenteditable><ul><li>buy milk</li></ul></div>";
    const div = document.querySelector("div") as HTMLElement;
    actions.setContentEditable(div);

    const li = document.querySelector("li") as HTMLLIElement;
    const range = document.createRange();
    range.selectNodeContents(li.firstChild as Node);
    range.collapse(false);
    const selection = document.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    actions.executeAction("taskList");

    expect(li.querySelector('input[type="checkbox"]')).toBeTruthy();
    expect(notified.length).toBeGreaterThan(0);
  });
});

describe("EditorActions.getMode", () => {
  it("reflects the most recent setMode call, for callbacks constructed before a mode switch", () => {
    // Mirrors editor.ts: the onContentChange callback passed to the
    // constructor is created once, before the user has necessarily settled
    // on a mode. It must look up the CURRENT mode via getMode() at call
    // time rather than a mode captured in its closure at construction time,
    // or content changes made after switching modes get misclassified.
    const actions = new EditorActions();
    expect(actions.getMode()).toBe("wysiwyg");

    actions.setMode("markdown");

    expect(actions.getMode()).toBe("markdown");
  });
});
