import m from "mithril";
import { afterEach, describe, expect, it } from "vitest";
import { MarkdownEditor } from "./editor";
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
});
