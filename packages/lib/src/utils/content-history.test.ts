import { describe, expect, it } from "vitest";
import { createContentHistory } from "./content-history";

describe("createContentHistory", () => {
  it("has nothing to undo or redo right after creation", () => {
    const history = createContentHistory("start");

    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(false);
  });

  it("undoes back to the previous recorded content", () => {
    const history = createContentHistory("start");
    history.record("v1");
    history.record("v2");

    expect(history.undo()).toBe("v1");
    expect(history.undo()).toBe("start");
    expect(history.canUndo()).toBe(false);
  });

  it("redoes forward again after an undo", () => {
    const history = createContentHistory("start");
    history.record("v1");
    history.undo();

    expect(history.canRedo()).toBe(true);
    expect(history.redo()).toBe("v1");
    expect(history.canRedo()).toBe(false);
  });

  it("clears the redo stack once a new edit is recorded", () => {
    const history = createContentHistory("start");
    history.record("v1");
    history.undo();
    history.record("v2");

    expect(history.canRedo()).toBe(false);
  });

  it("ignores recording the same content again", () => {
    const history = createContentHistory("start");
    history.record("start");

    expect(history.canUndo()).toBe(false);
  });

  it("returns undefined and does nothing when undoing with an empty stack", () => {
    const history = createContentHistory("start");

    expect(history.undo()).toBeUndefined();
  });
});
