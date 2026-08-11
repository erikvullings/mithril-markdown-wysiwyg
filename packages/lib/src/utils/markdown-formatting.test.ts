import { describe, expect, it } from "vitest";
import { smartTaskList } from "./markdown-formatting";
import type { TextArea } from "./text-manipulation";

const makeTextarea = (value: string, cursor: number): TextArea => {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.setSelectionRange(cursor, cursor);
  return textarea;
};

describe("smartTaskList", () => {
  it("turns a plain line into a task item", () => {
    const textarea = makeTextarea("buy milk", 4);

    const result = smartTaskList(textarea);

    expect(result).toBe("- [ ] buy milk");
  });

  it("turns an existing unordered list item into a task item", () => {
    const textarea = makeTextarea("- buy milk", 4);

    const result = smartTaskList(textarea);

    expect(result).toBe("- [ ] buy milk");
  });

  it("turns an existing ordered list item into a task item", () => {
    const textarea = makeTextarea("1. buy milk", 4);

    const result = smartTaskList(textarea);

    expect(result).toBe("- [ ] buy milk");
  });

  it("removes the task marker on an already-task line, back to plain text", () => {
    const textarea = makeTextarea("- [ ] buy milk", 4);

    const result = smartTaskList(textarea);

    expect(result).toBe("buy milk");
  });

  it("removes the task marker from a checked item too", () => {
    const textarea = makeTextarea("- [x] buy milk", 4);

    const result = smartTaskList(textarea);

    expect(result).toBe("buy milk");
  });

  it("inserts a placeholder task item on an empty line", () => {
    const textarea = makeTextarea("", 0);

    const result = smartTaskList(textarea);

    expect(result).toBe("- [ ] Task item");
  });
});
