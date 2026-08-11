# 0002 Fix toolbar config duplication and drift

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context
`packages/lib/src/toolbar-config.ts` defines the toolbar button tree twice:

- `toolbarButtonGroups` (lines 98-264) — the "canonical" static version.
- `createI18nToolbarConfig` (lines 333-546) — a hand-copied version with `t(...)` calls
  substituted for titles.

`editor.ts:114` only ever renders `createI18nToolbarConfig`'s output. That copy is missing two
buttons present in `toolbarButtonGroups`: `checklist` (task list, group 4) and `clear-format`
(group 7). Those two buttons are therefore **unreachable in the actual product** today, and
nothing catches further drift since there's no test asserting the two configs stay in sync.

## Acceptance Criteria
- Single source of truth for the toolbar button tree (icons, action names, shortcuts, dropdowns).
- i18n titles are derived from that single source (e.g. by mapping over the canonical structure
  and applying `t()` per button) rather than a hand-maintained parallel copy.
- `checklist` and `clear-format` buttons are reachable again in the rendered toolbar.
- `packages/example` toolbar renders all expected buttons/groups after the change.

## Implementation Notes
- `headingOptions` (lines 45-95) also has a duplicate, `i18nHeadingOptions` (lines 336-386) inside
  `createI18nToolbarConfig` — fold this into the same fix.
- Consider deriving titles via a `name -> i18n key` lookup so the button metadata (icon, action,
  shortcut) lives in exactly one array.

## Agent Notes
- Change: `packages/lib/src/toolbar-config.ts` — deleted the hand-copied
  `i18nToolbarButtonGroups`/`i18nHeadingOptions` (~215 lines) inside `createI18nToolbarConfig`.
  Replaced with a `BUTTON_I18N_KEY` lookup (`name -> keyof I18nStrings`) and a
  `translateHeadingOptions(t)` helper, both mapping over the single canonical
  `toolbarButtonGroups`/`headingOptions` arrays to produce translated titles. `createI18nToolbarConfig`
  is now ~20 lines instead of ~215, and the two configs can no longer drift by construction.
- Added missing i18n keys required for full coverage: `paragraph`, `checklist`, `clearFormat` in
  `packages/lib/src/i18n/index.ts` (`I18nStrings` interface + `defaultStrings`). These were the
  reason `checklist` and `clear-format` buttons were dropped from the old hand-copied i18n config —
  no key existed to translate them, so whoever copy-pasted just omitted them.
- Verified: `tsc --noEmit` clean, `vite build` succeeds. Manually confirmed in `packages/example`
  (via `.claude/launch.json`, `vite` dev server on port 3325) that the toolbar now renders 19 buttons
  including "Task List" and "Clear Formatting" (previously unreachable), and the heading dropdown
  shows correctly translated "Paragraph"/"Heading 1"..."Heading 6" entries.
- No consumer-facing behavior change beyond restoring the two previously-missing buttons — the
  `ToolbarConfig`/`ToolbarButton` public types are unchanged.
