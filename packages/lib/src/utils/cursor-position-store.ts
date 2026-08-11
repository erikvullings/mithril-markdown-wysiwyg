/**
 * Saves and restores cursor/selection and scroll position across a re-render
 * that replaces the editor's DOM (e.g. opening a modal, then inserting a
 * link/image/table). One store must be created per `MarkdownEditor` instance
 * — sharing a store between instances would let them clobber each other's
 * saved position.
 */

export interface CursorPositionTarget {
  mode: "wysiwyg" | "markdown";
  contentEditable: HTMLElement | null;
  textarea: HTMLTextAreaElement | null;
}

export interface CursorPositionStore {
  save: (target: CursorPositionTarget) => void;
  restore: (target: CursorPositionTarget) => Promise<void>;
}

interface RangeInfo {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}

export const createCursorPositionStore = (): CursorPositionStore => {
  let savedSelection: { start: number; end: number } | null = null;
  let savedRange: Range | null = null;
  let savedRangeInfo: RangeInfo | null = null;
  let savedScrollPosition: { top: number; left: number } | null = null;

  const clear = () => {
    savedSelection = null;
    savedRange = null;
    savedRangeInfo = null;
    savedScrollPosition = null;
  };

  const save = ({ mode, contentEditable, textarea }: CursorPositionTarget) => {
    const scrollElement = mode === "wysiwyg" ? contentEditable : textarea;
    if (scrollElement) {
      savedScrollPosition = {
        top: scrollElement.scrollTop,
        left: scrollElement.scrollLeft,
      };
    }

    if (
      mode === "markdown" &&
      document.activeElement instanceof HTMLTextAreaElement
    ) {
      const activeTextarea = document.activeElement;
      savedSelection = {
        start: activeTextarea.selectionStart,
        end: activeTextarea.selectionEnd,
      };
    } else if (mode === "wysiwyg") {
      const selection = document.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        savedRange = range.cloneRange();
        savedRangeInfo = {
          startContainer: range.startContainer,
          startOffset: range.startOffset,
          endContainer: range.endContainer,
          endOffset: range.endOffset,
        };
      }
    }
  };

  const restoreMarkdown = (textarea: HTMLTextAreaElement | null): void => {
    if (!textarea || !savedSelection) return;
    textarea.setSelectionRange(savedSelection.start, savedSelection.end);
    textarea.focus();
  };

  const restoreWysiwygSelection = (contentEditable: HTMLElement): void => {
    contentEditable.focus();
    const selection = document.getSelection();
    if (!selection || !savedRange) return;

    try {
      selection.removeAllRanges();
      const newRange = document.createRange();

      if (
        savedRangeInfo &&
        savedRangeInfo.startContainer.parentNode &&
        contentEditable.contains(savedRangeInfo.startContainer)
      ) {
        newRange.setStart(
          savedRangeInfo.startContainer,
          Math.min(
            savedRangeInfo.startOffset,
            savedRangeInfo.startContainer.textContent?.length || 0,
          ),
        );

        if (
          savedRangeInfo.endContainer.parentNode &&
          contentEditable.contains(savedRangeInfo.endContainer)
        ) {
          newRange.setEnd(
            savedRangeInfo.endContainer,
            Math.min(
              savedRangeInfo.endOffset,
              savedRangeInfo.endContainer.textContent?.length || 0,
            ),
          );
        } else {
          newRange.collapse(true);
        }
        selection.addRange(newRange);
      } else {
        newRange.selectNodeContents(contentEditable);
        newRange.collapse(false);
        selection.addRange(newRange);
      }
    } catch {
      const range = document.createRange();
      range.selectNodeContents(contentEditable);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const restoreScroll = (element: HTMLElement | null): void => {
    if (!element || !savedScrollPosition) return;
    element.scrollTop = savedScrollPosition.top;
    element.scrollLeft = savedScrollPosition.left;
  };

  const restore = ({
    mode,
    contentEditable,
    textarea,
  }: CursorPositionTarget): Promise<void> => {
    return new Promise((resolve) => {
      if (mode === "markdown" && savedSelection) {
        setTimeout(() => {
          restoreMarkdown(textarea);
          restoreScroll(textarea);
          clear();
          resolve();
        }, 0);
        return;
      }

      if (mode === "wysiwyg" && savedRange) {
        setTimeout(() => {
          if (contentEditable) {
            restoreWysiwygSelection(contentEditable);
          }
          restoreScroll(contentEditable);
          clear();
          resolve();
        }, 10);
        return;
      }

      // No saved selection to restore for this mode; still restore scroll.
      restoreScroll(mode === "markdown" ? textarea : contentEditable);
      clear();
      resolve();
    });
  };

  return { save, restore };
};
