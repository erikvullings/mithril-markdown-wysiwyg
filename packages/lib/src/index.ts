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

// Re-exported so consumers who want to pass slimdown-js explicitly as
// `markdownToHtml` (e.g. to override editor-specific options) don't need to
// add it as a second, separate dependency — it's already bundled here since
// it backs the built-in default.
export {
  render as slimdownRender,
  addRule as slimdownAddRule,
} from "slimdown-js";
export type {
  RenderOptions as SlimdownRenderOptions,
  SlimdownExtension,
} from "slimdown-js";
export * from "./utils/text-manipulation";
export * from "./utils/markdown-formatting";
export * from "./utils/dom-commands";
export * from "./utils/keyboard-shortcuts";
