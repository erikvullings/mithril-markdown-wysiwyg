# 0010 Add EPUB page breaks

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context

Authors need an explicit page-break command that survives Markdown, WYSIWYG HTML, and EPUB output.

## Acceptance Criteria

- A toolbar button inserts `<!-- markdown:page-break -->`.
- The marker round-trips through the built-in Markdown and HTML converters.
- Rendered HTML exposes EPUB semantics and page-break CSS.
- Marker examples inside inline, indented, or fenced code are not expanded.

## Implementation Notes

- Use a standalone Markdown comment as the portable authoring representation.
- Render it as a `role="doc-pagebreak"` element with modern and legacy page-break properties.

## Agent Notes

- Completed in `c0854b7` and subsequent working-tree refinements. Relevant files:
  `packages/lib/src/toolbar-config.ts`, `packages/lib/src/editor-actions.ts`,
  `packages/lib/src/utils/editor-content.ts`, `packages/lib/src/utils/markdown-to-html.ts`,
  `packages/lib/src/utils/builtin-html-to-markdown.ts`, and `packages/lib/src/styles.css`.
- Expansion is limited to standalone marker lines outside CommonMark-style code fences.
