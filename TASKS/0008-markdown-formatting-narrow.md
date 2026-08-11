# 0008 Markdown auto-formatting: table alignment + bullet-marker normalization

Status: open
Priority: low
Subsystem: lib
Depends on: none

## Context
Originally scoped broader ("reformat markdown like a linter: align tables, normalize bullets,
dedupe repeated headers"). Deliberately narrowed after review: full markdown reformatting is
effectively building a formatter, and doing it correctly needs a real markdown AST
(remark/mdast), which is a heavyweight dependency this project is avoiding elsewhere (see 0007).
Line/regex-based transforms are workable but only for mechanical, low-ambiguity transforms —
duplicate-header detection was dropped because "same heading text" isn't reliably "duplicate
section" and false positives would corrupt user content, which is worse than not formatting at
all.

Scope for this task is exactly two transforms, both purely mechanical (no semantic judgment
required):

1. **Table column alignment** — given a markdown table, recompute column widths so `|` separators
   line up, respecting existing alignment markers (`:---`, `:---:`, `---:`).
2. **Bullet marker normalization** — pick one bullet character (`-` by default, configurable) and
   rewrite all top-level/nested unordered list markers to match, without touching bullet-like
   characters inside code fences or blockquotes.

## Acceptance Criteria
- A `formatMarkdown(markdown: string, options?) => string` function exists in
  `packages/lib/src/utils/` (naming consistent with existing `markdown-to-html.ts` /
  `html-to-markdown.ts`).
- Table alignment: column widths recomputed correctly for tables with varying cell content
  lengths, existing `:---`/`:---:`/`---:` alignment markers preserved, malformed/non-table pipe
  text left untouched.
- Bullet normalization: default marker configurable via `options`; markers inside fenced code
  blocks (` ``` `) and blockquotes (`>`) are NOT rewritten; nested list indentation preserved.
- Idempotent: running `formatMarkdown` twice produces the same output as running it once.
- No new runtime dependency added to `packages/lib/package.json`.
- Unit tests cover: multi-column tables with mixed alignment, lists mixing `-`/`*`/`+`, a bullet
  character appearing inside a code fence (must be left alone), nested lists.
- Explicitly out of scope (do not implement): duplicate-heading detection/dedup, ordered-list
  renumbering, arbitrary line-wrapping/prose reflow. If a future task wants these, they should be
  separate tasks scoped individually, not folded in here.

## Implementation Notes
- Line-based/regex approach is fine and preferred over pulling in remark/mdast — keep the
  transforms mechanical and narrowly scoped per the Context above rather than growing into a
  general formatter.
- Fenced-code-block and blockquote detection logic may already exist in
  `packages/lib/src/utils/builtin-html-to-markdown.ts` or `html-to-markdown.ts` (per 0003, check
  current state of those files) — reuse rather than reimplementing "am I inside a code fence"
  line-scanning.
- Not wired into the editor's autosave/onchange path by default — expose as an opt-in
  action/toolbar button (e.g. "Format" or "Reformat") so users control when it runs, since any
  formatter mistake is directly visible/undoable via existing undo, not silently applied on every
  keystroke.

## Agent Notes
