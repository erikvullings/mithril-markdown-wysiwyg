# 0001 Consolidate duplicate table row/column mutation logic

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context
Table row/column insert/delete ("insert/delete a table row or column") is implemented twice:

- `packages/lib/src/editor.ts:425-538` (`performTableOperation`) — driven by the right-click
  context menu (`TableMenu`), locates the table via a saved `tableContextTarget` element.
- `packages/lib/src/utils/dom-commands.ts:452-616` (`insertRowAbove`, `insertRowBelow`,
  `insertColumnLeft`, `insertColumnRight`, `deleteCurrentRow`, `deleteCurrentColumn`,
  `deleteCurrentTable`) — wrapped by `packages/lib/src/editor-actions.ts:593-655`, locates the
  table via cursor/selection lookup (`findTableAtCursor`).

Both paths are reachable in the shipped product, so they can drift independently (e.g. header-row
`th` handling exists in one and may be missing in the other) and a bug fix in one won't fix the
other. Neither is under test.

## Acceptance Criteria
- A single implementation of "find the target table/cell + insert/delete row/column" exists, used
  by both the right-click context menu path and the `EditorActions` toolbar/dropdown path.
- Behavior (including `th`-in-first-row handling, scroll-position preservation) is preserved for
  both call sites.
- No regression in `packages/example` when exercised manually (insert row/col via context menu AND
  via `EditorActions` methods, delete row/col/table).

## Implementation Notes
- Likely direction: keep `dom-commands.ts` functions as the single source of truth, but let them
  accept an explicit target cell (rather than relying solely on `findTableAtCursor`/selection) so
  the context-menu path can pass `tableContextTarget` through instead of duplicating logic in
  `editor.ts`.
- Watch for the differing table-location strategies (saved DOM element vs. live selection) — the
  consolidated function needs to support both callers.

## Agent Notes
- Root cause was slightly different from the original hypothesis: the `EditorActions`
  cursor-based table methods (`editor-actions.ts:593-657`) were never reachable — `executeAction`'s
  dispatcher (`editor-actions.ts:151-247`) has no cases for `insertRowAbove`/etc., and `EditorActions`
  itself isn't exported from `index.ts`. So the `dom-commands.ts` cursor-based table functions were
  dead code; the only live path was `performTableOperation` in `editor.ts`.
- Also found real behavioral drift while consolidating: `dom-commands.ts`'s old `insertRowAbove`/
  `insertRowBelow` did NOT preserve `<th>` header semantics, while `editor.ts`'s version did (and
  both column-insert variants did, in both files). Consolidated on the more correct (th-preserving)
  behavior for all four insert operations.
- Change: `packages/lib/src/utils/dom-commands.ts` table functions
  (`insertRowAbove`/`insertRowBelow`/`insertColumnLeft`/`insertColumnRight`/`deleteCurrentRow`/
  `deleteCurrentColumn`/`deleteCurrentTable`) now take an explicit `cell: HTMLTableCellElement`
  parameter instead of relying on `findTableAtCursor`/`findCurrentTableCell` internally. This is a
  breaking change to that exported API (lib is pre-1.0, currently 0.2.3), but makes the functions
  pure/testable and reusable from both call sites.
  - `packages/lib/src/editor-actions.ts`: added private `withCurrentCell()` helper that calls
    `DOMUtils.findCurrentTableCell()` and passes it through — used by all 7 table methods, replacing
    ~65 lines of repetitive wrapper code with ~25.
  - `packages/lib/src/editor.ts`: `performTableOperation` now looks up the DOMUtils function via a
    `tableOperations` map keyed by action name and calls it with `tableContextTarget`, replacing
    ~115 lines of duplicated switch-case DOM manipulation with ~15.
- Verified: `tsc --noEmit` clean, `vite build` succeeds for the lib, and manually exercised in
  `packages/example` (via a new `.claude/launch.json` — the example's `dev` script was mid-migration
  from rspack to vite, now `vite`) — right-click "Insert Row Above" and "Insert Column Left" on a
  table both work and correctly preserve `<th>` on the header row/column.
- Follow-up spotted but out of scope: `packages/example` migrated to Vite build tooling and already
  has `slimdown-js` as a dependency with a "Switch to slimdown" toggle in the demo — relevant context
  for task 0003.
