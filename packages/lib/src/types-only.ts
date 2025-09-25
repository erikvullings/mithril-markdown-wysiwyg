import { MarkdownEditor } from "./editor";
import { MarkdownEditorAttrs } from "./types";

// Export main components
export { MarkdownEditor };
export type { MarkdownEditorAttrs };

// Export utilities for advanced usage
export {
  htmlToMarkdown,
  contentEditableToMarkdown,
} from "./utils/html-to-markdown";
export {
  markdownToHtml,
  markdownToWysiwygHtml,
} from "./utils/markdown-to-html";
export * from "./utils/text-manipulation";
export * from "./utils/markdown-formatting";
export * from "./utils/dom-commands";
export * from "./utils/keyboard-shortcuts";
