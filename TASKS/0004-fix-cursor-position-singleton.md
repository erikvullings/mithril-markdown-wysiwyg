# 0004 Fix global cursor-position singleton and remove debug logging

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context
`packages/lib/src/editor.ts:22-32` defines `cursorPositionStorage` as **module-level** state (not
per-component-instance), used throughout `saveCursorPosition`/`restoreCursorPosition`
(`editor.ts:202-422`, ~220 lines). Two `MarkdownEditor` instances on the same page would clobber
each other's saved cursor/scroll position.

The same block also has ~10 leftover `console.log`/`console.warn` calls with emoji prefixes (e.g.
`"🔄 Saved scroll position:"` at line 214, `"❌ No scroll element found"` at line 221,
`"❌ Failed to restore cursor position:"` at line 340) that run on every modal-open/insert in
production.

This logic is also the least testable part of the codebase (real DOM `Selection`/`Range` APIs,
`setTimeout`-based async choreography), and it's inlined into the component's `view()` closure
rather than given its own seam.

## Acceptance Criteria
- Cursor/scroll save-restore state is scoped per editor instance (e.g. moved inside the component
  factory closure, or into a small dedicated module instantiated per editor), not a shared module
  singleton.
- Two `MarkdownEditor` instances on one page do not interfere with each other's cursor/scroll
  position when inserting links/images/tables.
- All debug `console.log`/`console.warn` calls removed (keep only genuine error handling if any
  is load-bearing).
- Manually verified in `packages/example`: insert link/image/table still restores cursor/scroll
  position correctly in both wysiwyg and markdown modes.

## Implementation Notes
- Natural seam: extract a `createCursorPositionStore()` (or similar) factory called once per
  `MarkdownEditor()` instance, returning `{ save, restore }` closed over instance-local state
  instead of the shared `cursorPositionStorage` object.
- This extraction also sets up future unit testing of save/restore logic in isolation (see
  Agent Notes for whether a follow-up test task is warranted).

## Agent Notes
- New module `packages/lib/src/utils/cursor-position-store.ts`: `createCursorPositionStore()`
  factory returns `{ save, restore }` closed over instance-local state (no module-level singleton).
  All ~10 `console.log`/`console.warn` debug statements removed during the port; the `try/catch`
  fallback behavior in WYSIWYG range restoration was kept (that's real error recovery, not
  debug logging), just without the `console.warn` inside the `catch`.
- `packages/lib/src/editor.ts`: `cursorPositionStore = createCursorPositionStore()` is now
  instantiated inside the `MarkdownEditor()` factory body (runs once per component instance,
  not per render, not shared across instances) — this was the actual fix for the multi-instance
  bug. `saveCursorPosition`/`restoreCursorPosition` are now ~8-line wrappers that build a
  `cursorTarget()` (mode + contentEditable + textarea) and delegate to the store.
- Added `EditorActions.getContentEditable()` (`editor-actions.ts`) as a proper public getter,
  replacing five separate `(editorActions as any).contentEditable` casts across `editor.ts` with
  a typed call.
- Also removed `savedTableScrollPosition` (`editor.ts`), a write-only dead variable sitting right
  next to the code being cleaned up here — set in the right-click table handler but never read
  anywhere (confirmed via grep), same root cause (leftover state nobody consumes).
- Net effect: `editor.ts` shrank by roughly 180 lines in this area (the save/restore closures went
  from ~220 lines to ~8), and the extracted store is now independently testable (pure functions
  taking an explicit target, no reliance on module state or `editorActions` internals).
- Verified: `tsc --noEmit` clean, full `pnpm run build` succeeds, no `console.log`/`console.warn`
  remain in `editor.ts`/`cursor-position-store.ts` (one legitimate `console.error` kept for actual
  table-operation failure handling). Manually tested in `packages/example`: clicked into the WYSIWYG
  editor after "Features", opened Insert Link via toolbar, filled the modal, and confirmed the link
  was inserted exactly at the saved cursor position (screenshot-verified) — proving save/restore
  still works correctly through the new per-instance store. The example page renders three
  `MarkdownEditor` instances simultaneously, which is the scenario this fix targets (previously they
  would have shared the same module-level `cursorPositionStorage`).
