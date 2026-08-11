/**
 * Editor actions using functional utilities
 * Coordinates between markdown and WYSIWYG operations
 */

import {
  TextArea,
  indentLines,
  outdentLines,
  wrapText,
  insertText,
} from "./utils/text-manipulation";
import { ContentEditableElement } from "./utils/dom-commands";
import * as MarkdownUtils from "./utils/markdown-formatting";
import * as DOMUtils from "./utils/dom-commands";
import { createContentHistory, ContentHistory } from "./utils/content-history";
import {
  handleKeyboardShortcut,
  getPlatformShortcuts,
  handleTabKey,
  handleEnterKey,
  KeyboardEvent,
} from "./utils/keyboard-shortcuts";

export interface EditorMode {
  mode: "wysiwyg" | "markdown";
  textarea?: HTMLTextAreaElement;
  contentEditable?: HTMLElement;
}

export class EditorActions {
  private mode: "wysiwyg" | "markdown" = "wysiwyg";
  private textarea: HTMLTextAreaElement | null = null;
  private contentEditable: HTMLElement | null = null;
  private onContentChange?: (content: string) => void;
  private onToggleMode?: () => void;
  private history: ContentHistory = createContentHistory("");
  private isRestoringHistory = false;

  constructor(onContentChange?: (content: string) => void) {
    this.onContentChange = onContentChange;
  }

  // Configuration methods
  setOnContentChange(fn?: (content: string) => void): void {
    this.onContentChange = fn;
  }

  /** Called when the "toggleMode" keyboard shortcut (Ctrl/Cmd+M) fires. */
  setOnToggleMode(fn?: () => void): void {
    this.onToggleMode = fn;
  }

  setTextarea(element: HTMLTextAreaElement): void {
    this.textarea = element;
  }

  getTextarea(): HTMLTextAreaElement | null {
    return this.textarea;
  }

  setContentEditable(element: HTMLElement): void {
    this.contentEditable = element;
  }

  getContentEditable(): HTMLElement | null {
    return this.contentEditable;
  }

  /** Establish the undo/redo baseline. Call once with the loaded WYSIWYG content. */
  initHistory(content: string): void {
    this.history.reset(content);
  }

  /**
   * Record a WYSIWYG content change (from typing or a toolbar action) for
   * undo/redo. Calls made while `undo`/`redo` are themselves restoring a
   * snapshot are ignored, so re-feeding that content through the normal
   * change pipeline doesn't corrupt the history stacks.
   */
  recordHistory(content: string): void {
    if (this.isRestoringHistory) return;
    this.history.record(content);
  }

  setMode(mode: "wysiwyg" | "markdown"): void {
    this.mode = mode;
  }

  getMode(): "wysiwyg" | "markdown" {
    return this.mode;
  }

  // Private helper methods
  private executeAndNotify(action: () => string): void {
    try {
      const newContent = action();
      this.onContentChange?.(newContent);
    } catch (error) {
      console.error("Editor action failed:", error);
    }
  }

  /**
   * Handle a keydown event from either the markdown textarea or the WYSIWYG
   * contentEditable element. Wire this through the element's `onkeydown`
   * vnode attribute (not a raw `addEventListener`) so Mithril's own
   * autoredraw scheduling covers content changes made here too - otherwise a
   * consumer whose `onContentChange` doesn't itself call `m.redraw()` (or
   * relies on some other redraw trigger, e.g. a state-stream subscription)
   * would never see the resulting DOM/state changes reflected.
   */
  handleKeyDown(event: Event): void {
    const keyboardEvent = event as unknown as KeyboardEvent;

    // Handle platform-specific shortcuts
    const handled = handleKeyboardShortcut(
      keyboardEvent,
      (action: string) => this.executeAction(action),
      getPlatformShortcuts(),
    );

    if (handled) return;

    const isPlainEnter =
      keyboardEvent.key === "Enter" &&
      !keyboardEvent.shiftKey &&
      !keyboardEvent.ctrlKey &&
      !keyboardEvent.metaKey &&
      !keyboardEvent.altKey;

    // Continue a WYSIWYG task list item with a fresh checkbox on Enter. The
    // browser's native list-splitting doesn't carry the checkbox over, so
    // without this it silently degrades into a plain list item.
    if (isPlainEnter && this.mode === "wysiwyg" && this.contentEditable) {
      const newContent = DOMUtils.continueTaskListItem(
        this.contentEditable as ContentEditableElement,
      );
      if (newContent !== null) {
        keyboardEvent.preventDefault();
        this.onContentChange?.(newContent);
        return;
      }
    }

    // Handle special keys for markdown mode
    if (this.mode === "markdown" && this.textarea) {
      const textarea = this.textarea;

      // Tab key handling
      if (keyboardEvent.key === "Tab") {
        if (handleTabKey(keyboardEvent, textarea, keyboardEvent.shiftKey)) {
          this.onContentChange?.(textarea.value);
        }
        return;
      }

      // Enter key handling for smart lists
      if (keyboardEvent.key === "Enter") {
        if (handleEnterKey(keyboardEvent, textarea)) {
          this.onContentChange?.(textarea.value);
        }
        return;
      }
    }
  }

  /**
   * Handle a paste event from the markdown textarea, cleaning up common
   * clipboard artifacts (literal `\n`/`\t`/`\r` escape sequences). Wire this
   * through the textarea's `onpaste` vnode attribute for the same autoredraw
   * reason as `handleKeyDown`.
   */
  handlePaste(event: Event): void {
    const clipboardEvent = event as ClipboardEvent;

    if (this.mode !== "markdown" || !this.textarea) return;
    const textarea = this.textarea;
    const pastedText = clipboardEvent.clipboardData?.getData("text/plain");
    if (!pastedText) return;

    // Fix literal \n, \t, \r escape sequences from clipboard
    const cleanedText = pastedText
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r");

    if (cleanedText === pastedText) return;
    clipboardEvent.preventDefault();

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;

    textarea.value =
      currentValue.substring(0, start) +
      cleanedText +
      currentValue.substring(end);

    const newCursorPos = start + cleanedText.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);

    this.onContentChange?.(textarea.value);
  }

  // Action execution dispatcher
  executeAction(action: string): void {
    switch (action) {
      // Text formatting
      case "bold":
        this.bold();
        break;
      case "italic":
        this.italic();
        break;
      case "strikethrough":
        this.strikethrough();
        break;
      case "inlineCode":
        this.inlineCode();
        break;
      case "codeBlock":
        this.codeBlock();
        break;

      // Headings
      case "heading":
      case "toggleHeading":
        this.toggleHeading();
        break;
      case "heading-1":
        this.heading(1);
        break;
      case "heading-2":
        this.heading(2);
        break;
      case "heading-3":
        this.heading(3);
        break;
      case "heading-4":
        this.heading(4);
        break;
      case "heading-5":
        this.heading(5);
        break;
      case "heading-6":
        this.heading(6);
        break;
      case "paragraph":
        this.paragraph();
        break;

      // Lists
      case "unorderedList":
        this.unorderedList();
        break;
      case "orderedList":
        this.orderedList();
        break;
      case "taskList":
        this.taskList();
        break;
      case "indent":
        this.indent();
        break;
      case "outdent":
        this.outdent();
        break;

      // Blocks
      case "blockquote":
        this.blockquote();
        break;
      case "horizontalRule":
        this.horizontalRule();
        break;

      // Media
      case "link":
        this.link();
        break;
      case "image":
        this.image();
        break;
      case "table":
        this.table();
        break;

      // Editor commands
      case "undo":
        this.undo();
        break;
      case "redo":
        this.redo();
        break;
      case "selectAll":
        this.selectAll();
        break;
      case "removeFormat":
        this.removeFormat();
        break;
      case "toggleMode":
        this.onToggleMode?.();
        break;

      default:
        console.warn(`Unknown action: ${action}`);
    }
  }

  // Text formatting actions
  bold(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.formatBoldWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.formatBold(this.textarea as TextArea),
      );
    }
  }

  italic(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.formatItalicWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.formatItalic(this.textarea as TextArea),
      );
    }
  }

  strikethrough(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.formatStrikethroughWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.formatStrikethrough(this.textarea as TextArea),
      );
    }
  }

  inlineCode(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertInlineCodeWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.formatInlineCode(this.textarea as TextArea),
      );
    }
  }

  codeBlock(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertCodeBlockWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.formatCodeBlock(this.textarea as TextArea),
      );
    }
  }

  // Heading actions
  toggleHeading(): void {
    if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.toggleHeading(this.textarea as TextArea),
      );
    }
  }

  heading(level: number): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.formatHeadingWYSIWYG(level)(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.formatHeading(level)(this.textarea as TextArea),
      );
    }
  }

  paragraph(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.formatParagraphWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    }
  }

  // List actions
  unorderedList(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertUnorderedListWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.smartList("unordered")(this.textarea as TextArea),
      );
    }
  }

  orderedList(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertOrderedListWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.smartList("ordered")(this.textarea as TextArea),
      );
    }
  }

  taskList(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertTaskListWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.smartTaskList(this.textarea as TextArea),
      );
    }
  }

  indent(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.indentWYSIWYG(this.contentEditable as ContentEditableElement),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() => {
        // Use imported indentLines function
        return indentLines(this.textarea as TextArea);
      });
    }
  }

  outdent(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.outdentWYSIWYG(this.contentEditable as ContentEditableElement),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() => {
        // Use imported outdentLines function
        return outdentLines(this.textarea as TextArea);
      });
    }
  }

  // Block actions
  blockquote(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.formatBlockquoteWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.toggleBlockquote(this.textarea as TextArea),
      );
    }
  }

  horizontalRule(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertHorizontalRuleWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.insertHorizontalRule(this.textarea as TextArea),
      );
    }
  }

  // Media actions - updated to handle both modes with real data
  link(url?: string, text?: string): void {
    if (url && text) {
      // Insert actual link data
      if (this.mode === "wysiwyg" && this.contentEditable) {
        this.executeAndNotify(() =>
          DOMUtils.insertLinkWYSIWYG(
            url,
            text,
          )(this.contentEditable as ContentEditableElement),
        );
      } else if (this.textarea) {
        this.executeAndNotify(() => {
          const linkMarkdown = `[${text}](${url})`;
          return insertText(this.textarea as TextArea, linkMarkdown, 0, 0);
        });
      }
    } else {
      // Fallback to placeholder insertion (for when called without modal)
      if (this.textarea) {
        this.executeAndNotify(() =>
          MarkdownUtils.insertLink(this.textarea as TextArea),
        );
      }
    }
  }

  image(src?: string, alt?: string, title?: string): void {
    if (src) {
      // Insert actual image data
      const altText = alt || "";
      if (this.mode === "wysiwyg" && this.contentEditable) {
        this.executeAndNotify(() =>
          DOMUtils.insertImageWYSIWYG(
            src,
            altText,
            title,
          )(this.contentEditable as ContentEditableElement),
        );
      } else if (this.textarea) {
        this.executeAndNotify(() => {
          // Use imported insertText function
          const titlePart = title ? ` "${title}"` : "";
          const imageMarkdown = `![${altText}](${src}${titlePart})`;
          return insertText(this.textarea as TextArea, imageMarkdown, 0, 0);
        });
      }
    } else {
      // Fallback to placeholder insertion (for when called without modal)
      if (this.textarea) {
        this.executeAndNotify(() =>
          MarkdownUtils.insertImage(this.textarea as TextArea),
        );
      }
    }
  }

  table(rows: number = 3, cols: number = 3): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertTableWYSIWYG(
          rows,
          cols,
        )(this.contentEditable as ContentEditableElement),
      );
    } else if (this.textarea) {
      this.executeAndNotify(() =>
        MarkdownUtils.insertTable(rows, cols)(this.textarea as TextArea),
      );
    }
  }

  // Editor commands. WYSIWYG undo/redo use our own content history rather
  // than `document.execCommand("undo"/"redo")`, which is unreliable for
  // contentEditable elements in modern browsers.
  undo(): void {
    if (this.mode !== "wysiwyg" || !this.contentEditable) return;
    const previous = this.history.undo();
    if (previous === undefined) return;
    this.isRestoringHistory = true;
    try {
      this.contentEditable.innerHTML = previous;
      this.onContentChange?.(previous);
    } finally {
      this.isRestoringHistory = false;
    }
  }

  redo(): void {
    if (this.mode !== "wysiwyg" || !this.contentEditable) return;
    const next = this.history.redo();
    if (next === undefined) return;
    this.isRestoringHistory = true;
    try {
      this.contentEditable.innerHTML = next;
      this.onContentChange?.(next);
    } finally {
      this.isRestoringHistory = false;
    }
  }

  selectAll(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.selectAllWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    } else if (this.mode === "markdown" && this.textarea) {
      // For markdown mode, select all text in textarea
      this.textarea.select();
    }
  }

  removeFormat(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.removeFormattingWYSIWYG(
          this.contentEditable as ContentEditableElement,
        ),
      );
    }
  }

  // State queries
  getFormattingState() {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      return DOMUtils.getFormattingStateWYSIWYG(
        this.contentEditable as ContentEditableElement,
      );
    } else if (this.textarea) {
      return MarkdownUtils.getFormattingState(this.textarea as TextArea);
    }

    return {};
  }

  // Undo/Redo availability
  canUndo(): boolean {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      return this.history.canUndo();
    }
    // For markdown mode, we don't have undo/redo history
    return false;
  }

  canRedo(): boolean {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      return this.history.canRedo();
    }
    // For markdown mode, we don't have undo/redo history
    return false;
  }

  // Legacy method names for backward compatibility
  code(): void {
    this.inlineCode();
  }

  quote(): void {
    this.blockquote();
  }

  // Table manipulation methods (WYSIWYG mode only)
  // All operate on the table cell containing the current cursor position.
  private withCurrentCell(
    run: (
      element: ContentEditableElement,
      cell: HTMLTableCellElement,
    ) => string,
  ): void {
    if (this.mode !== "wysiwyg" || !this.contentEditable) return;
    const cell = DOMUtils.findCurrentTableCell();
    if (!cell) return;
    const element = this.contentEditable as ContentEditableElement;
    this.executeAndNotify(() => run(element, cell));
  }

  insertRowAbove(): void {
    this.withCurrentCell(DOMUtils.insertRowAbove);
  }

  insertRowBelow(): void {
    this.withCurrentCell(DOMUtils.insertRowBelow);
  }

  insertColumnLeft(): void {
    this.withCurrentCell(DOMUtils.insertColumnLeft);
  }

  insertColumnRight(): void {
    this.withCurrentCell(DOMUtils.insertColumnRight);
  }

  deleteCurrentRow(): void {
    this.withCurrentCell(DOMUtils.deleteCurrentRow);
  }

  deleteCurrentColumn(): void {
    this.withCurrentCell(DOMUtils.deleteCurrentColumn);
  }

  deleteCurrentTable(): void {
    this.withCurrentCell(DOMUtils.deleteCurrentTable);
  }
}
