/**
 * Keyboard shortcuts handling for the markdown editor
 * Maps keyboard events to editor actions
 */

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  action: string;
  description: string;
}

export interface KeyboardEvent {
  key: string;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
  preventDefault(): void;
  stopPropagation(): void;
}

/**
 * Default keyboard shortcuts for markdown editor
 */
export const defaultShortcuts: KeyboardShortcut[] = [
  // Text formatting
  { key: "b", ctrl: true, action: "bold", description: "Bold text" },
  { key: "i", ctrl: true, action: "italic", description: "Italic text" },
  {
    key: "u",
    ctrl: true,
    action: "strikethrough",
    description: "Strikethrough text",
  },
  { key: "`", ctrl: true, action: "inlineCode", description: "Inline code" },

  // Headings
  { key: "1", ctrl: true, action: "heading-1", description: "Heading 1" },
  { key: "2", ctrl: true, action: "heading-2", description: "Heading 2" },
  { key: "3", ctrl: true, action: "heading-3", description: "Heading 3" },
  { key: "4", ctrl: true, action: "heading-4", description: "Heading 4" },
  { key: "5", ctrl: true, action: "heading-5", description: "Heading 5" },
  { key: "6", ctrl: true, action: "heading-6", description: "Heading 6" },
  { key: "0", ctrl: true, action: "paragraph", description: "Paragraph" },

  // Lists
  {
    key: "l",
    ctrl: true,
    action: "unorderedList",
    description: "Unordered list",
  },
  {
    key: "l",
    ctrl: true,
    shift: true,
    action: "orderedList",
    description: "Ordered list",
  },

  // Indentation
  { key: "Tab", action: "indent", description: "Indent" },
  { key: "Tab", shift: true, action: "outdent", description: "Outdent" },
  { key: "]", ctrl: true, action: "indent", description: "Indent" },
  { key: "[", ctrl: true, action: "outdent", description: "Outdent" },

  // Other formatting
  { key: "q", ctrl: true, action: "blockquote", description: "Blockquote" },
  { key: "k", ctrl: true, action: "link", description: "Insert link" },
  { key: "g", ctrl: true, action: "image", description: "Insert image" },
  { key: "t", ctrl: true, action: "table", description: "Insert table" },
  {
    key: "r",
    ctrl: true,
    action: "horizontalRule",
    description: "Horizontal rule",
  },

  // Code blocks
  {
    key: "`",
    ctrl: true,
    shift: true,
    action: "codeBlock",
    description: "Code block",
  },

  // Editor commands
  { key: "z", ctrl: true, action: "undo", description: "Undo" },
  { key: "z", ctrl: true, shift: true, action: "redo", description: "Redo" },
  { key: "y", ctrl: true, action: "redo", description: "Redo" },
  { key: "a", ctrl: true, action: "selectAll", description: "Select all" },

  // Mode switching
  { key: "m", ctrl: true, action: "toggleMode", description: "Toggle mode" },
  {
    key: "p",
    ctrl: true,
    action: "togglePreview",
    description: "Toggle preview",
  },
];

/**
 * Mac-specific shortcuts (using cmd instead of ctrl)
 */
export const macShortcuts: KeyboardShortcut[] = defaultShortcuts.map(
  (shortcut) => ({
    ...shortcut,
    ctrl: false,
    meta: shortcut.ctrl,
  }),
);

/**
 * Check if a keyboard event matches a shortcut
 */
export const matchesShortcut = (
  event: KeyboardEvent,
  shortcut: KeyboardShortcut,
): boolean => {
  // Normalize key comparison (case-insensitive for letters)
  const eventKey = event.key.toLowerCase();
  const shortcutKey = shortcut.key.toLowerCase();

  if (eventKey !== shortcutKey) {
    return false;
  }

  // Check modifier keys
  const ctrlMatch = (shortcut.ctrl ?? false) === event.ctrlKey;
  const altMatch = (shortcut.alt ?? false) === event.altKey;
  const shiftMatch = (shortcut.shift ?? false) === event.shiftKey;
  const metaMatch = (shortcut.meta ?? false) === event.metaKey;

  return ctrlMatch && altMatch && shiftMatch && metaMatch;
};

/**
 * Find matching shortcut for keyboard event
 */
export const findMatchingShortcut = (
  event: KeyboardEvent,
  shortcuts: KeyboardShortcut[] = defaultShortcuts,
): KeyboardShortcut | null => {
  return shortcuts.find((shortcut) => matchesShortcut(event, shortcut)) || null;
};

/**
 * Handle keyboard event and execute corresponding action
 */
export const handleKeyboardShortcut = (
  event: KeyboardEvent,
  actionHandler: (action: string) => void,
  shortcuts: KeyboardShortcut[] = defaultShortcuts,
): boolean => {
  const matchingShortcut = findMatchingShortcut(event, shortcuts);

  if (matchingShortcut) {
    event.preventDefault();
    event.stopPropagation();
    actionHandler(matchingShortcut.action);
    return true;
  }

  return false;
};

/**
 * Create keyboard event handler for specific element
 */
export const createKeyboardHandler = (
  actionHandler: (action: string) => void,
  shortcuts: KeyboardShortcut[] = defaultShortcuts,
) => {
  return (event: KeyboardEvent) => {
    handleKeyboardShortcut(event, actionHandler, shortcuts);
  };
};

/**
 * Format shortcut for display (e.g., "Ctrl+B" or "⌘B")
 */
export const formatShortcutDisplay = (
  shortcut: KeyboardShortcut,
  isMac: boolean = false,
): string => {
  const parts: string[] = [];

  if (isMac) {
    if (shortcut.meta) parts.push("⌘");
    if (shortcut.ctrl) parts.push("⌃");
    if (shortcut.alt) parts.push("⌥");
    if (shortcut.shift) parts.push("⇧");
  } else {
    if (shortcut.ctrl || shortcut.meta) parts.push("Ctrl");
    if (shortcut.alt) parts.push("Alt");
    if (shortcut.shift) parts.push("Shift");
  }

  // Format key display
  let keyDisplay = shortcut.key;
  switch (shortcut.key.toLowerCase()) {
    case " ":
      keyDisplay = "Space";
      break;
    case "tab":
      keyDisplay = "Tab";
      break;
    case "enter":
      keyDisplay = "Enter";
      break;
    case "escape":
      keyDisplay = "Esc";
      break;
    case "arrowup":
      keyDisplay = "↑";
      break;
    case "arrowdown":
      keyDisplay = "↓";
      break;
    case "arrowleft":
      keyDisplay = "←";
      break;
    case "arrowright":
      keyDisplay = "→";
      break;
    default:
      keyDisplay = shortcut.key.toUpperCase();
  }

  parts.push(keyDisplay);

  return isMac ? parts.join("") : parts.join("+");
};

/**
 * Get shortcuts grouped by category
 */
export const getShortcutsByCategory = (
  shortcuts: KeyboardShortcut[] = defaultShortcuts,
) => {
  const categories = {
    formatting: shortcuts.filter((s) =>
      ["bold", "italic", "strikethrough", "inlineCode", "codeBlock"].includes(
        s.action,
      ),
    ),
    headings: shortcuts.filter(
      (s) => s.action.startsWith("heading-") || s.action === "paragraph",
    ),
    lists: shortcuts.filter((s) =>
      ["unorderedList", "orderedList", "indent", "outdent"].includes(s.action),
    ),
    blocks: shortcuts.filter((s) =>
      ["blockquote", "horizontalRule", "table"].includes(s.action),
    ),
    media: shortcuts.filter((s) => ["link", "image"].includes(s.action)),
    editor: shortcuts.filter((s) =>
      ["undo", "redo", "selectAll", "toggleMode", "togglePreview"].includes(
        s.action,
      ),
    ),
  };

  return categories;
};

/**
 * Detect if running on Mac for shortcut display
 */
export const isMacOS = (): boolean => {
  return (
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform)
  );
};

/**
 * Get platform-specific shortcuts
 */
export const getPlatformShortcuts = (): KeyboardShortcut[] => {
  return isMacOS() ? macShortcuts : defaultShortcuts;
};

/**
 * Smart tab handling for markdown editor
 */
export const handleTabKey = (
  event: KeyboardEvent,
  element: HTMLTextAreaElement | HTMLElement,
  isShift: boolean = false,
): boolean => {
  // Get current line context to determine appropriate tab behavior
  if (element instanceof HTMLTextAreaElement) {
    const { value, selectionStart } = element;
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const lineEnd = value.indexOf("\n", selectionStart);
    const currentLine = value.slice(
      lineStart,
      lineEnd === -1 ? undefined : lineEnd,
    );

    // Check if we're in a list
    const inList =
      /^\s*[-*+]\s/.test(currentLine) || /^\s*\d+\.\s/.test(currentLine);
    const inCodeBlock = (() => {
      const beforeCursor = value.slice(0, selectionStart);
      const codeBlockStarts = (beforeCursor.match(/```/g) || []).length;
      return codeBlockStarts % 2 === 1;
    })();

    if (inList || inCodeBlock) {
      // Allow normal tab indentation in lists and code blocks
      event.preventDefault();

      if (isShift) {
        // Outdent
        const indentMatch = currentLine.match(/^(\s+)/);
        if (indentMatch) {
          const indent = indentMatch[1];
          const newIndent = indent.length >= 2 ? indent.slice(2) : "";
          const newLine = newIndent + currentLine.slice(indent.length);
          const newValue =
            value.slice(0, lineStart) +
            newLine +
            value.slice(lineEnd === -1 ? undefined : lineEnd);

          element.value = newValue;
          element.setSelectionRange(
            selectionStart - Math.min(2, indent.length),
            selectionStart - Math.min(2, indent.length),
          );
        }
      } else {
        // Indent
        const indent = "  ";
        const newLine = currentLine.replace(/^(\s*)/, `$1${indent}`);
        const newValue =
          value.slice(0, lineStart) +
          newLine +
          value.slice(lineEnd === -1 ? undefined : lineEnd);

        element.value = newValue;
        element.setSelectionRange(selectionStart + 2, selectionStart + 2);
      }

      return true;
    }
  }

  return false;
};

/**
 * Handle Enter key for smart list continuation
 */
export const handleEnterKey = (
  event: KeyboardEvent,
  element: HTMLTextAreaElement,
): boolean => {
  const { value, selectionStart } = element;
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const lineEnd = value.indexOf("\n", selectionStart);
  const currentLine = value.slice(
    lineStart,
    lineEnd === -1 ? undefined : lineEnd,
  );

  // Check for list patterns
  const unorderedMatch = currentLine.match(/^(\s*)([-*+])\s(.*)$/);
  const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s(.*)$/);

  if (unorderedMatch) {
    const [, indent, marker, content] = unorderedMatch;

    if (content.trim() === "") {
      // Empty list item - remove it and outdent
      event.preventDefault();
      const newValue =
        value.slice(0, lineStart) +
        indent +
        value.slice(lineEnd === -1 ? undefined : lineEnd);
      element.value = newValue;
      element.setSelectionRange(
        lineStart + indent.length,
        lineStart + indent.length,
      );
      return true;
    } else {
      // Continue list
      event.preventDefault();
      const newListItem = `\n${indent}${marker} `;
      const insertPos = lineEnd === -1 ? value.length : lineEnd;
      const newValue =
        value.slice(0, insertPos) + newListItem + value.slice(insertPos);

      element.value = newValue;
      element.setSelectionRange(
        insertPos + newListItem.length,
        insertPos + newListItem.length,
      );
      return true;
    }
  } else if (orderedMatch) {
    const [, indent, number, content] = orderedMatch;

    if (content.trim() === "") {
      // Empty list item - remove it and outdent
      event.preventDefault();
      const newValue =
        value.slice(0, lineStart) +
        indent +
        value.slice(lineEnd === -1 ? undefined : lineEnd);
      element.value = newValue;
      element.setSelectionRange(
        lineStart + indent.length,
        lineStart + indent.length,
      );
      return true;
    } else {
      // Continue numbered list
      event.preventDefault();
      const nextNumber = parseInt(number) + 1;
      const newListItem = `\n${indent}${nextNumber}. `;
      const insertPos = lineEnd === -1 ? value.length : lineEnd;
      const newValue =
        value.slice(0, insertPos) + newListItem + value.slice(insertPos);

      element.value = newValue;
      element.setSelectionRange(
        insertPos + newListItem.length,
        insertPos + newListItem.length,
      );
      return true;
    }
  }

  return false;
};
