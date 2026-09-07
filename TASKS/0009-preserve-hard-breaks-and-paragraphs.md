# 0009 Preserve hard breaks and paragraphs

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context

EPUB editing requires a clear distinction between a hard line break and a new paragraph. Markdown
and WYSIWYG conversions previously risked joining `<br>` content into a soft Markdown newline.

## Acceptance Criteria

- `Shift+Enter` inserts a Markdown hard break / WYSIWYG `<br>`.
- `Enter` starts a new paragraph outside lists and fenced code.
- Hard breaks and paragraph boundaries remain distinct after repeated mode switches.
- Enter inside backtick and tilde fenced code inserts one newline.

## Implementation Notes

- Preserve `<br>` as two trailing spaces plus a newline in the built-in HTML converter.
- Keep list continuation and fenced-code behavior separate from normal paragraph insertion.

## Agent Notes

- Completed in `c0854b7`. Relevant files:
  `packages/lib/src/editor-actions.ts`, `packages/lib/src/utils/builtin-html-to-markdown.ts`,
  `packages/lib/src/utils/editor-content.ts`, and their tests.
- Fence recognition tracks marker type and opening length so tilde and long backtick fences are
  handled correctly.
