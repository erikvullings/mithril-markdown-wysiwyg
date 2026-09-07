/**
 * Markdown to HTML conversion, backed by slimdown-js
 * (https://github.com/erikvullings/slimdown-js).
 */
import { render, type RenderOptions } from "slimdown-js";
import { expandPageBreakMarkers } from "./editor-content";

export type MarkdownToHtmlOptions = RenderOptions;

/**
 * Convert a Markdown string to HTML.
 */
export const markdownToHtml = (
  markdown: string,
  options?: MarkdownToHtmlOptions,
): string => {
  if (!markdown || markdown.trim() === "") {
    return "";
  }
  return render(expandPageBreakMarkers(markdown), options);
};

/**
 * Convert Markdown to HTML for display inside the WYSIWYG editor: links are
 * not opened in a new tab, since the editor handles them in place.
 */
export const markdownToWysiwygHtml = (markdown: string): string =>
  markdownToHtml(markdown, { externalLinks: false });
