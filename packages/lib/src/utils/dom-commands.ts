/**
 * DOM manipulation utilities for WYSIWYG editor operations
 * Functions for executing commands in contentEditable elements
 */

export interface ContentEditableElement extends HTMLElement {
  contentEditable: string;
}

export interface DOMAction {
  (element: ContentEditableElement): string;
}

/**
 * Execute a document command and return the updated HTML
 */
const execCommand = (
  element: ContentEditableElement,
  command: string,
  value?: string,
): string => {
  // Ensure element has focus for commands to work properly
  element.focus();

  // Store current selection for restoration if needed
  const selection = document.getSelection();
  const range =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  // Execute command
  document.execCommand(command, false, value);

  return element.innerHTML;
};

/**
 * Insert HTML at current cursor position
 */
const insertHTML = (element: ContentEditableElement, html: string): string => {
  return execCommand(element, "insertHTML", html);
};

/**
 * Apply bold formatting
 */
export const formatBoldWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "bold");
};

/**
 * Apply italic formatting
 */
export const formatItalicWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "italic");
};

/**
 * Apply strikethrough formatting
 */
export const formatStrikethroughWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "strikeThrough");
};

/**
 * Apply underline formatting
 */
export const formatUnderlineWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "underline");
};

/**
 * Apply heading formatting (H1-H6)
 */
export const formatHeadingWYSIWYG =
  (level: number): DOMAction =>
  (element) => {
    if (level < 1 || level > 6) return element.innerHTML;
    return execCommand(element, "formatBlock", `h${level}`);
  };

/**
 * Apply paragraph formatting
 */
export const formatParagraphWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "formatBlock", "p");
};

/**
 * Apply blockquote formatting
 */
export const formatBlockquoteWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "formatBlock", "blockquote");
};

/**
 * Insert unordered list
 */
export const insertUnorderedListWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "insertUnorderedList");
};

/**
 * Insert ordered list
 */
export const insertOrderedListWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "insertOrderedList");
};

/**
 * Indent current line/selection
 */
export const indentWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "indent");
};

/**
 * Outdent current line/selection
 */
export const outdentWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "outdent");
};

/**
 * Insert horizontal rule
 */
export const insertHorizontalRuleWYSIWYG: DOMAction = (element) => {
  return insertHTML(element, "<hr>");
};

/**
 * Insert inline code
 */
export const insertInlineCodeWYSIWYG: DOMAction = (element) => {
  const selection = document.getSelection();
  const selectedText = selection?.toString() || "code";
  return insertHTML(element, `<code>${selectedText}</code>`);
};

/**
 * Insert code block
 */
export const insertCodeBlockWYSIWYG: DOMAction = (element) => {
  const selection = document.getSelection();
  const selectedText = selection?.toString() || "code block";
  return insertHTML(element, `<pre><code>${selectedText}</code></pre>`);
};

/**
 * Insert link
 */
export const insertLinkWYSIWYG =
  (url: string, text?: string): DOMAction =>
  (element) => {
    const selection = document.getSelection();
    const linkText = text || selection?.toString() || "link text";
    return insertHTML(element, `<a href="${url}">${linkText}</a>`);
  };

/**
 * Insert image
 */
export const insertImageWYSIWYG =
  (src: string, alt: string = "", title?: string): DOMAction =>
  (element) => {
    const titleAttr = title ? ` title="${title}"` : "";
    return insertHTML(element, `<img src="${src}" alt="${alt}"${titleAttr}>`);
  };

/**
 * Insert table
 */
export const insertTableWYSIWYG =
  (rows: number = 3, cols: number = 3): DOMAction =>
  (element) => {
    const headerCells = Array(cols)
      .fill(null)
      .map((_, i) => `<th>Header ${i + 1}</th>`)
      .join("");
    const headerRow = `<tr>${headerCells}</tr>`;

    const bodyRows = Array(rows - 1)
      .fill(null)
      .map((_, rowIndex) => {
        const cells = Array(cols)
          .fill(null)
          .map((_, colIndex) => `<td>Cell ${rowIndex + 1}-${colIndex + 1}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    const table = `<table><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table>`;
    return insertHTML(element, table);
  };

/**
 * Remove formatting from selection
 */
export const removeFormattingWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "removeFormat");
};

/**
 * Check if undo is available
 */
export const canUndoWYSIWYG = (element: ContentEditableElement): boolean => {
  element.focus();
  return document.queryCommandEnabled("undo");
};

/**
 * Check if redo is available
 */
export const canRedoWYSIWYG = (element: ContentEditableElement): boolean => {
  element.focus();
  return document.queryCommandEnabled("redo");
};

/**
 * Undo last action
 */
export const undoWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "undo");
};

/**
 * Redo last undone action
 */
export const redoWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "redo");
};

/**
 * Select all content
 */
export const selectAllWYSIWYG: DOMAction = (element) => {
  return execCommand(element, "selectAll");
};

/**
 * Get current selection information
 */
export const getSelectionInfo = (element: ContentEditableElement) => {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const selectedText = selection.toString();

  // Check if selection is within our element
  if (!element.contains(range.commonAncestorContainer)) {
    return null;
  }

  return {
    text: selectedText,
    range: range,
    collapsed: selection.isCollapsed,
    anchorNode: selection.anchorNode,
    focusNode: selection.focusNode,
    anchorOffset: selection.anchorOffset,
    focusOffset: selection.focusOffset,
  };
};

/**
 * Restore selection to a specific range
 */
export const restoreSelection = (range: Range): void => {
  const selection = document.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

/**
 * Get formatting state of current selection
 */
export const getFormattingStateWYSIWYG = (element: ContentEditableElement) => {
  return {
    bold: document.queryCommandState("bold"),
    italic: document.queryCommandState("italic"),
    strikethrough: document.queryCommandState("strikeThrough"),
    underline: document.queryCommandState("underline"),
    unorderedList: document.queryCommandState("insertUnorderedList"),
    orderedList: document.queryCommandState("insertOrderedList"),
    blockquote: (() => {
      const selection = document.getSelection();
      if (selection && selection.rangeCount > 0) {
        const node = selection.getRangeAt(0).commonAncestorContainer;
        const parentElement =
          node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : (node as Element);
        return parentElement?.closest("blockquote") !== null;
      }
      return false;
    })(),
    heading: (() => {
      const selection = document.getSelection();
      if (selection && selection.rangeCount > 0) {
        const node = selection.getRangeAt(0).commonAncestorContainer;
        const parentElement =
          node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : (node as Element);
        const headingElement = parentElement?.closest("h1, h2, h3, h4, h5, h6");
        if (headingElement) {
          return {
            isHeading: true,
            level: parseInt(headingElement.tagName.charAt(1)),
          };
        }
      }
      return { isHeading: false, level: 0 };
    })(),
  };
};

/**
 * Check if browser supports specific command
 */
export const supportsCommand = (command: string): boolean => {
  try {
    return document.queryCommandSupported(command);
  } catch {
    return false;
  }
};

/**
 * Clean up common contentEditable artifacts
 */
export const cleanupHTML = (html: string): string => {
  return (
    html
      // Remove empty paragraphs
      .replace(/<p><\/p>/g, "")
      // Remove empty divs
      .replace(/<div><\/div>/g, "")
      // Convert div to p for consistency
      .replace(/<div>/g, "<p>")
      .replace(/<\/div>/g, "</p>")
      // Remove unnecessary spans without attributes
      .replace(/<span>(.*?)<\/span>/g, "$1")
      // Clean up extra whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
};

/**
 * Focus element and place cursor at end
 */
export const focusAtEnd = (element: ContentEditableElement): void => {
  element.focus();

  const selection = document.getSelection();
  if (selection) {
    selection.selectAllChildren(element);
    selection.collapseToEnd();
  }
};

/**
 * Focus element and place cursor at beginning
 */
export const focusAtStart = (element: ContentEditableElement): void => {
  element.focus();

  const selection = document.getSelection();
  if (selection) {
    selection.selectAllChildren(element);
    selection.collapseToStart();
  }
};

/**
 * Table manipulation utilities for WYSIWYG mode
 */

/**
 * Find the table element that contains the current cursor position
 */
export const findTableAtCursor = (): HTMLTableElement | null => {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  let node = range.commonAncestorContainer;

  // Walk up the DOM tree to find a table element
  while (node && node !== document.body) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (element.tagName === "TABLE") {
        return element as HTMLTableElement;
      }
      // Also check if we're inside a table cell
      if (element.tagName === "TD" || element.tagName === "TH") {
        return element.closest("table") as HTMLTableElement;
      }
    }
    node = node.parentNode!;
  }

  return null;
};

/**
 * Find the current table cell (TD or TH) that contains the cursor
 */
export const findCurrentTableCell = (): HTMLTableCellElement | null => {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  let node = range.commonAncestorContainer;

  while (node && node !== document.body) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (element.tagName === "TD" || element.tagName === "TH") {
        return element as HTMLTableCellElement;
      }
    }
    node = node.parentNode!;
  }

  return null;
};

/**
 * Get the row and column index of a table cell
 */
export const getCellPosition = (
  cell: HTMLTableCellElement,
): { row: number; col: number } => {
  const row = cell.closest("tr") as HTMLTableRowElement;
  const table = cell.closest("table") as HTMLTableElement;

  const rowIndex = Array.from(table.rows).indexOf(row);
  const colIndex = Array.from(row.cells).indexOf(cell);

  return { row: rowIndex, col: colIndex };
};

/**
 * Insert a row above the current cursor position
 */
export const insertRowAbove = (element: ContentEditableElement): string => {
  const table = findTableAtCursor();
  const currentCell = findCurrentTableCell();

  if (!table || !currentCell) return element.innerHTML;

  const { row: rowIndex } = getCellPosition(currentCell);
  const currentRow = table.rows[rowIndex];
  const cellCount = currentRow.cells.length;

  // Create new row
  const newRow = table.insertRow(rowIndex);

  // Add cells to match the current row
  for (let i = 0; i < cellCount; i++) {
    const cell = newRow.insertCell();
    cell.innerHTML = "&nbsp;";
  }

  return element.innerHTML;
};

/**
 * Insert a row below the current cursor position
 */
export const insertRowBelow = (element: ContentEditableElement): string => {
  const table = findTableAtCursor();
  const currentCell = findCurrentTableCell();

  if (!table || !currentCell) return element.innerHTML;

  const { row: rowIndex } = getCellPosition(currentCell);
  const currentRow = table.rows[rowIndex];
  const cellCount = currentRow.cells.length;

  // Create new row
  const newRow = table.insertRow(rowIndex + 1);

  // Add cells to match the current row
  for (let i = 0; i < cellCount; i++) {
    const cell = newRow.insertCell();
    cell.innerHTML = "&nbsp;";
  }

  return element.innerHTML;
};

/**
 * Insert a column to the left of the current cursor position
 */
export const insertColumnLeft = (element: ContentEditableElement): string => {
  const table = findTableAtCursor();
  const currentCell = findCurrentTableCell();

  if (!table || !currentCell) return element.innerHTML;

  const { col: colIndex } = getCellPosition(currentCell);

  // Add a cell to each row at the specified column index
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const cell = row.insertCell(colIndex);

    // If it's the first row and contains th elements, make this a th too
    if (i === 0 && row.querySelector("th")) {
      const th = document.createElement("th");
      th.innerHTML = "&nbsp;";
      cell.parentNode?.replaceChild(th, cell);
    } else {
      cell.innerHTML = "&nbsp;";
    }
  }

  return element.innerHTML;
};

/**
 * Insert a column to the right of the current cursor position
 */
export const insertColumnRight = (element: ContentEditableElement): string => {
  const table = findTableAtCursor();
  const currentCell = findCurrentTableCell();

  if (!table || !currentCell) return element.innerHTML;

  const { col: colIndex } = getCellPosition(currentCell);

  // Add a cell to each row at the specified column index + 1
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const cell = row.insertCell(colIndex + 1);

    // If it's the first row and contains th elements, make this a th too
    if (i === 0 && row.querySelector("th")) {
      const th = document.createElement("th");
      th.innerHTML = "&nbsp;";
      cell.parentNode?.replaceChild(th, cell);
    } else {
      cell.innerHTML = "&nbsp;";
    }
  }

  return element.innerHTML;
};

/**
 * Delete the current row
 */
export const deleteCurrentRow = (element: ContentEditableElement): string => {
  const table = findTableAtCursor();
  const currentCell = findCurrentTableCell();

  if (!table || !currentCell) return element.innerHTML;

  const { row: rowIndex } = getCellPosition(currentCell);

  // Don't delete if it's the only row
  if (table.rows.length <= 1) return element.innerHTML;

  table.deleteRow(rowIndex);

  return element.innerHTML;
};

/**
 * Delete the current column
 */
export const deleteCurrentColumn = (
  element: ContentEditableElement,
): string => {
  const table = findTableAtCursor();
  const currentCell = findCurrentTableCell();

  if (!table || !currentCell) return element.innerHTML;

  const { col: colIndex } = getCellPosition(currentCell);

  // Don't delete if it's the only column
  if (table.rows.length > 0 && table.rows[0].cells.length <= 1) {
    return element.innerHTML;
  }

  // Remove the cell at the specified column index from each row
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    if (row.cells[colIndex]) {
      row.deleteCell(colIndex);
    }
  }

  return element.innerHTML;
};

/**
 * Delete the entire table
 */
export const deleteCurrentTable = (element: ContentEditableElement): string => {
  const table = findTableAtCursor();

  if (!table) return element.innerHTML;

  table.remove();

  return element.innerHTML;
};
