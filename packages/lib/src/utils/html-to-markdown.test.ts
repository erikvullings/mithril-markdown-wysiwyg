import { describe, expect, it } from "vitest";
import { builtinHtmlToMarkdown } from "./builtin-html-to-markdown";
import { htmlToMarkdown } from "./html-to-markdown";

describe("htmlToMarkdown", () => {
  it("preserves heading block semantics like the built-in converter", () => {
    const html = "<h1>Heading</h1><p>Paragraph</p>";

    expect(htmlToMarkdown(html)).toBe(builtinHtmlToMarkdown(html));
    expect(htmlToMarkdown(html)).toBe("# Heading\n\nParagraph");
  });
});
