# 0013 Synchronize cursor between editor modes

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context

Switching between Markdown and WYSIWYG should keep the author near the same text segment instead of
moving the cursor to the beginning or end of a long chapter.

## Acceptance Criteria

- Markdown-to-WYSIWYG switching places the cursor at the corresponding rendered text.
- WYSIWYG-to-Markdown switching restores the corresponding source position.
- Links, hard breaks, and paragraph boundaries retain meaningful positions.
- The target selection is scrolled into view.

## Implementation Notes

- Use a shared block-aware DOM text index rather than raw `textContent`.
- Map Markdown positions with a rendered sentinel and resolve WYSIWYG positions using local text
  context, including link-target syntax.

## Agent Notes

- Completed in `c0854b7` and subsequent working-tree refinements. Relevant files:
  `packages/lib/src/editor.ts` and `packages/lib/src/utils/editor-content.ts`.
- Regression coverage includes positions inside the second paragraph and immediately after a link.
