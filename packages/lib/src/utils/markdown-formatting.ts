/**
 * Pure functions for markdown syntax operations
 * These functions work with strings and return new content without side effects
 */

import {
  TextArea,
  wrapText,
  prefixLines,
  toggleLinePrefix,
  insertText,
  getSelection,
  getCurrentLine,
  replaceLine,
  hasLinePrefix,
} from "./text-manipulation";

export interface MarkdownAction {
  (textarea: TextArea): string;
}

/**
 * Apply bold formatting (**text**)
 */
export const formatBold: MarkdownAction = (textarea) => {
  return wrapText(textarea, "**", "**", "bold text");
};

/**
 * Apply italic formatting (*text*)
 */
export const formatItalic: MarkdownAction = (textarea) => {
  return wrapText(textarea, "*", "*", "italic text");
};

/**
 * Apply strikethrough formatting (~~text~~)
 */
export const formatStrikethrough: MarkdownAction = (textarea) => {
  return wrapText(textarea, "~~", "~~", "strikethrough text");
};

/**
 * Apply inline code formatting (`code`)
 */
export const formatInlineCode: MarkdownAction = (textarea) => {
  return wrapText(textarea, "`", "`", "code");
};

/**
 * Apply code block formatting (```\ncode\n```)
 */
export const formatCodeBlock: MarkdownAction = (textarea) => {
  const selection = getSelection(textarea);
  const text = selection.text || "code block";
  const codeBlock = `\`\`\`\n${text}\n\`\`\``;

  const cursorStart = selection.text ? 0 : 4; // Position after ```\n
  return insertText(textarea, codeBlock, cursorStart, 0);
};

/**
 * Toggle heading level (cycles through H1-H6, then removes)
 */
export const toggleHeading: MarkdownAction = (textarea) => {
  const { line } = getCurrentLine(textarea);

  // Check current heading level
  const headingMatch = line.match(/^(#{1,6})\s/);

  if (headingMatch) {
    const currentLevel = headingMatch[1].length;
    if (currentLevel < 6) {
      // Increase heading level
      const newLine = "#".repeat(currentLevel + 1) + line.slice(currentLevel);
      return replaceLine(textarea, newLine);
    } else {
      // Remove heading (H6 -> none)
      const newLine = line.slice(7); // Remove "####### "
      return replaceLine(textarea, newLine);
    }
  } else {
    // Add H1
    const newLine = line.trim() ? `# ${line}` : "# Heading";
    return replaceLine(textarea, newLine);
  }
};

/**
 * Apply specific heading level (1-6)
 */
export const formatHeading =
  (level: number): MarkdownAction =>
  (textarea) => {
    if (level < 1 || level > 6) return textarea.value;

    const { line } = getCurrentLine(textarea);
    const headingPrefix = "#".repeat(level) + " ";

    // Remove existing heading if present
    const cleanLine = line.replace(/^#{1,6}\s*/, "");
    const newLine = cleanLine
      ? `${headingPrefix}${cleanLine}`
      : `${headingPrefix}Heading ${level}`;

    return replaceLine(textarea, newLine);
  };

/**
 * Toggle unordered list formatting
 */
export const toggleUnorderedList: MarkdownAction = (textarea) => {
  return toggleLinePrefix(textarea, "- ", "List item");
};

/**
 * Toggle ordered list formatting
 */
export const toggleOrderedList: MarkdownAction = (textarea) => {
  const selection = getSelection(textarea);

  if (selection.text) {
    const lines = selection.text.split("\n");
    const isOrderedList = lines.every((line, index) =>
      line.match(new RegExp(`^${index + 1}\\. `)),
    );

    let modifiedText: string;
    if (isOrderedList) {
      // Remove numbering
      modifiedText = lines
        .map((line) => line.replace(/^\d+\. /, ""))
        .join("\n");
    } else {
      // Add numbering
      modifiedText = lines
        .map((line, index) => `${index + 1}. ${line}`)
        .join("\n");
    }

    return insertText(textarea, modifiedText, 0, 0);
  } else {
    return insertText(textarea, "1. List item", 3, 0);
  }
};

/**
 * Toggle blockquote formatting
 */
export const toggleBlockquote: MarkdownAction = (textarea) => {
  return toggleLinePrefix(textarea, "> ", "Quote");
};

/**
 * Insert horizontal rule
 */
export const insertHorizontalRule: MarkdownAction = (textarea) => {
  return insertText(textarea, "\n---\n", 0, 0);
};

/**
 * Insert link formatting [text](url)
 */
export const insertLink: MarkdownAction = (textarea) => {
  const selection = getSelection(textarea);
  const linkText = selection.text || "link text";
  const linkMarkdown = `[${linkText}](url)`;

  // Position cursor at URL
  const cursorOffset = linkText.length + 2; // After [text](
  return insertText(textarea, linkMarkdown, cursorOffset, -4); // Select "url"
};

/**
 * Insert image formatting ![alt](src)
 */
export const insertImage: MarkdownAction = (textarea) => {
  const selection = getSelection(textarea);
  const altText = selection.text || "alt text";
  const imageMarkdown = `![${altText}](image-url)`;

  // Position cursor at URL
  const cursorOffset = altText.length + 3; // After ![alt](
  return insertText(textarea, imageMarkdown, cursorOffset, -11); // Select "image-url"
};

/**
 * Insert table with specified dimensions
 */
export const insertTable =
  (rows: number = 3, cols: number = 3): MarkdownAction =>
  (textarea) => {
    const headers = Array(cols)
      .fill("Header")
      .map((h, i) => `${h} ${i + 1}`);
    const headerRow = `| ${headers.join(" | ")} |`;
    const separatorRow = `| ${Array(cols).fill("-------").join(" | ")} |`;

    const dataRows = Array(rows - 1)
      .fill(null)
      .map((_, rowIndex) => {
        const cells = Array(cols)
          .fill("Cell")
          .map((c, colIndex) => `${c} ${rowIndex + 1}-${colIndex + 1}`);
        return `| ${cells.join(" | ")} |`;
      });

    const table = [headerRow, separatorRow, ...dataRows].join("\n");
    return insertText(textarea, `\n${table}\n`, 0, 0);
  };

/**
 * Apply or remove formatting based on current state
 */
export const toggleFormatting = (
  textarea: TextArea,
  startMarker: string,
  endMarker: string,
  placeholder?: string,
): string => {
  const selection = getSelection(textarea);
  const { value, selectionStart, selectionEnd } = textarea;

  // Check if text is already formatted
  const beforeStart = value.slice(
    Math.max(0, selectionStart - startMarker.length),
    selectionStart,
  );
  const afterEnd = value.slice(selectionEnd, selectionEnd + endMarker.length);

  if (beforeStart === startMarker && afterEnd === endMarker) {
    // Remove formatting
    const newValue =
      value.slice(0, selectionStart - startMarker.length) +
      selection.text +
      value.slice(selectionEnd + endMarker.length);

    textarea.value = newValue;
    textarea.setSelectionRange(
      selectionStart - startMarker.length,
      selectionEnd - startMarker.length,
    );
    return newValue;
  } else {
    // Add formatting
    return wrapText(textarea, startMarker, endMarker, placeholder);
  }
};

/**
 * Smart list handling - converts between list types or adds lists
 */
export const smartList =
  (listType: "unordered" | "ordered"): MarkdownAction =>
  (textarea) => {
    const { line } = getCurrentLine(textarea);

    // Check current list type
    const isUnordered = /^-\s/.test(line);
    const isOrdered = /^\d+\.\s/.test(line);

    if (listType === "unordered") {
      if (isUnordered) {
        // Remove unordered list
        const newLine = line.slice(2); // Remove "- "
        return replaceLine(textarea, newLine);
      } else if (isOrdered) {
        // Convert ordered to unordered
        const newLine = line.replace(/^\d+\.\s/, "- ");
        return replaceLine(textarea, newLine);
      } else {
        // Add unordered list
        const newLine = line ? `- ${line}` : "- List item";
        return replaceLine(textarea, newLine);
      }
    } else {
      if (isOrdered) {
        // Remove ordered list
        const newLine = line.replace(/^\d+\.\s/, "");
        return replaceLine(textarea, newLine);
      } else if (isUnordered) {
        // Convert unordered to ordered
        const newLine = line.replace(/^-\s/, "1. ");
        return replaceLine(textarea, newLine);
      } else {
        // Add ordered list
        const newLine = line ? `1. ${line}` : "1. List item";
        return replaceLine(textarea, newLine);
      }
    }
  };

/**
 * Check if current selection/line has specific formatting
 */
export const hasFormatting = (
  textarea: TextArea,
  startMarker: string,
  endMarker: string,
): boolean => {
  const selection = getSelection(textarea);
  const { value, selectionStart, selectionEnd } = textarea;

  const beforeStart = value.slice(
    Math.max(0, selectionStart - startMarker.length),
    selectionStart,
  );
  const afterEnd = value.slice(selectionEnd, selectionEnd + endMarker.length);

  return beforeStart === startMarker && afterEnd === endMarker;
};

/**
 * Get current formatting state for toolbar button states
 */
export const getFormattingState = (textarea: TextArea) => {
  const { line } = getCurrentLine(textarea);

  return {
    bold: hasFormatting(textarea, "**", "**"),
    italic: hasFormatting(textarea, "*", "*"),
    strikethrough: hasFormatting(textarea, "~~", "~~"),
    inlineCode: hasFormatting(textarea, "`", "`"),
    heading: /^#{1,6}\s/.test(line),
    headingLevel: (() => {
      const match = line.match(/^(#{1,6})\s/);
      return match ? match[1].length : 0;
    })(),
    unorderedList: hasLinePrefix(textarea, "- "),
    orderedList: /^\d+\.\s/.test(line),
    blockquote: hasLinePrefix(textarea, "> "),
  };
};
