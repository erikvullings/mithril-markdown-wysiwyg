/**
 * Text manipulation utilities for markdown editor
 * Pure functions for text selection, insertion, and manipulation operations
 */

export interface TextSelection {
  start: number;
  end: number;
  text: string;
}

export interface TextArea {
  value: string;
  selectionStart: number;
  selectionEnd: number;
  setSelectionRange(start: number, end: number): void;
  focus(): void;
}

/**
 * Get current text selection from textarea
 */
export const getSelection = (textarea: TextArea): TextSelection => ({
  start: textarea.selectionStart,
  end: textarea.selectionEnd,
  text: textarea.value.substring(
    textarea.selectionStart,
    textarea.selectionEnd,
  ),
});

/**
 * Insert text at current selection, replacing selected text
 */
export const insertText = (
  textarea: TextArea,
  text: string,
  cursorOffsetStart = 0,
  cursorOffsetEnd = 0,
): string => {
  const { start, end } = getSelection(textarea);
  const value = textarea.value;
  const newValue = value.slice(0, start) + text + value.slice(end);

  textarea.value = newValue;
  textarea.setSelectionRange(
    start + cursorOffsetStart,
    start + text.length + cursorOffsetEnd,
  );
  textarea.focus();

  return newValue;
};

/**
 * Wrap selected text with prefix and suffix
 */
export const wrapText = (
  textarea: TextArea,
  prefix: string,
  suffix: string,
  placeholder?: string,
): string => {
  const selection = getSelection(textarea);
  const text = selection.text || placeholder || "";
  const wrappedText = prefix + text + suffix;

  const cursorStart = selection.text ? 0 : prefix.length;
  const cursorEnd = selection.text ? 0 : -suffix.length;

  return insertText(textarea, wrappedText, cursorStart, cursorEnd);
};

/**
 * Insert text at the beginning of each line in selection
 */
export const prefixLines = (
  textarea: TextArea,
  prefix: string,
  placeholder?: string,
): string => {
  const selection = getSelection(textarea);
  let text = selection.text;

  if (!text && placeholder) {
    text = placeholder;
  }

  if (!text) {
    return insertText(textarea, prefix, prefix.length, 0);
  }

  const lines = text.split("\n");
  const prefixedText = lines.map((line) => prefix + line).join("\n");

  return insertText(textarea, prefixedText, 0, 0);
};

/**
 * Remove prefix from lines if present, or add if not present
 */
export const toggleLinePrefix = (
  textarea: TextArea,
  prefix: string,
  placeholder?: string,
): string => {
  const selection = getSelection(textarea);
  let text = selection.text;

  if (!text && placeholder) {
    text = placeholder;
  }

  if (!text) {
    return insertText(textarea, prefix, prefix.length, 0);
  }

  const lines = text.split("\n");
  const hasPrefix = lines.every((line) => line.startsWith(prefix));

  let modifiedText: string;
  if (hasPrefix) {
    // Remove prefix
    modifiedText = lines.map((line) => line.slice(prefix.length)).join("\n");
  } else {
    // Add prefix
    modifiedText = lines.map((line) => prefix + line).join("\n");
  }

  return insertText(textarea, modifiedText, 0, 0);
};

/**
 * Check if current line or selection has specific prefix
 */
export const hasLinePrefix = (textarea: TextArea, prefix: string): boolean => {
  const selection = getSelection(textarea);
  if (selection.text) {
    return selection.text.split("\n").every((line) => line.startsWith(prefix));
  }

  // Check current line
  const { value, selectionStart } = textarea;
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const lineEnd = value.indexOf("\n", selectionStart);
  const currentLine = value.slice(
    lineStart,
    lineEnd === -1 ? undefined : lineEnd,
  );

  return currentLine.startsWith(prefix);
};

/**
 * Get current line content and position
 */
export const getCurrentLine = (
  textarea: TextArea,
): { line: string; start: number; end: number } => {
  const { value, selectionStart } = textarea;
  const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const lineEnd = value.indexOf("\n", selectionStart);
  const actualLineEnd = lineEnd === -1 ? value.length : lineEnd;

  return {
    line: value.slice(lineStart, actualLineEnd),
    start: lineStart,
    end: actualLineEnd,
  };
};

/**
 * Replace current line with new content
 */
export const replaceLine = (textarea: TextArea, newLine: string): string => {
  const { start, end } = getCurrentLine(textarea);
  const value = textarea.value;
  const newValue = value.slice(0, start) + newLine + value.slice(end);

  textarea.value = newValue;
  textarea.setSelectionRange(start + newLine.length, start + newLine.length);
  textarea.focus();

  return newValue;
};

/**
 * Insert text at the beginning of current line
 */
export const insertAtLineStart = (textarea: TextArea, text: string): string => {
  const { line, start } = getCurrentLine(textarea);
  const newLine = text + line;
  return replaceLine(textarea, newLine);
};

/**
 * Check if selection spans multiple lines
 */
export const isMultilineSelection = (textarea: TextArea): boolean => {
  const selection = getSelection(textarea);
  return selection.text.includes("\n");
};

/**
 * Indent selected lines or current line
 */
export const indentLines = (
  textarea: TextArea,
  indent: string = "  ",
): string => {
  return prefixLines(textarea, indent);
};

/**
 * Outdent selected lines or current line
 */
export const outdentLines = (
  textarea: TextArea,
  indent: string = "  ",
): string => {
  const selection = getSelection(textarea);
  let text = selection.text;

  if (!text) {
    const { line } = getCurrentLine(textarea);
    if (line.startsWith(indent)) {
      const newLine = line.slice(indent.length);
      return replaceLine(textarea, newLine);
    }
    return textarea.value;
  }

  const lines = text.split("\n");
  const outdentedText = lines
    .map((line) => (line.startsWith(indent) ? line.slice(indent.length) : line))
    .join("\n");

  return insertText(textarea, outdentedText, 0, 0);
};
