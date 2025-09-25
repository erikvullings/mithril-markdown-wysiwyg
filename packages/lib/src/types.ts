export type EditorMode = "wysiwyg" | "markdown";

export type ThemeMode = "light" | "dark";

import type { I18nStrings } from "./i18n";

export interface MarkdownEditorAttrs {
  mode?: EditorMode;
  theme?: ThemeMode;
  toolbar?: boolean;
  showTabs?: boolean;
  placeholder?: string;
  content: string;
  isPreview?: boolean;
  markdownToHtml?: (markdown: string) => string;
  htmlToMarkdown?: (html: string) => string;
  onContentChange?: (content: string) => void;
  onModeChange?: (mode: EditorMode) => void;
  onTogglePreview?: () => void;
  onToggleTheme?: () => void;
  i18n?: Partial<I18nStrings>;
}

export interface ToolbarButton {
  name: string;
  icon: string;
  title: string;
  action: string;
  shortcut?: string;
  toggle?: boolean; // Button shows active/inactive state
  modal?: boolean; // Button opens a modal dialog
  dropdown?: ToolbarButton[]; // Button has dropdown options
}
