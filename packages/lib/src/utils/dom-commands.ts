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
 * Whether the current selection sits inside a `<blockquote>`.
 */
const isCursorInBlockquote = (): boolean => {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const node = selection.getRangeAt(0).commonAncestorContainer;
  const parentElement =
    node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element);
  return parentElement?.closest("blockquote") != null;
};

/**
 * Toggle blockquote formatting: wraps the current block in a `<blockquote>`,
 * or reverts it to a plain paragraph if it's already inside one. Without
 * this, repeatedly pressing the toolbar button nests another blockquote each
 * time instead of toggling it off.
 */
export const formatBlockquoteWYSIWYG: DOMAction = (element) => {
  if (isCursorInBlockquote()) {
    return execCommand(element, "formatBlock", "p");
  }
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
 * Whether a collapsed range sits at the very start (or end) of `block`'s
 * text content, regardless of how many nested inline elements/text nodes it
 * takes to get there.
 */
const isRangeAtBlockStart = (range: Range, block: Element): boolean => {
  const preRange = document.createRange();
  preRange.selectNodeContents(block);
  preRange.setEnd(range.startContainer, range.startOffset);
  return preRange.toString().length === 0;
};

const isRangeAtBlockEnd = (range: Range, block: Element): boolean => {
  const postRange = document.createRange();
  postRange.selectNodeContents(block);
  postRange.setStart(range.startContainer, range.startOffset);
  return postRange.toString().length === 0;
};

/**
 * Find an `<hr>` immediately adjacent to a collapsed cursor: either directly
 * bordering it (cursor sitting between block-level siblings) or just outside
 * the block whose start/end the cursor is touching.
 */
const findAdjacentHorizontalRule = (): HTMLElement | null => {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) {
    return null;
  }
  const range = selection.getRangeAt(0);
  const { startContainer, startOffset } = range;

  if (startContainer.nodeType === Node.ELEMENT_NODE) {
    const prev = startContainer.childNodes[startOffset - 1];
    const next = startContainer.childNodes[startOffset];
    if (prev instanceof HTMLElement && prev.tagName === "HR") return prev;
    if (next instanceof HTMLElement && next.tagName === "HR") return next;
    return null;
  }

  const block = startContainer.parentElement;
  if (!block) return null;

  if (isRangeAtBlockStart(range, block)) {
    const prev = block.previousElementSibling;
    if (prev?.tagName === "HR") return prev as HTMLElement;
  }
  if (isRangeAtBlockEnd(range, block)) {
    const next = block.nextElementSibling;
    if (next?.tagName === "HR") return next as HTMLElement;
  }
  return null;
};

/**
 * Insert a horizontal rule, or remove one the cursor is already sitting
 * right next to instead of inserting a second one at the same spot.
 */
export const insertHorizontalRuleWYSIWYG: DOMAction = (element) => {
  const adjacent = findAdjacentHorizontalRule();
  if (adjacent) {
    adjacent.remove();
    return element.innerHTML;
  }
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
  return document.queryCommandEnabled("undo");
};

/**
 * Check if redo is available
 */
export const canRedoWYSIWYG = (element: ContentEditableElement): boolean => {
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
 * Task list utilities for WYSIWYG mode
 */

/**
 * Find the list item (LI) that contains the current cursor position
 */
export const findCurrentListItem = (): HTMLLIElement | null => {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  let node: Node | null = selection.getRangeAt(0).startContainer;
  while (node && node !== document.body) {
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === "LI") {
      return node as HTMLLIElement;
    }
    node = node.parentNode;
  }

  return null;
};

/**
 * If the cursor sits inside a non-empty task list item (an `<li>` starting
 * with a checkbox `<input>`), split it in two: the text after the cursor
 * moves into a new task item with a fresh, unchecked checkbox, and the
 * cursor moves there. Returns the updated `innerHTML`, or `null` when the
 * cursor isn't inside a task item or the item is empty - callers should fall
 * back to the browser's native Enter handling in that case (which already
 * exits an empty list item correctly).
 */
export const continueTaskListItem = (
  element: ContentEditableElement,
): string | null => {
  const li = findCurrentListItem();
  if (!li) return null;

  const checkbox = li.firstElementChild;
  const isTaskItem =
    checkbox?.nodeName === "INPUT" &&
    (checkbox as HTMLInputElement).type === "checkbox";
  if (!isTaskItem) return null;

  if ((li.textContent ?? "").trim() === "") return null;

  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) {
    return null;
  }
  const range = selection.getRangeAt(0);
  if (!li.contains(range.startContainer) || !li.lastChild) return null;

  const newLi = document.createElement("li");
  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.disabled = true;
  newLi.appendChild(newCheckbox);
  newLi.appendChild(document.createTextNode(" "));

  const moveRange = document.createRange();
  moveRange.setStart(range.startContainer, range.startOffset);
  moveRange.setEndAfter(li.lastChild);
  newLi.appendChild(moveRange.extractContents());

  li.parentNode?.insertBefore(newLi, li.nextSibling);

  const caretRange = document.createRange();
  caretRange.setStart(newLi, 2);
  caretRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(caretRange);

  return element.innerHTML;
};

/**
 * Toggle a checkbox on the current list item, turning it into a task item
 * (or, if it already is one, back into a plain item). If the cursor isn't
 * inside a list yet, one is created first via the native list command.
 */
export const insertTaskListWYSIWYG: DOMAction = (element) => {
  let li = findCurrentListItem();

  if (!li) {
    execCommand(element, "insertUnorderedList");
    li = findCurrentListItem();
    if (!li) return element.innerHTML;
  }

  const existingCheckbox =
    li.firstElementChild?.nodeName === "INPUT" &&
    (li.firstElementChild as HTMLInputElement).type === "checkbox"
      ? (li.firstElementChild as HTMLInputElement)
      : null;

  if (existingCheckbox) {
    const spaceNode = existingCheckbox.nextSibling;
    if (
      spaceNode?.nodeType === Node.TEXT_NODE &&
      spaceNode.textContent?.startsWith(" ")
    ) {
      spaceNode.textContent = spaceNode.textContent.slice(1);
    }
    existingCheckbox.remove();
  } else {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.disabled = true;
    li.insertBefore(document.createTextNode(" "), li.firstChild);
    li.insertBefore(checkbox, li.firstChild);
  }

  return element.innerHTML;
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
 * Insert a row above the row containing the given cell.
 * If the row is the header row, the new row's cells are also `th` elements.
 */
export const insertRowAbove = (
  element: ContentEditableElement,
  cell: HTMLTableCellElement,
): string => {
  const table = cell.closest("table") as HTMLTableElement | null;
  const { row: rowIndex } = getCellPosition(cell);
  if (!table) return element.innerHTML;

  const currentRow = table.rows[rowIndex];
  const cellCount = currentRow.cells.length;
  const newRow = table.insertRow(rowIndex);
  const isHeaderRow = rowIndex === 0 && currentRow.querySelector("th");

  for (let i = 0; i < cellCount; i++) {
    const newCell = newRow.insertCell(i);
    newCell.innerHTML = "&nbsp;";
    if (isHeaderRow) {
      const th = document.createElement("th");
      th.innerHTML = "&nbsp;";
      newCell.parentNode?.replaceChild(th, newCell);
    }
  }

  return element.innerHTML;
};

/**
 * Insert a row below the row containing the given cell.
 */
export const insertRowBelow = (
  element: ContentEditableElement,
  cell: HTMLTableCellElement,
): string => {
  const table = cell.closest("table") as HTMLTableElement | null;
  const { row: rowIndex } = getCellPosition(cell);
  if (!table) return element.innerHTML;

  const currentRow = table.rows[rowIndex];
  const cellCount = currentRow.cells.length;
  const newRow = table.insertRow(rowIndex + 1);

  for (let i = 0; i < cellCount; i++) {
    const newCell = newRow.insertCell(i);
    newCell.innerHTML = "&nbsp;";
  }

  return element.innerHTML;
};

/**
 * Insert a column to the left of the column containing the given cell.
 * If the first row is a header row, the new column's first cell is a `th` too.
 */
export const insertColumnLeft = (
  element: ContentEditableElement,
  cell: HTMLTableCellElement,
): string => {
  const table = cell.closest("table") as HTMLTableElement | null;
  const { col: colIndex } = getCellPosition(cell);
  if (!table) return element.innerHTML;

  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const newCell = row.insertCell(colIndex);
    if (i === 0 && row.querySelector("th")) {
      const th = document.createElement("th");
      th.innerHTML = "&nbsp;";
      newCell.parentNode?.replaceChild(th, newCell);
    } else {
      newCell.innerHTML = "&nbsp;";
    }
  }

  return element.innerHTML;
};

/**
 * Insert a column to the right of the column containing the given cell.
 * If the first row is a header row, the new column's first cell is a `th` too.
 */
export const insertColumnRight = (
  element: ContentEditableElement,
  cell: HTMLTableCellElement,
): string => {
  const table = cell.closest("table") as HTMLTableElement | null;
  const { col: colIndex } = getCellPosition(cell);
  if (!table) return element.innerHTML;

  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const newCell = row.insertCell(colIndex + 1);
    if (i === 0 && row.querySelector("th")) {
      const th = document.createElement("th");
      th.innerHTML = "&nbsp;";
      newCell.parentNode?.replaceChild(th, newCell);
    } else {
      newCell.innerHTML = "&nbsp;";
    }
  }

  return element.innerHTML;
};

/**
 * Delete the row containing the given cell. No-op if it's the only row.
 */
export const deleteCurrentRow = (
  element: ContentEditableElement,
  cell: HTMLTableCellElement,
): string => {
  const table = cell.closest("table") as HTMLTableElement | null;
  const { row: rowIndex } = getCellPosition(cell);
  if (!table || table.rows.length <= 1) return element.innerHTML;

  table.deleteRow(rowIndex);

  return element.innerHTML;
};

/**
 * Delete the column containing the given cell. No-op if it's the only column.
 */
export const deleteCurrentColumn = (
  element: ContentEditableElement,
  cell: HTMLTableCellElement,
): string => {
  const table = cell.closest("table") as HTMLTableElement | null;
  const { col: colIndex } = getCellPosition(cell);
  if (!table || (table.rows[0] && table.rows[0].cells.length <= 1)) {
    return element.innerHTML;
  }

  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    if (row.cells[colIndex]) {
      row.deleteCell(colIndex);
    }
  }

  return element.innerHTML;
};

/**
 * Delete the table containing the given cell.
 */
export const deleteCurrentTable = (
  element: ContentEditableElement,
  cell: HTMLTableCellElement,
): string => {
  const table = cell.closest("table") as HTMLTableElement | null;
  if (!table) return element.innerHTML;

  table.remove();

  return element.innerHTML;
};
