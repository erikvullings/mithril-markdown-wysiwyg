import { describe, expect, it } from "vitest";
import {
  applyMaskedMarkdownEdit,
  findTextMatches,
  maskBase64Images,
  PAGE_BREAK_HTML,
  PAGE_BREAK_MARKER,
  restoreBase64Images,
  searchableDomText,
} from "./editor-content";
import {
  markdownToHtml,
  markdownToWysiwygHtml,
} from "./markdown-to-html";
import { builtinHtmlToMarkdown } from "./builtin-html-to-markdown";

describe("editor structural content", () => {
  it("preserves hard line breaks when converting HTML to Markdown", () => {
    expect(builtinHtmlToMarkdown("<p>first<br>second</p>")).toBe(
      "first  \nsecond",
    );
  });

  it.each([
    ["LF", "first  \nsecond"],
    ["CRLF", "first  \r\nsecond"],
    ["three trailing spaces", "first   \nsecond"],
  ])("renders %s hard breaks inside one paragraph", (_name, markdown) => {
    const container = document.createElement("div");
    container.innerHTML = markdownToWysiwygHtml(markdown);

    expect(container.querySelectorAll("p")).toHaveLength(1);
    expect(container.querySelector("p")?.innerHTML.trim()).toBe(
      "first<br>second",
    );
  });

  it("keeps soft and hard continuations inside list items", () => {
    const container = document.createElement("div");
    container.innerHTML = markdownToWysiwygHtml(
      "- soft\n  continuation\n- hard  \n  continuation",
    );

    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toBe("soft continuation");
    expect(items[0].querySelector("br")).toBeNull();
    expect(items[1].innerHTML).toBe("hard<br>continuation");
  });

  it("keeps soft and hard continuations distinct inside blockquotes", () => {
    const soft = document.createElement("div");
    soft.innerHTML = markdownToWysiwygHtml("> first\n> second");
    const hard = document.createElement("div");
    hard.innerHTML = markdownToWysiwygHtml("> first  \n> second");

    expect(soft.querySelector("blockquote")?.textContent).toBe("first\nsecond");
    expect(soft.querySelector("blockquote br")).toBeNull();
    expect(hard.querySelector("blockquote")?.innerHTML).toBe(
      "first<br>second",
    );
  });

  it("round-trips page breaks through editor HTML", () => {
    const html = markdownToWysiwygHtml(
      `before\n\n${PAGE_BREAK_MARKER}\n\nafter`,
    );

    expect(html).toContain(PAGE_BREAK_HTML);
    expect(builtinHtmlToMarkdown(html)).toContain(PAGE_BREAK_MARKER);
  });

  it("uses slimdown's native page-break extension hook", () => {
    expect(
      markdownToHtml(PAGE_BREAK_MARKER, {
        extensions: [
          {
            renderPageBreak: () => '<hr data-custom-page-break="true">',
          },
        ],
      }),
    ).toBe('<hr data-custom-page-break="true">');
  });

  it("does not expand page-break marker examples inside code", () => {
    const inline = markdownToWysiwygHtml(
      "`<!-- markdown:page-break -->`",
    );
    const fenced = markdownToWysiwygHtml(
      "```\n<!-- markdown:page-break -->\n```",
    );

    expect(inline).not.toContain('class="md-page-break"');
    expect(fenced).not.toContain('class="md-page-break"');
  });

  it("does not expand indented markers or markers in longer fences", () => {
    const indented = markdownToWysiwygHtml(
      "    <!-- markdown:page-break -->",
    );
    const fenced = markdownToWysiwygHtml(
      "````\n```\n<!-- markdown:page-break -->\n````",
    );

    expect(indented).not.toContain('class="md-page-break"');
    expect(fenced).not.toContain('class="md-page-break"');
  });

  it("masks and restores inline base64 image data", () => {
    const markdown = "![cover](data:image/png;base64,AAABBBCCC===)";
    const masked = maskBase64Images(markdown);

    expect(masked.display).not.toContain("AAABBBCCC");
    expect(masked.display).toContain("hidden image 1");
    expect(restoreBase64Images(masked.display, masked.hiddenImages)).toBe(
      markdown,
    );
  });

  it("protects base64 payloads when their placeholders are edited", () => {
    const markdown = "before ![cover](data:image/png;base64,AAABBB===) after";
    const masked = maskBase64Images(markdown);
    const edited = masked.display.replace("hidden image", "changed");

    expect(
      applyMaskedMarkdownEdit(
        markdown,
        masked.display,
        edited,
        masked.hiddenImages,
      ),
    ).toBe(markdown);
  });

  it("preserves masked payloads across edits surrounding an image", () => {
    const markdown = "before ![cover](data:image/png;base64,AAABBB===) after";
    const masked = maskBase64Images(markdown);
    const edited = masked.display
      .replace("before", "start")
      .replace("after", "end");

    expect(
      applyMaskedMarkdownEdit(
        markdown,
        masked.display,
        edited,
        masked.hiddenImages,
      ),
    ).toBe("start ![cover](data:image/png;base64,AAABBB===) end");
  });

  it("keeps paragraph boundaries searchable as separate text", () => {
    const root = document.createElement("div");
    root.innerHTML = "<p>one</p><p>two</p>";

    expect(searchableDomText(root)).toBe("one\n\ntwo");
    expect(
      findTextMatches(searchableDomText(root), "onetwo", {
        caseSensitive: false,
        wholeWord: false,
        regex: false,
      }).matches,
    ).toHaveLength(0);
  });

  it("searches across a page break without searching inside it", () => {
    const root = document.createElement("div");
    root.innerHTML = `<p>Before</p>${PAGE_BREAK_HTML}<p>After</p>`;
    const text = searchableDomText(root);

    expect(
      findTextMatches(text, "Before|After", {
        caseSensitive: false,
        wholeWord: false,
        regex: true,
      }).matches,
    ).toHaveLength(2);
    expect(text).not.toContain("Page break");
    expect(
      findTextMatches(text, "BeforeAfter", {
        caseSensitive: false,
        wholeWord: false,
        regex: false,
      }).matches,
    ).toHaveLength(0);
  });
});

describe("findTextMatches", () => {
  it("supports case-sensitive, whole-word, and regex searches", () => {
    expect(
      findTextMatches("Cat cat category", "cat", {
        caseSensitive: true,
        wholeWord: true,
        regex: false,
      }).matches,
    ).toEqual([{ start: 4, end: 7 }]);

    expect(
      findTextMatches("one 12 two 345", "\\d+", {
        caseSensitive: false,
        wholeWord: false,
        regex: true,
      }).matches,
    ).toEqual([
      { start: 4, end: 6 },
      { start: 11, end: 14 },
    ]);
  });

  it("reports invalid regular expressions without throwing", () => {
    expect(
      findTextMatches("text", "[", {
        caseSensitive: false,
        wholeWord: false,
        regex: true,
      }),
    ).toMatchObject({ matches: [], error: expect.any(String) });
  });

  it("advances zero-width regex matches by a full Unicode code point", () => {
    expect(
      findTextMatches("😀", "(?=.)", {
        caseSensitive: false,
        wholeWord: false,
        regex: true,
      }).matches,
    ).toEqual([{ start: 0, end: 0 }]);
  });
});
