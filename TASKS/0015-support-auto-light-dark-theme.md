# 0015 Support automatic light and dark themes

Status: done
Priority: medium
Subsystem: lib
Depends on: none

## Context

Consumers need consistent light and dark rendering without overriding scattered hard-coded colors,
and should be able to follow the operating-system preference.

## Acceptance Criteria

- `theme` accepts `light`, `dark`, and `auto`.
- `auto` follows `prefers-color-scheme`.
- Markdown, WYSIWYG, preview, toolbar, search, links, tables, and page breaks use shared variables.
- Existing explicit light and dark behavior remains available.

## Implementation Notes

- Keep light as the behavior-safe default.
- Define component-level CSS custom properties and override them for explicit dark and automatic
  dark mode.

## Agent Notes

- Completed in `c0854b7`. Relevant files: `packages/lib/src/types.ts`,
  `packages/lib/src/styles.css`, and `README.md`.
- Search controls and EPUB page-break presentation consume the same theme tokens.
