/**
 * Editor display mode type
 * - "wysiwyg": Visual rich text editing mode
 * - "markdown": Raw markdown text editing mode
 */
export type EditorMode = "wysiwyg" | "markdown";

/**
 * Theme mode type for the editor appearance
 * - "light": Light theme with bright background
 * - "dark": Dark theme with dark background
 */
export type ThemeMode = "light" | "dark";

import type { I18nStrings } from "./i18n";

/**
 * Configuration attributes for the MarkdownEditor component
 */
export interface MarkdownEditorAttrs {
  /**
   * Initial editor mode. Defaults to "wysiwyg".
   * If onModeChange is not provided, the editor will manage mode state internally.
   */
  mode?: EditorMode;

  /**
   * Theme for the editor. Defaults to "light".
   */
  theme?: ThemeMode;

  /**
   * Whether to show the formatting toolbar. Defaults to true.
   */
  toolbar?: boolean;

  /**
   * Whether to show mode switching tabs at the bottom. Defaults to true.
   */
  showTabs?: boolean;

  /**
   * Placeholder text shown when the editor is empty.
   */
  placeholder?: string;

  /**
   * Initial content for the editor. Can be markdown or HTML.
   * The editor will auto-detect the content type.
   */
  content: string;

  /**
   * Whether to show a preview pane alongside the editor. Defaults to false.
   */
  isPreview?: boolean;

  /**
   * Optional custom function to convert markdown to HTML.
   * If not provided, uses built-in markdown parser.
   * @param markdown - The markdown string to convert
   * @returns HTML string
   */
  markdownToHtml?: (markdown: string) => string;

  /**
   * Optional custom function to convert HTML to markdown.
   * If not provided, uses built-in HTML-to-markdown converter.
   * @param html - The HTML string to convert
   * @returns Markdown string
   */
  htmlToMarkdown?: (html: string) => string;

  /**
   * Callback fired when the editor content changes.
   * Always receives markdown content regardless of current mode.
   * @param content - The current content as markdown
   */
  onContentChange?: (content: string) => void;

  /**
   * Callback fired when the editor mode changes.
   * If not provided, the editor will manage mode state internally.
   * @param mode - The new editor mode
   */
  onModeChange?: (mode: EditorMode) => void;

  /**
   * Callback fired when the preview toggle is activated.
   * @deprecated - This callback is not currently used
   */
  onTogglePreview?: () => void;

  /**
   * Callback fired when the theme toggle is activated.
   * @deprecated - This callback is not currently used
   */
  onToggleTheme?: () => void;

  /**
   * Optional internationalization strings to override default English text.
   * Partial object - only specified strings will be overridden.
   */
  i18n?: Partial<I18nStrings>;
}

/**
 * Configuration for a toolbar button
 */
export interface ToolbarButton {
  /**
   * Unique identifier for the button
   */
  name: string;

  /**
   * SVG icon HTML for the button
   */
  icon: string;

  /**
   * Tooltip title text shown on hover
   */
  title: string;

  /**
   * Action identifier that maps to editor functionality
   */
  action: string;

  /**
   * Optional keyboard shortcut text (for display only)
   */
  shortcut?: string;

  /**
   * Whether button shows active/inactive state. Defaults to false.
   */
  toggle?: boolean;

  /**
   * Whether button opens a modal dialog. Defaults to false.
   */
  modal?: boolean;

  /**
   * If present, button shows a dropdown with these options
   */
  dropdown?: ToolbarButton[];
}
