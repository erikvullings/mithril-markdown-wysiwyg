/**
 * Undo/redo history for WYSIWYG content, independent of the browser's own
 * edit history. `document.execCommand("undo"/"redo")` is unreliable across
 * modern browsers for contentEditable elements, so the editor keeps its own
 * stack of content snapshots instead.
 */

export interface ContentHistory {
  /** Record a new content state, replacing the current one. */
  record: (content: string) => void;
  /** Move back to the previous content state, if any. */
  undo: () => string | undefined;
  /** Move forward to the content state undone most recently, if any. */
  redo: () => string | undefined;
  canUndo: () => boolean;
  canRedo: () => boolean;
  /** Discard all history and start over from `content`. */
  reset: (content: string) => void;
}

export const createContentHistory = (
  initial: string,
  limit = 100,
): ContentHistory => {
  let current = initial;
  let undoStack: string[] = [];
  let redoStack: string[] = [];

  const record = (content: string): void => {
    if (content === current) return;
    undoStack.push(current);
    if (undoStack.length > limit) undoStack.shift();
    redoStack = [];
    current = content;
  };

  const undo = (): string | undefined => {
    const previous = undoStack.pop();
    if (previous === undefined) return undefined;
    redoStack.push(current);
    current = previous;
    return current;
  };

  const redo = (): string | undefined => {
    const next = redoStack.pop();
    if (next === undefined) return undefined;
    undoStack.push(current);
    current = next;
    return current;
  };

  const canUndo = (): boolean => undoStack.length > 0;
  const canRedo = (): boolean => redoStack.length > 0;

  const reset = (content: string): void => {
    current = content;
    undoStack = [];
    redoStack = [];
  };

  return { record, undo, redo, canUndo, canRedo, reset };
};
