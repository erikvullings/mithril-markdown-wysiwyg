# 0011 Add search and replace

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context

Long EPUB chapters need an editor-local, VS Code-style search and replace control.

## Acceptance Criteria

- `Cmd+F`/`Ctrl+F` toggles find and `Cmd+H`/`Ctrl+H` toggles replace.
- The control shows match position and total count with previous/next navigation.
- Case-sensitive, whole-word, and regular-expression options are available as compact buttons.
- Replace and replace-all work in Markdown and WYSIWYG modes.
- WYSIWYG matches do not incorrectly span paragraph boundaries.

## Implementation Notes

- Search text and DOM range positions must share the same block-aware text index.
- Invalid regex input must be surfaced without throwing or freezing the UI.

## Agent Notes

- Completed in `c0854b7` and subsequent working-tree refinements. Relevant files:
  `packages/lib/src/editor.ts`, `packages/lib/src/utils/editor-content.ts`,
  `packages/lib/src/i18n/index.ts`, and `packages/lib/src/styles.css`.
- Zero-width Unicode regex matches advance by a complete code point; WYSIWYG indexing inserts
  virtual separators between blocks.
