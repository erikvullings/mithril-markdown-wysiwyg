import m from "mithril";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MarkdownEditor } from "./editor";
import "./styles.css";
import type { MarkdownEditorAttrs } from "./types";

const roots: HTMLElement[] = [];

const mountEditor = (attrs: MarkdownEditorAttrs): HTMLElement => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  roots.push(root);
  m.mount(root, {
    view: () => m(MarkdownEditor, attrs),
  });
  m.redraw.sync();
  return root;
};

afterEach(() => {
  for (const root of roots.splice(0)) {
    m.mount(root, null);
    root.remove();
  }
});

describe("MarkdownEditor modes", () => {
  it("can toggle both ways when initialized in Markdown mode", () => {
    const root = mountEditor({ content: "# Heading", mode: "markdown" });

    expect(root.querySelector("textarea")?.value).toBe("# Heading");
    const overlay = root.querySelector(".md-syntax-highlight") as HTMLElement;
    expect(overlay.textContent).toBe("# Heading");
    expect(getComputedStyle(overlay).color).not.toBe("");
    expect(getComputedStyle(overlay).color).not.toBe("transparent");
    const heading = overlay.querySelector(".md-syn-heading") as HTMLElement;
    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    expect(getComputedStyle(heading).fontWeight).toBe(
      getComputedStyle(textarea).fontWeight,
    );

    const tabs = root.querySelectorAll<HTMLButtonElement>(".md-tab-button");
    tabs[0].click();
    m.redraw.sync();
    expect(root.querySelector(".md-editable-area h1")?.textContent).toBe(
      "Heading",
    );

    root
      .querySelectorAll<HTMLButtonElement>(".md-tab-button")[1]
      .click();
    m.redraw.sync();
    expect(root.querySelector("textarea")?.value).toBe("# Heading");
  });

  it("hides base64 data only in the Markdown surface", () => {
    const source = "![cover](data:image/png;base64,AAABBBCCC===)";
    let changed = "";
    const root = mountEditor({
      content: source,
      mode: "markdown",
      hideBase64Images: true,
      onContentChange: (content) => {
        changed = content;
      },
    });

    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    expect(root.querySelector(".md-syntax-highlight")?.textContent).toContain(
      "hidden image 1",
    );
    expect(root.querySelector(".md-syntax-highlight")?.textContent).not.toContain(
      "AAABBBCCC",
    );
    expect(textarea?.value).toContain("hidden image 1");
    expect(textarea?.value).not.toContain("AAABBBCCC");

    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    textarea.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        shiftKey: true,
        bubbles: true,
      }),
    );
    expect(changed).toContain("AAABBBCCC===");

    const placeholderPosition = textarea.value.indexOf("hidden image") + 3;
    textarea.setSelectionRange(placeholderPosition, placeholderPosition);
    textarea.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
      }),
    );
    expect(changed).toContain("AAABBBCCC===");
    expect(changed).not.toContain("hidden");

    root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
    m.redraw.sync();
    expect(root.querySelector("img")?.getAttribute("src")).toBe(
      "data:image/png;base64,AAABBBCCC===",
    );
  });

  it("opens find and replace from platform shortcuts", () => {
    const root = mountEditor({
      content: "one two one",
      mode: "markdown",
    });
    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;

    textarea.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "h",
        metaKey: true,
        bubbles: true,
      }),
    );
    m.redraw.sync();

    const find = root.querySelector(".md-search-input") as HTMLInputElement;
    const replace = root.querySelector(".md-replace-input");
    expect(find).toBeTruthy();
    expect(replace).toBeTruthy();

    find.value = "one";
    find.dispatchEvent(new InputEvent("input", { bubbles: true }));
    m.redraw.sync();
    expect(root.querySelector(".md-search-count")?.textContent).toBe("1 of 2");

    const replacement = root.querySelector(
      ".md-replace-input",
    ) as HTMLInputElement;
    replacement.value = "three";
    replacement.dispatchEvent(new InputEvent("input", { bubbles: true }));
    const replaceButton = Array.from(
      root.querySelectorAll<HTMLButtonElement>(".md-search-action"),
    ).find((button) => button.textContent === "Replace");
    replaceButton?.click();
    m.redraw.sync();
    expect(textarea.value).toBe("three two one");
  });

  it("places the WYSIWYG cursor near the Markdown cursor", () => {
    const root = mountEditor({
      content: "First paragraph\n\nSecond paragraph",
      mode: "markdown",
    });

    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(20, 20);

    root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
    m.redraw.sync();

    const editable = root.querySelector(".md-editable-area") as HTMLElement;
    const selection = document.getSelection();
    expect(editable.contains(selection?.anchorNode ?? null)).toBe(true);
    expect(selection?.anchorNode?.textContent).toContain("Second");
  });

  it("keeps a cursor at the start of a paragraph on that paragraph", () => {
    const root = mountEditor({
      content: "First paragraph\n\nSecond paragraph",
      mode: "markdown",
    });
    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(
      textarea.value.indexOf("Second"),
      textarea.value.indexOf("Second"),
    );

    root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
    m.redraw.sync();

    expect(document.getSelection()?.anchorNode?.textContent).toContain(
      "Second",
    );
    expect(document.getSelection()?.anchorOffset).toBe(0);
  });

  it("places the Markdown cursor near the WYSIWYG cursor", () => {
    const markdown =
      "Before [link](https://very-long.example/path) after";
    const root = mountEditor({
      content: markdown,
      mode: "wysiwyg",
    });
    const linkText = root.querySelector("a")?.firstChild as Text;
    const range = document.createRange();
    range.setStart(linkText, linkText.length);
    range.collapse(true);
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(range);

    root
      .querySelectorAll<HTMLButtonElement>(".md-tab-button")[1]
      .click();
    m.redraw.sync();

    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.selectionStart).toBe(markdown.indexOf(")") + 1);
  });

  it.each(["before", "after"] as const)(
    "preserves the cursor immediately %s a page break",
    (side) => {
      const marker = "<!-- markdown:page-break -->";
      const markdown = `Before\n\n${marker}\n\nAfter`;
      const root = mountEditor({ content: markdown, mode: "markdown" });
      const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
      const position =
        markdown.indexOf(marker) + (side === "after" ? marker.length : 0);
      textarea.focus();
      textarea.setSelectionRange(position, position);

      root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
      m.redraw.sync();
      expect(
        root.querySelector('[data-markdown-page-break="true"]'),
      ).toBeTruthy();

      root
        .querySelectorAll<HTMLButtonElement>(".md-tab-button")[1]
        .click();
      m.redraw.sync();

      const restored = root.querySelector("textarea") as HTMLTextAreaElement;
      expect(restored.selectionStart).toBe(position);
      expect(restored.selectionEnd).toBe(position);
    },
  );

  it.each(["before", "after"] as const)(
    "preserves the cursor immediately %s a CRLF page break",
    (side) => {
      const marker = "<!-- markdown:page-break -->";
      const markdown = `Before\r\n\r\n${marker}\r\n\r\nAfter`;
      const normalizedMarkdown = `Before\n\n${marker}\n\nAfter`;
      const root = mountEditor({ content: markdown, mode: "markdown" });
      const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
      const position =
        markdown.indexOf(marker) + (side === "after" ? marker.length : 0);
      textarea.focus();
      textarea.setSelectionRange(position, position);

      root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
      m.redraw.sync();
      root.querySelectorAll<HTMLButtonElement>(".md-tab-button")[1].click();
      m.redraw.sync();

      const restored = root.querySelector("textarea") as HTMLTextAreaElement;
      const expected =
        normalizedMarkdown.indexOf(marker) +
        (side === "after" ? marker.length : 0);
      expect(restored.value).toBe(normalizedMarkdown);
      expect(restored.selectionStart).toBe(expected);
      expect(restored.selectionEnd).toBe(expected);
    },
  );

  it("preserves scroll position in both mode changes", () => {
    const root = mountEditor({
      content: "First\n\nSecond\n\nThird",
      mode: "markdown",
    });
    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    textarea.scrollTop = 120;
    textarea.scrollLeft = 7;

    root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
    m.redraw.sync();

    const editable = root.querySelector(".md-editable-area") as HTMLElement;
    expect(editable.scrollTop).toBe(120);
    expect(editable.scrollLeft).toBe(7);
    editable.scrollTop = 80;
    editable.scrollLeft = 3;

    root.querySelectorAll<HTMLButtonElement>(".md-tab-button")[1].click();
    m.redraw.sync();

    const restored = root.querySelector("textarea") as HTMLTextAreaElement;
    expect(restored.scrollTop).toBe(80);
    expect(restored.scrollLeft).toBe(3);
  });

  it("keeps the page-break toolbar action available in both modes", () => {
    const root = mountEditor({ content: "Before", mode: "markdown" });

    expect(
      root.querySelector<HTMLButtonElement>('button[title="Page Break"]')
        ?.disabled,
    ).toBe(false);

    root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
    m.redraw.sync();

    expect(
      root.querySelector<HTMLButtonElement>('button[title="Page Break"]')
        ?.disabled,
    ).toBe(false);
  });

  it("inserts page breaks from the toolbar in both modes", () => {
    const root = mountEditor({ content: "Before", mode: "markdown" });
    const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    root
      .querySelector<HTMLButtonElement>('button[title="Page Break"]')
      ?.click();
    m.redraw.sync();
    expect(textarea.value).toBe(
      "Before\n\n<!-- markdown:page-break -->\n\n",
    );

    root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
    m.redraw.sync();
    const originalExecCommand = document.execCommand;
    document.execCommand = vi.fn((_command, _showUi, value) => {
      root
        .querySelector(".md-editable-area")
        ?.insertAdjacentHTML("beforeend", String(value));
      return true;
    }) as typeof document.execCommand;

    try {
      root
        .querySelector<HTMLButtonElement>('button[title="Page Break"]')
        ?.click();
      m.redraw.sync();
      expect(
        root.querySelectorAll('[data-markdown-page-break="true"]'),
      ).toHaveLength(2);
    } finally {
      document.execCommand = originalExecCommand;
    }
  });

  it("round-trips a page break through both editor modes", () => {
    const marker = "<!-- markdown:page-break -->";
    const markdown = `Before\n\n${marker}\n\nAfter`;
    const root = mountEditor({ content: markdown, mode: "markdown" });

    root.querySelector<HTMLButtonElement>(".md-tab-button")?.click();
    m.redraw.sync();
    expect(
      root.querySelector('[data-markdown-page-break="true"]'),
    ).toBeTruthy();

    root.querySelectorAll<HTMLButtonElement>(".md-tab-button")[1].click();
    m.redraw.sync();
    expect(root.querySelector("textarea")?.value).toBe(markdown);
  });

  it("pre-expands page breaks for custom markdown renderers", () => {
    let rendererInput = "";
    const root = mountEditor({
      content: "Before\n\n<!-- markdown:page-break -->\n\nAfter",
      mode: "wysiwyg",
      markdownToHtml: (markdown) => {
        rendererInput = markdown;
        return markdown;
      },
    });

    expect(rendererInput).toContain('data-markdown-page-break="true"');
    expect(rendererInput).not.toContain("<!-- markdown:page-break -->");
    expect(
      root.querySelector('[data-markdown-page-break="true"]'),
    ).toBeTruthy();
  });
});
