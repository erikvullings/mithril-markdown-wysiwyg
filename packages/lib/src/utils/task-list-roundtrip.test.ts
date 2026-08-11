import { describe, expect, it } from "vitest";
import { markdownToWysiwygHtml } from "./markdown-to-html";
import { builtinHtmlToMarkdown } from "./builtin-html-to-markdown";

describe("task list markdown <-> WYSIWYG round trip", () => {
  it("survives editing without degrading into a plain list", () => {
    const original = "- [ ] task 1\n- [x] task 2";

    const html = markdownToWysiwygHtml(original);
    const roundTripped = builtinHtmlToMarkdown(html);

    expect(roundTripped).toBe(original);
  });
});
