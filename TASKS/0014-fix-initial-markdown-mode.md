# 0014 Fix initial Markdown mode

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context

When initialized in Markdown mode, the editor could retain stale WYSIWYG mode state and break later
mode toggles or classify Markdown edits as HTML.

## Acceptance Criteria

- An uncontrolled editor initialized with `mode: "markdown"` renders the Markdown textarea.
- It can toggle to WYSIWYG and back without corrupting content.
- Editor actions always use the current mode rather than a mode captured during initialization.

## Implementation Notes

- Initialize internal mode unconditionally and query `EditorActions.getMode()` at callback time.

## Agent Notes

- Completed in `c0854b7`. Relevant files: `packages/lib/src/editor.ts`,
  `packages/lib/src/editor-actions.ts`, and `packages/lib/src/editor.test.ts`.
- The integration test mounts directly in Markdown mode and exercises both toggle directions.
