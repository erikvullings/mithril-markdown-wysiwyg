import { describe, expect, it } from "vitest";
import { builtinHtmlToMarkdown } from "./builtin-html-to-markdown";

describe("builtinHtmlToMarkdown - task lists", () => {
  it("round-trips an unchecked task list item", () => {
    const html =
      '<ul><li><input type="checkbox" disabled> task 1</li></ul>';

    expect(builtinHtmlToMarkdown(html)).toBe("- [ ] task 1");
  });

  it("round-trips a checked task list item", () => {
    const html =
      '<ul><li><input type="checkbox" checked disabled> task 1</li></ul>';

    expect(builtinHtmlToMarkdown(html)).toBe("- [x] task 1");
  });

  it("keeps plain list items unaffected", () => {
    const html = "<ul><li>plain item</li></ul>";

    expect(builtinHtmlToMarkdown(html)).toBe("- plain item");
  });

  it("round-trips a mix of task and plain items in the same list", () => {
    const html =
      '<ul><li><input type="checkbox" checked disabled> done</li><li><input type="checkbox" disabled> todo</li><li>plain</li></ul>';

    expect(builtinHtmlToMarkdown(html)).toBe(
      "- [x] done\n- [ ] todo\n- plain",
    );
  });
});
