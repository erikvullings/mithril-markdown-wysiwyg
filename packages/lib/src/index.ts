import { MarkdownEditor } from "./editor";
import "./styles.css";

// Export main components
export { MarkdownEditor };
export * from "./types";
export * from "./i18n";

// Export utilities for advanced usage
export {
  htmlToMarkdown,
  contentEditableToMarkdown,
} from "./utils/html-to-markdown";
export {
  markdownToHtml,
  markdownToWysiwygHtml,
} from "./utils/markdown-to-html";
export { builtinHtmlToMarkdown } from "./utils/builtin-html-to-markdown";
export * from "./utils/text-manipulation";
export * from "./utils/markdown-formatting";
export * from "./utils/dom-commands";
export * from "./utils/keyboard-shortcuts";
