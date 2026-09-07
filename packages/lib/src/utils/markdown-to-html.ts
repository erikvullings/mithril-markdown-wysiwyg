/**
 * Markdown to HTML conversion, backed by slimdown-js
 * (https://github.com/erikvullings/slimdown-js).
 */
import {
  PAGE_BREAK_MARKER,
  render,
  type RenderOptions,
} from "slimdown-js";
import { isInsideFencedCode } from "./editor-content";

export type MarkdownToHtmlOptions = RenderOptions;

const protectPageBreaksInFencedCode = (
  markdown: string,
): { markdown: string; restore: (html: string) => string } => {
  let token = "\uE000markdown-page-break\uE001";
  while (markdown.includes(token)) token += "\uE001";
  let protectedMarkdown = "";
  let cursor = 0;
  let markerStart = markdown.indexOf(PAGE_BREAK_MARKER);
  while (markerStart >= 0) {
    protectedMarkdown += markdown.slice(cursor, markerStart);
    protectedMarkdown += isInsideFencedCode(markdown, markerStart)
      ? token
      : PAGE_BREAK_MARKER;
    cursor = markerStart + PAGE_BREAK_MARKER.length;
    markerStart = markdown.indexOf(PAGE_BREAK_MARKER, cursor);
  }
  protectedMarkdown += markdown.slice(cursor);

  return {
    markdown: protectedMarkdown,
    restore: (html) => {
      const escapedMarker = PAGE_BREAK_MARKER.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return html.split(token).join(escapedMarker);
    },
  };
};

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
  const protectedPageBreaks = protectPageBreaksInFencedCode(markdown);
  return protectedPageBreaks.restore(
    render(protectedPageBreaks.markdown, { ...options, pageBreaks: true }),
  );
};

/**
 * Convert Markdown to HTML for display inside the WYSIWYG editor: links are
 * not opened in a new tab, since the editor handles them in place.
 */
export const markdownToWysiwygHtml = (markdown: string): string =>
  markdownToHtml(markdown, { externalLinks: false });
