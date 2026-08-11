# 0006 Remove or wire up dead keyboard shortcuts and unused i18n keys

Status: done
Priority: low
Subsystem: lib
Depends on: none

## Context
Minor config-drift items, same root cause as 0002 (declared config not enforced against actual
usage):

- `packages/lib/src/utils/keyboard-shortcuts.ts` declares `toggleMode`/`togglePreview` shortcuts
  that are never wired to a handler in `editor.ts`.
- `packages/lib/src/i18n/index.ts` declares translation keys for Link/Image modal fields that
  `link-modal.ts`/`image-modal.ts` never call `t()` for.

## Acceptance Criteria
- For each dead shortcut: either wire it to the corresponding `editor.ts` handler
  (`handleModeChange`, `isPreview` toggle) or remove the declaration if not wanted.
- For each unused i18n key: either consume it in the relevant modal or remove the declaration.
- Decision (wire up vs. remove) recorded in Agent Notes below with rationale.

## Implementation Notes
- Cheap to combine with 0004 or 0005 if picked up alongside those, since they touch nearby files,
  but stands alone fine.

## Agent Notes
- **Shortcuts** (`packages/lib/src/utils/keyboard-shortcuts.ts`): confirmed both `toggleMode` and
  `togglePreview` were worse than merely "not wired" — `setupKeyboardHandlers`
  (`editor-actions.ts`) already routes every matched shortcut through `executeAction`, which calls
  `event.preventDefault()`/`stopPropagation()` unconditionally on any match, then hit `executeAction`'s
  `default: console.warn(...)` branch since neither action had a case. So Ctrl+M/Ctrl+P were actively
  swallowing the keystroke and doing nothing, worse than not intercepting it at all.
  - `toggleMode` (Ctrl+M / Cmd+M): **wired up**, since a natural handler already existed
    (`handleModeChange` in `editor.ts`). Added `EditorActions.setOnToggleMode(fn)` +
    `onToggleMode` field, called from a new `case "toggleMode"` in `executeAction`. `editor.ts` calls
    `editorActions.setOnToggleMode(() => handleModeChange(...))` once per render (mirrors the
    existing `editorActions.setMode(currentMode)` per-render pattern, so the closure always sees the
    current `currentMode`).
  - `togglePreview` (Ctrl+P): **removed**. Unlike mode, `isPreview` is a fully external/controlled
    prop (`editor.ts:74`, `types.ts:56`) with no internal toggle state or `onPreviewChange` callback
    — wiring it up would mean inventing a new controlled/uncontrolled state pair mirroring
    `internalMode`/`onModeChange`, which is a feature addition, not a cleanup. Removed the shortcut
    declaration and its entry in `getShortcutsByCategory`'s `editor` category.
- **i18n keys** (`packages/lib/src/i18n/index.ts`, `components/link-modal.ts`,
  `components/image-modal.ts`): confirmed via grep that none of `insertLinkTitle`, `insertImageTitle`,
  `linkText`, `linkUrl`, `imageAlt`, `imageUrl`, `imageTitle`, `cancel`, `insert`, or the five
  `*Placeholder` keys were referenced anywhere — `LinkModal`/`ImageModal` didn't even receive a `t`
  prop, unlike `TableSelector`/`TableMenu` which already follow the `t: (key: keyof I18nStrings) =>
  string` pattern. **Consumed them**, following that existing pattern exactly: added `t` to both
  modals' `Attrs`, replaced every hardcoded English string (title, field labels, placeholders,
  Insert/Cancel button text) with `t(...)` calls, and passed `t` from `editor.ts`'s
  `m(ImageModal, {...})`/`m(LinkModal, {...})` call sites.
  - Along the way found the link modal's third field ("Title (optional)" / "Link title for
    tooltip") had **no corresponding i18n key at all** (only the image modal's equivalent —
    `imageTitle`/`imageTitlePlaceholder` — existed). Added `linkTitle`/`linkTitlePlaceholder` to
    `I18nStrings`/`defaultStrings` to close that gap rather than leaving the link modal's title
    field untranslatable.
  - Left the modals' "Preview:" caption hardcoded — it has no declared i18n key and wasn't part of
    the original dead-key finding, so translating it is a separate, unscoped enhancement.
- Verified: `tsc --noEmit` clean, full `pnpm run build` succeeds. Manually confirmed in
  `packages/example`: Insert Link modal renders with i18n-driven title/labels/placeholders/buttons
  (screenshot-verified, output byte-identical to the pre-i18n hardcoded English strings — no visible
  regression); dispatched a synthetic `Ctrl+M` `keydown` on both the WYSIWYG and Markdown editor
  areas via `javascript_tool` (mouse/keyboard shortcut routing in the browser pane was flaky this
  session, jumping to a blank tab — used direct DOM event dispatch instead) and confirmed the editor
  switches `.md-editable-area` ↔ `.md-markdown-area` in both directions; confirmed no
  "Unknown action" console warnings remain.
