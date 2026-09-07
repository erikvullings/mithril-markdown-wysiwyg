# 0012 Mask inline base64 images

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context

Inline base64 image URLs can dominate the Markdown textarea and make EPUB source difficult to edit,
while the full payload must remain available for rendering and saving.

## Acceptance Criteria

- `hideBase64Images: true` displays compact, size-labelled placeholders in Markdown mode.
- The original base64 payload remains in `onContentChange` values and WYSIWYG images.
- Typing, toolbar actions, search/replace, and mode switching do not lose hidden payloads.
- Partial edits inside a protected placeholder cannot corrupt the underlying image.

## Implementation Notes

- Treat each displayed placeholder as an atomic projection of the canonical Markdown source.
- Map edits around placeholders back to source offsets and restore unchanged hidden payloads.

## Agent Notes

- Completed in `c0854b7` and subsequent working-tree refinements. Relevant files:
  `packages/lib/src/types.ts`, `packages/lib/src/editor.ts`, and
  `packages/lib/src/utils/editor-content.ts`.
- Placeholder edits are protected; deleting the complete placeholder still intentionally removes
  the corresponding image.
