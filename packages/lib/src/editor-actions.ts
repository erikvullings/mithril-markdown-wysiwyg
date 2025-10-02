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

  constructor(onContentChange?: (content: string) => void) {
    this.onContentChange = onContentChange;
  }

  // Configuration methods
  setOnContentChange(fn?: (content: string) => void): void {
    this.onContentChange = fn;
  }

  setTextarea(element: HTMLTextAreaElement): void {
    this.textarea = element;
    this.setupKeyboardHandlers(element);
  }

  getTextarea(): HTMLTextAreaElement | null {
    return this.textarea;
  }

  setContentEditable(element: HTMLElement): void {
    this.contentEditable = element;
    this.setupKeyboardHandlers(element);
  }

  setMode(mode: "wysiwyg" | "markdown"): void {
    this.mode = mode;
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

  private setupKeyboardHandlers(element: HTMLElement): void {
    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as unknown as KeyboardEvent;

      // Handle platform-specific shortcuts
      const handled = handleKeyboardShortcut(
        keyboardEvent,
        (action: string) => this.executeAction(action),
        getPlatformShortcuts(),
      );

      if (handled) return;

      // Handle special keys for markdown mode
      if (this.mode === "markdown" && element instanceof HTMLTextAreaElement) {
        // Tab key handling
        if (keyboardEvent.key === "Tab") {
          if (handleTabKey(keyboardEvent, element, keyboardEvent.shiftKey)) {
            this.onContentChange?.(element.value);
          }
          return;
        }

        // Enter key handling for smart lists
        if (keyboardEvent.key === "Enter") {
          if (handleEnterKey(keyboardEvent, element)) {
            this.onContentChange?.(element.value);
          }
          return;
        }
      }
    };

    const handlePaste = (event: Event) => {
      const clipboardEvent = event as ClipboardEvent;

      // Only process paste for markdown mode
      if (this.mode === "markdown" && element instanceof HTMLTextAreaElement) {
        const pastedText = clipboardEvent.clipboardData?.getData('text/plain');

        if (pastedText) {
          // Clean up common markdown issues from clipboard
          let cleanedText = pastedText
            // Fix literal \n to actual newlines
            .replace(/\\n/g, '\n')
            // Fix literal \t to actual tabs
            .replace(/\\t/g, '\t')
            // Fix literal \r to carriage returns
            .replace(/\\r/g, '\r');

          // If the cleaned text is different, prevent default and insert cleaned version
          if (cleanedText !== pastedText) {
            clipboardEvent.preventDefault();

            const textarea = element;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const currentValue = textarea.value;

            // Insert cleaned text at cursor position
            textarea.value = currentValue.substring(0, start) + cleanedText + currentValue.substring(end);

            // Set cursor position after inserted text
            const newCursorPos = start + cleanedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);

            // Notify content change
            this.onContentChange?.(textarea.value);
          }
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    element.addEventListener("paste", handlePaste);
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

  // Editor commands
  undo(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.undoWYSIWYG(this.contentEditable as ContentEditableElement),
      );
    }
  }

  redo(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.redoWYSIWYG(this.contentEditable as ContentEditableElement),
      );
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
      return DOMUtils.canUndoWYSIWYG(
        this.contentEditable as ContentEditableElement,
      );
    }
    // For markdown mode, we don't have undo/redo history
    return false;
  }

  canRedo(): boolean {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      return DOMUtils.canRedoWYSIWYG(
        this.contentEditable as ContentEditableElement,
      );
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
  insertRowAbove(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertRowAbove(this.contentEditable as ContentEditableElement),
      );
    }
  }

  insertRowBelow(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertRowBelow(this.contentEditable as ContentEditableElement),
      );
    }
  }

  insertColumnLeft(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertColumnLeft(
          this.contentEditable as ContentEditableElement,
        ),
      );
    }
  }

  insertColumnRight(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.insertColumnRight(
          this.contentEditable as ContentEditableElement,
        ),
      );
    }
  }

  deleteCurrentRow(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.deleteCurrentRow(
          this.contentEditable as ContentEditableElement,
        ),
      );
    }
  }

  deleteCurrentColumn(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.deleteCurrentColumn(
          this.contentEditable as ContentEditableElement,
        ),
      );
    }
  }

  deleteCurrentTable(): void {
    if (this.mode === "wysiwyg" && this.contentEditable) {
      this.executeAndNotify(() =>
        DOMUtils.deleteCurrentTable(
          this.contentEditable as ContentEditableElement,
        ),
      );
    }
  }
}
