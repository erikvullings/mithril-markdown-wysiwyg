import { describe, expect, it, vi } from "vitest";
import { handleEnterKey, type KeyboardEvent } from "./keyboard-shortcuts";

const makeTextarea = (value: string, cursor: number): HTMLTextAreaElement => {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setSelectionRange(cursor, cursor);
  return textarea;
};

const makeEnterEvent = (): KeyboardEvent & { preventDefault: () => void } => ({
  key: "Enter",
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
});

describe("handleEnterKey", () => {
  it("continues a plain unordered list item with the same marker", () => {
    const textarea = makeTextarea("- item 1", 8);
    const handled = handleEnterKey(makeEnterEvent(), textarea);

    expect(handled).toBe(true);
    expect(textarea.value).toBe("- item 1\n- ");
  });

  it("continues an unchecked task list item with a fresh, unchecked checkbox", () => {
    const textarea = makeTextarea("- [ ] task 1", 12);
    handleEnterKey(makeEnterEvent(), textarea);

    expect(textarea.value).toBe("- [ ] task 1\n- [ ] ");
  });

  it("continues a checked task list item with a fresh, unchecked checkbox", () => {
    const textarea = makeTextarea("- [x] task 1", 12);
    handleEnterKey(makeEnterEvent(), textarea);

    expect(textarea.value).toBe("- [x] task 1\n- [ ] ");
  });

  it("removes an empty task list item and outdents instead of continuing it", () => {
    const textarea = makeTextarea("- [ ] ", 6);
    handleEnterKey(makeEnterEvent(), textarea);

    expect(textarea.value).toBe("");
  });

  it("removes an empty plain list item on the last line without duplicating it", () => {
    const textarea = makeTextarea("- ", 2);
    handleEnterKey(makeEnterEvent(), textarea);

    expect(textarea.value).toBe("");
  });
});
