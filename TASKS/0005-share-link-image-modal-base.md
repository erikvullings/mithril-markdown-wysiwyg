# 0005 Share a base between LinkModal and ImageModal

Status: done
Priority: medium
Subsystem: lib
Depends on: none

## Context
`packages/lib/src/components/link-modal.ts` (168 lines) and
`packages/lib/src/components/image-modal.ts` (170 lines) independently implement "a modal with
URL + text/alt + optional title fields, validated, calling `onInsert`." They're similar enough
that a shared base would concentrate the "modal form field" behavior, but distinct enough (image
needs alt-text semantics, link doesn't) that this is a smaller win than tasks 0001-0004.

## Acceptance Criteria
- Common modal-with-fields behavior (open/close, field state, validation, submit handling) is
  factored into one shared piece; `LinkModal` and `ImageModal` each supply only their
  field-specific config/labels.
- No visible/behavioral change for consumers of `MarkdownEditor`.

## Implementation Notes
- Look at `packages/lib/src/components/modal.ts` first — it may already be intended as this base
  and simply underused.

## Agent Notes
- `Modal` (`packages/lib/src/components/modal.ts`) was already the shared chrome/base for both
  `LinkModal` and `ImageModal` before this task — that part of the acceptance criteria was already
  satisfied. What was actually duplicated: the labeled-input-field pattern (identical `inputStyle`/
  `labelStyle`/`fieldStyle` objects, each copy-pasted 3x per file, and the `m(".md-field", [label,
  input])` markup repeated 6 times total across the two files).
- New `packages/lib/src/components/modal-form-field.ts` exports the three shared style objects plus
  a `FormField(label, inputVnode)` helper that renders one labeled row. Both modals now call
  `FormField("Link Text *", m("input[type=text]", {...}))` etc. instead of hand-building the
  `.md-field` wrapper each time.
- Left each modal's own state/validation/preview logic untouched — those genuinely differ (link
  requires both text+url, image only requires src; link previews an `<a>`, image previews an
  `<img>` with `onerror`/`onload` handlers) and don't belong in a shared helper.
- Verified: `tsc --noEmit` clean, `pnpm run build` succeeds. Manually opened the Image modal in
  `packages/example`, confirmed all three fields render with correct labels/placeholders, typed a
  URL and confirmed the reactive preview block still appears below the fields (proving `FormField`
  composes correctly with the sibling preview vnode). Link modal was already exercised end-to-end
  in task 0004's verification (insert-at-cursor still worked after this file changed underneath it).
