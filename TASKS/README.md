# Tasks

Architecture-improvement backlog from an `/improve-codebase-architecture` review of
`packages/lib`. All tasks are independent (no dependencies) — pick any in priority order.

## Deepening opportunities

- [x] 0001 Consolidate duplicate table row/column mutation logic
- [x] 0002 Fix toolbar config duplication and drift
- [x] 0003 Clarify/consolidate duplicate HTML<->Markdown converters
- [x] 0004 Fix global cursor-position singleton and remove debug logging
- [x] 0005 Share a base between LinkModal and ImageModal
- [x] 0006 Remove or wire up dead keyboard shortcuts and unused i18n keys

## New features (from feature-review discussion)

Header anchors (originally feature 4) are being added upstream in `slimdown-js` instead of here —
see instructions handed to that repo's agent, not tracked as a task in this repo.

- [ ] 0007 Lightweight syntax highlighting for markdown source and code blocks
- [ ] 0008 Markdown auto-formatting: table alignment + bullet-marker normalization

## EPUB editor improvements

These tasks document the completed EPUB-focused editor feature set delivered together.

- [x] 0009 Preserve hard breaks and paragraphs
- [x] 0010 Add EPUB page breaks
- [x] 0011 Add search and replace
- [x] 0012 Mask inline base64 images
- [x] 0013 Synchronize cursor between editor modes
- [x] 0014 Fix initial Markdown mode
- [x] 0015 Support automatic light and dark themes
