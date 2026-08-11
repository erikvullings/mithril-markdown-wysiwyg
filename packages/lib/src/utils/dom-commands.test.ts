import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  continueTaskListItem,
  formatBlockquoteWYSIWYG,
  insertHorizontalRuleWYSIWYG,
  insertTaskListWYSIWYG,
  type ContentEditableElement,
} from "./dom-commands";

const setCollapsedSelection = (node: Node, offset: number): void => {
  const range = document.createRange();
  range.setStart(node, offset);
  range.collapse(true);
  const selection = document.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

const setCursorAtEnd = (node: Node): void => {
  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(false);
  const selection = document.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

describe("continueTaskListItem", () => {
  it("returns null when the cursor is not inside a task list item", () => {
    document.body.innerHTML =
      "<div contenteditable><ul><li>plain item</li></ul></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    setCursorAtEnd(li.firstChild as Node);

    expect(continueTaskListItem(el)).toBeNull();
  });

  it("returns null for an empty task item, leaving native Enter to exit the list", () => {
    document.body.innerHTML =
      '<div contenteditable><ul><li><input type="checkbox"> </li></ul></div>';
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    setCursorAtEnd(li);

    expect(continueTaskListItem(el)).toBeNull();
  });

  it("splits a non-empty task item into two task items, the new one unchecked", () => {
    document.body.innerHTML =
      '<div contenteditable><ul><li><input type="checkbox"> task one</li></ul></div>';
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    setCursorAtEnd(li.lastChild as Node);

    const html = continueTaskListItem(el);

    expect(html).not.toBeNull();
    const items = el.querySelectorAll("li");
    expect(items.length).toBe(2);
    const firstCheckbox = items[0].querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    const secondCheckbox = items[1].querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(firstCheckbox).toBeTruthy();
    expect(secondCheckbox).toBeTruthy();
    expect(secondCheckbox.checked).toBe(false);
  });

  it("keeps a checked item's own checkbox checked, but the new item unchecked", () => {
    document.body.innerHTML =
      '<div contenteditable><ul><li><input type="checkbox" checked> done</li></ul></div>';
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    setCursorAtEnd(li.lastChild as Node);

    continueTaskListItem(el);

    const items = el.querySelectorAll("li");
    const firstCheckbox = items[0].querySelector(
      "input",
    ) as HTMLInputElement;
    const secondCheckbox = items[1].querySelector(
      "input",
    ) as HTMLInputElement;
    expect(firstCheckbox.checked).toBe(true);
    expect(secondCheckbox.checked).toBe(false);
  });

  it("moves the text after the cursor into the new item, keeping the rest in place", () => {
    document.body.innerHTML =
      '<div contenteditable><ul><li><input type="checkbox"> hello world</li></ul></div>';
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    const textNode = li.lastChild as Text; // " hello world"
    const splitAt = textNode.textContent!.indexOf(" world");
    setCollapsedSelection(textNode, splitAt);

    continueTaskListItem(el);

    const items = el.querySelectorAll("li");
    expect(items[0].textContent?.trim()).toBe("hello");
    expect(items[1].textContent?.trim()).toBe("world");
  });

  it("places the cursor right after the new item's checkbox", () => {
    document.body.innerHTML =
      '<div contenteditable><ul><li><input type="checkbox"> task one</li></ul></div>';
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    setCursorAtEnd(li.lastChild as Node);

    continueTaskListItem(el);

    const newLi = el.querySelectorAll("li")[1];
    const selection = document.getSelection();
    const range = selection?.getRangeAt(0);
    expect(range?.startContainer).toBe(newLi);
    expect(range?.collapsed).toBe(true);
  });
});

describe("insertTaskListWYSIWYG", () => {
  it("adds an unchecked checkbox to a plain list item at the cursor", () => {
    document.body.innerHTML =
      "<div contenteditable><ul><li>buy milk</li></ul></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    setCursorAtEnd(li.firstChild as Node);

    const html = insertTaskListWYSIWYG(el);

    const checkbox = li.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox).toBeTruthy();
    expect(checkbox.checked).toBe(false);
    expect(li.textContent?.trim()).toBe("buy milk");
    expect(html).toContain('type="checkbox"');
  });

  it("removes the checkbox from an already-task item, back to a plain item", () => {
    document.body.innerHTML =
      '<div contenteditable><ul><li><input type="checkbox"> buy milk</li></ul></div>';
    const el = document.querySelector("div") as ContentEditableElement;
    const li = document.querySelector("li") as HTMLLIElement;
    setCursorAtEnd(li.lastChild as Node);

    insertTaskListWYSIWYG(el);

    expect(li.querySelector('input[type="checkbox"]')).toBeNull();
    expect(li.textContent?.trim()).toBe("buy milk");
  });
});

describe("formatBlockquoteWYSIWYG", () => {
  let execCommandSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    execCommandSpy = vi.fn();
    document.execCommand = execCommandSpy as unknown as typeof document.execCommand;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("wraps the current block in a blockquote when not already in one", () => {
    document.body.innerHTML = "<div contenteditable><p>hello</p></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const p = document.querySelector("p") as HTMLElement;
    setCursorAtEnd(p.firstChild as Node);

    formatBlockquoteWYSIWYG(el);

    expect(execCommandSpy).toHaveBeenCalledWith(
      "formatBlock",
      false,
      "blockquote",
    );
  });

  it("reverts to a paragraph instead of nesting another blockquote", () => {
    document.body.innerHTML =
      "<div contenteditable><blockquote><p>hello</p></blockquote></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const p = document.querySelector("p") as HTMLElement;
    setCursorAtEnd(p.firstChild as Node);

    formatBlockquoteWYSIWYG(el);

    expect(execCommandSpy).toHaveBeenCalledWith("formatBlock", false, "p");
  });
});

describe("insertHorizontalRuleWYSIWYG", () => {
  it("inserts a new hr when the cursor isn't next to one", () => {
    document.body.innerHTML = "<div contenteditable><p>hello</p></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const p = document.querySelector("p") as HTMLElement;
    setCursorAtEnd(p.firstChild as Node);
    document.execCommand = vi.fn(
      (command: string, _ui?: boolean, value?: string) => {
        if (command === "insertHTML" && value) {
          const range = document.getSelection()!.getRangeAt(0);
          range.insertNode(document.createRange().createContextualFragment(value));
        }
        return true;
      },
    ) as unknown as typeof document.execCommand;

    insertHorizontalRuleWYSIWYG(el);

    expect(el.querySelectorAll("hr").length).toBe(1);
  });

  it("removes the adjacent hr instead of inserting a second one, cursor right after it", () => {
    document.body.innerHTML =
      "<div contenteditable><p>before</p><hr><p>after</p></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const afterP = el.querySelectorAll("p")[1];
    setCollapsedSelection(afterP.firstChild as Node, 0);

    const html = insertHorizontalRuleWYSIWYG(el);

    expect(el.querySelectorAll("hr").length).toBe(0);
    expect(html).not.toContain("<hr>");
  });

  it("removes the adjacent hr with the cursor right before it", () => {
    document.body.innerHTML =
      "<div contenteditable><p>before</p><hr><p>after</p></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const beforeP = el.querySelectorAll("p")[0];
    setCursorAtEnd(beforeP.firstChild as Node);

    insertHorizontalRuleWYSIWYG(el);

    expect(el.querySelectorAll("hr").length).toBe(0);
  });

  it("does not remove an hr the cursor merely sits near but isn't adjacent to", () => {
    document.body.innerHTML =
      "<div contenteditable><p>before</p><hr><p>middle</p><hr><p>after</p></div>";
    const el = document.querySelector("div") as ContentEditableElement;
    const middleP = el.querySelectorAll("p")[1];
    setCollapsedSelection(middleP.firstChild as Node, 3); // mid-word, not adjacent to either hr
    const bothHrsBefore = Array.from(el.querySelectorAll("hr"));
    document.execCommand = vi.fn(() => true) as unknown as typeof document.execCommand;

    insertHorizontalRuleWYSIWYG(el);

    // A mid-text click isn't "adjacent" to either hr, so it should fall
    // through to inserting a new one rather than removing an existing one.
    bothHrsBefore.forEach((hr) => expect(hr.isConnected).toBe(true));
  });
});
