import { ToolbarButton } from "./types";
import type { I18nStrings } from "./i18n";

// SVG Icons from the original implementation
const ICON_HEADING_MENU = `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M6 4V20 M18 4V20 M6 12H18"/></svg>`;
const ICON_H1 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">1</text></svg>`;
const ICON_H2 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">2</text></svg>`;
const ICON_H3 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">3</text></svg>`;
const ICON_H4 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">4</text></svg>`;
const ICON_H5 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">5</text></svg>`;
const ICON_H6 = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4V20 M18 4V20 M6 12H18"/><text x="20" y="8" font-size="4" fill="currentColor">6</text></svg>`;
const ICON_PARAGRAPH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6V2H8c-1 0-2 1-2 2v8c0 1 1 2 2 2h4V8h8m-8 8v6"/></svg>`;

const ICON_BOLD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>`;
const ICON_ITALIC = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>`;
const ICON_STRIKETHROUGH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`;
const ICON_UNDERLINE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v7a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>`;

const ICON_LINK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
const ICON_INLINECODE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.75 4.75L9 19.25"/><path d="M15.25 4.75L13.5 19.25"/><path d="M19.25 7.5L22 10.5L19.25 13.5"/><path d="M4.75 7.5L2 10.5L4.75 13.5"/></svg>`;
const ICON_CODEBLOCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>`;

const ICON_UL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>`;
const ICON_OL = `<svg viewBox="0 0 24 24" fill="none"><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="10" y1="6" x2="22" y2="6"/><line x1="10" y1="12" x2="22" y2="12"/><line x1="10" y1="18" x2="22" y2="18"/></g><g fill="currentColor" font-family="sans-serif" font-size="6" text-anchor="middle" dominant-baseline="middle"><text x="5" y="6.5">1</text><text x="5" y="12.5">2</text><text x="5" y="18.5">3</text></g></svg>`;
const ICON_CHECKLIST = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,11 12,14 22,4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;

const ICON_OUTDENT = `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 8 3 12 7 16"></polyline><line x1="21" y1="12" x2="3" y2="12"></line><line x1="21" y1="5" x2="9" y2="5"></line><line x1="21" y1="19" x2="9" y2="19"></line></svg>`;
const ICON_INDENT = `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 8 21 12 17 16"></polyline><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="5" x2="15" y2="5"></line><line x1="3" y1="19" x2="15" y2="19"></line></svg>`;

const ICON_BLOCKQUOTE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`;
const ICON_HR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"/></svg>`;

const ICON_IMAGE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
const ICON_TABLE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;

// Additional utility icons
const ICON_UNDO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`;
const ICON_REDO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
const ICON_CLEAR_FORMAT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`;

// Dropdown arrow for expandable buttons
const ICON_DROPDOWN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>`;

// Heading options for dropdown
export const headingOptions = [
  {
    name: "paragraph",
    icon: ICON_PARAGRAPH,
    title: "Paragraph",
    action: "paragraph",
    shortcut: "Ctrl+0",
  },
  {
    name: "heading-1",
    icon: ICON_H1,
    title: "Heading 1",
    action: "heading-1",
    shortcut: "Ctrl+1",
  },
  {
    name: "heading-2",
    icon: ICON_H2,
    title: "Heading 2",
    action: "heading-2",
    shortcut: "Ctrl+2",
  },
  {
    name: "heading-3",
    icon: ICON_H3,
    title: "Heading 3",
    action: "heading-3",
    shortcut: "Ctrl+3",
  },
  {
    name: "heading-4",
    icon: ICON_H4,
    title: "Heading 4",
    action: "heading-4",
    shortcut: "Ctrl+4",
  },
  {
    name: "heading-5",
    icon: ICON_H5,
    title: "Heading 5",
    action: "heading-5",
    shortcut: "Ctrl+5",
  },
  {
    name: "heading-6",
    icon: ICON_H6,
    title: "Heading 6",
    action: "heading-6",
    shortcut: "Ctrl+6",
  },
];

// Enhanced toolbar groups with more functionality
export const toolbarButtonGroups = [
  // Group 1: Heading dropdown
  [
    {
      name: "heading-dropdown",
      icon: ICON_HEADING_MENU + ICON_DROPDOWN,
      title: "Heading",
      action: "toggleHeading",
      dropdown: headingOptions,
      shortcut: "Ctrl+H",
    },
  ],
  // Group 2: Text formatting
  [
    {
      name: "bold",
      icon: ICON_BOLD,
      title: "Bold",
      action: "bold",
      shortcut: "Ctrl+B",
      toggle: true,
    },
    {
      name: "italic",
      icon: ICON_ITALIC,
      title: "Italic",
      action: "italic",
      shortcut: "Ctrl+I",
      toggle: true,
    },
    {
      name: "strikethrough",
      icon: ICON_STRIKETHROUGH,
      title: "Strikethrough",
      action: "strikethrough",
      shortcut: "Ctrl+U",
      toggle: true,
    },
  ],
  // Group 3: Code and links
  [
    {
      name: "link",
      icon: ICON_LINK,
      title: "Insert Link",
      action: "link",
      shortcut: "Ctrl+K",
      modal: true,
    },
    {
      name: "inline-code",
      icon: ICON_INLINECODE,
      title: "Inline Code",
      action: "inlineCode",
      shortcut: "Ctrl+`",
      toggle: true,
    },
    {
      name: "code-block",
      icon: ICON_CODEBLOCK,
      title: "Code Block",
      action: "codeBlock",
      shortcut: "Ctrl+Shift+`",
    },
  ],
  // Group 4: Lists and indentation
  [
    {
      name: "unordered-list",
      icon: ICON_UL,
      title: "Bullet List",
      action: "unorderedList",
      shortcut: "Ctrl+L",
      toggle: true,
    },
    {
      name: "ordered-list",
      icon: ICON_OL,
      title: "Numbered List",
      action: "orderedList",
      shortcut: "Ctrl+Shift+L",
      toggle: true,
    },
    {
      name: "checklist",
      icon: ICON_CHECKLIST,
      title: "Task List",
      action: "taskList",
      shortcut: "Ctrl+Shift+T",
      toggle: true,
    },
    {
      name: "outdent",
      icon: ICON_OUTDENT,
      title: "Decrease Indent",
      action: "outdent",
      shortcut: "Shift+Tab",
    },
    {
      name: "indent",
      icon: ICON_INDENT,
      title: "Increase Indent",
      action: "indent",
      shortcut: "Tab",
    },
  ],
  // Group 5: Blocks
  [
    {
      name: "blockquote",
      icon: ICON_BLOCKQUOTE,
      title: "Quote",
      action: "blockquote",
      shortcut: "Ctrl+Q",
      toggle: true,
    },
    {
      name: "horizontal-rule",
      icon: ICON_HR,
      title: "Horizontal Rule",
      action: "horizontalRule",
      shortcut: "Ctrl+R",
    },
  ],
  // Group 6: Media
  [
    {
      name: "image",
      icon: ICON_IMAGE,
      title: "Insert Image",
      action: "image",
      shortcut: "Ctrl+G",
      modal: true,
    },
    {
      name: "table",
      icon: ICON_TABLE,
      title: "Insert Table",
      action: "table",
      shortcut: "Ctrl+T",
      modal: true,
    },
  ],
  // Group 7: Utilities (optional, can be hidden in compact mode)
  [
    {
      name: "undo",
      icon: ICON_UNDO,
      title: "Undo",
      action: "undo",
      shortcut: "Ctrl+Z",
    },
    {
      name: "redo",
      icon: ICON_REDO,
      title: "Redo",
      action: "redo",
      shortcut: "Ctrl+Y",
    },
    {
      name: "clear-format",
      icon: ICON_CLEAR_FORMAT,
      title: "Clear Formatting",
      action: "removeFormat",
    },
  ],
];

// Flattened version for backward compatibility
export const toolbarButtons: ToolbarButton[] = toolbarButtonGroups.flat();

// Toolbar configuration options
export interface ToolbarConfig {
  groups: ToolbarButton[][];
  compact?: boolean; // Hide utility buttons in compact mode
  customButtons?: ToolbarButton[]; // Additional custom buttons
  hiddenButtons?: string[]; // Button names to hide
}

// Default toolbar config
export const defaultToolbarConfig: ToolbarConfig = {
  groups: toolbarButtonGroups,
  compact: false,
};

// Compact toolbar config (hides utilities)
export const compactToolbarConfig: ToolbarConfig = {
  groups: toolbarButtonGroups.slice(0, -1), // Remove utilities group
  compact: true,
};

// Get toolbar buttons with customizations applied
export const getToolbarButtons = (
  config: ToolbarConfig = defaultToolbarConfig,
): ToolbarButton[][] => {
  let groups = [...config.groups];

  // Add custom buttons to last group if provided
  if (config.customButtons && config.customButtons.length > 0) {
    groups = [...groups, config.customButtons];
  }

  // Filter out hidden buttons
  if (config.hiddenButtons && config.hiddenButtons.length > 0) {
    groups = groups
      .map((group) =>
        group.filter((button) => !config.hiddenButtons!.includes(button.name)),
      )
      .filter((group) => group.length > 0); // Remove empty groups
  }

  return groups;
};

// Get specific button by name
export const getButtonByName = (name: string): ToolbarButton | undefined => {
  return toolbarButtons.find((button) => button.name === name);
};

// Check if button is a toggle button
export const isToggleButton = (button: ToolbarButton): boolean => {
  return !!(button as any).toggle;
};

// Check if button opens a modal
export const isModalButton = (button: ToolbarButton): boolean => {
  return !!(button as any).modal;
};

// Check if button has a dropdown
export const isDropdownButton = (button: ToolbarButton): boolean => {
  return !!(button as any).dropdown;
};

// Create i18n-enabled toolbar configuration
export const createI18nToolbarConfig = (
  t: (key: keyof I18nStrings) => string,
): ToolbarConfig => {
  const i18nHeadingOptions = [
    {
      name: "paragraph",
      icon: ICON_PARAGRAPH,
      title: "Paragraph",
      action: "paragraph",
      shortcut: "Ctrl+0",
    },
    {
      name: "heading-1",
      icon: ICON_H1,
      title: t("heading") + " 1",
      action: "heading-1",
      shortcut: "Ctrl+1",
    },
    {
      name: "heading-2",
      icon: ICON_H2,
      title: t("heading") + " 2",
      action: "heading-2",
      shortcut: "Ctrl+2",
    },
    {
      name: "heading-3",
      icon: ICON_H3,
      title: t("heading") + " 3",
      action: "heading-3",
      shortcut: "Ctrl+3",
    },
    {
      name: "heading-4",
      icon: ICON_H4,
      title: t("heading") + " 4",
      action: "heading-4",
      shortcut: "Ctrl+4",
    },
    {
      name: "heading-5",
      icon: ICON_H5,
      title: t("heading") + " 5",
      action: "heading-5",
      shortcut: "Ctrl+5",
    },
    {
      name: "heading-6",
      icon: ICON_H6,
      title: t("heading") + " 6",
      action: "heading-6",
      shortcut: "Ctrl+6",
    },
  ];

  const i18nToolbarButtonGroups = [
    // Group 1: Heading dropdown
    [
      {
        name: "heading-dropdown",
        icon: ICON_HEADING_MENU + ICON_DROPDOWN,
        title: t("heading"),
        action: "toggleHeading",
        dropdown: i18nHeadingOptions,
        shortcut: "Ctrl+H",
      },
    ],
    // Group 2: Text formatting
    [
      {
        name: "bold",
        icon: ICON_BOLD,
        title: t("bold"),
        action: "bold",
        shortcut: "Ctrl+B",
        toggle: true,
      },
      {
        name: "italic",
        icon: ICON_ITALIC,
        title: t("italic"),
        action: "italic",
        shortcut: "Ctrl+I",
        toggle: true,
      },
      {
        name: "strikethrough",
        icon: ICON_STRIKETHROUGH,
        title: t("strikethrough"),
        action: "strikethrough",
        shortcut: "Ctrl+U",
        toggle: true,
      },
    ],
    // Group 3: Code and links
    [
      {
        name: "link",
        icon: ICON_LINK,
        title: t("link"),
        action: "link",
        shortcut: "Ctrl+K",
        modal: true,
      },
      {
        name: "inline-code",
        icon: ICON_INLINECODE,
        title: t("inlineCode"),
        action: "inlineCode",
        shortcut: "Ctrl+`",
        toggle: true,
      },
      {
        name: "code-block",
        icon: ICON_CODEBLOCK,
        title: t("codeBlock"),
        action: "codeBlock",
        shortcut: "Ctrl+Shift+`",
      },
    ],
    // Group 4: Lists and indentation
    [
      {
        name: "unordered-list",
        icon: ICON_UL,
        title: t("unorderedList"),
        action: "unorderedList",
        shortcut: "Ctrl+L",
        toggle: true,
      },
      {
        name: "ordered-list",
        icon: ICON_OL,
        title: t("orderedList"),
        action: "orderedList",
        shortcut: "Ctrl+Shift+L",
        toggle: true,
      },
      {
        name: "outdent",
        icon: ICON_OUTDENT,
        title: "Decrease Indent",
        action: "outdent",
        shortcut: "Shift+Tab",
      },
      {
        name: "indent",
        icon: ICON_INDENT,
        title: "Increase Indent",
        action: "indent",
        shortcut: "Tab",
      },
    ],
    // Group 5: Blocks
    [
      {
        name: "blockquote",
        icon: ICON_BLOCKQUOTE,
        title: t("blockquote"),
        action: "blockquote",
        shortcut: "Ctrl+Q",
        toggle: true,
      },
      {
        name: "horizontal-rule",
        icon: ICON_HR,
        title: t("horizontalRule"),
        action: "horizontalRule",
        shortcut: "Ctrl+R",
      },
    ],
    // Group 6: Media
    [
      {
        name: "image",
        icon: ICON_IMAGE,
        title: t("image"),
        action: "image",
        shortcut: "Ctrl+G",
        modal: true,
      },
      {
        name: "table",
        icon: ICON_TABLE,
        title: t("table"),
        action: "table",
        shortcut: "Ctrl+T",
        modal: true,
      },
    ],
    // Group 7: Utilities
    [
      {
        name: "undo",
        icon: ICON_UNDO,
        title: t("undo"),
        action: "undo",
        shortcut: "Ctrl+Z",
      },
      {
        name: "redo",
        icon: ICON_REDO,
        title: t("redo"),
        action: "redo",
        shortcut: "Ctrl+Y",
      },
    ],
  ];

  return {
    groups: i18nToolbarButtonGroups,
    compact: false,
  };
};
