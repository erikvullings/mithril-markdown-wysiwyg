# 0007 Lightweight syntax highlighting for markdown source and code blocks

Status: done
Priority: medium
Subsystem: lib
Depends on: none

## Context

Two related but separate asks, kept as one task because they should share a tokenizer:

1. The markdown source `<textarea>` (`packages/lib/src/editor.ts:389`,
   `m("textarea.md-markdown-area[name=markdown-area]", ...)`) has no syntax highlighting. A
   `<textarea>` can't render colored text itself, so this needs the standard overlay trick: a
   transparent textarea stacked over a `<pre>`/`<div>` that renders the same text with `<span>`
   tokens, kept in sync on input/scroll/resize.
2. Rendered HTML code blocks (from `markdownToHtml` / `markdownToWysiwygHtml` in
   `packages/lib/src/utils/markdown-to-html.ts`, which wraps `slimdown-js`'s `render()` and emits
   `<pre><code class="language-x">...</code></pre>`) have no syntax highlighting either.

Constraint: no heavyweight dependency (ruled out CodeMirror/Monaco/highlight.js/full Prism
grammars — evaluated in prior discussion, see chat history if revisiting). Both features can
share one small hand-written regex-based tokenizer, since "highlight markdown syntax" and
"highlight a code block's language" are both "tokenize text into typed spans."

## Acceptance Criteria

- A tokenizer module exists that takes `(text, grammar)` and returns a list of
  `{ text, type }` tokens (or renders directly to spans) — grammar is data (array of
  `{ type, regex }` rules), not hardcoded per-language logic, so adding a language/token type
  later means adding a rule table, not new code.
- Markdown grammar covers at minimum: headings (`#`...`######`), bold (`**`/`__`), italic
  (`*`/`_`), inline code (`` ` ``), fenced code blocks, links/images (`[]()`/`![]()`), blockquote
  markers (`>`), list markers (`-`/`*`/`1.`).
- Textarea overlay: typing, scrolling, resizing, and paste all keep the highlight layer visually
  aligned with the real (invisible) text in the textarea. No layout shift, no double-rendered
  cursor artifacts.
- Code-block grammar covers at minimum: js/ts, python, json, bash, css (reuse generic patterns —
  keywords/strings/comments/numbers — rather than one bespoke grammar per language where
  possible).
- No new runtime dependency added to `packages/lib/package.json`.
- Bundle size increase is measured (`packages/lib` build output) and reported in Agent Notes.
- `packages/example` demonstrates both: colored markdown while typing, colored code blocks in
  preview.

## Implementation Notes

- Textarea overlay is the fiddly part, not the tokenizer — budget more time there. Watch for:
  font/line-height must match exactly between textarea and overlay; long unwrapped lines;
  `scrollTop`/`scrollLeft` sync on every scroll event; IME composition should not visually break.
- Consider where the tokenizer lives — `packages/lib/src/utils/` alongside the existing
  `markdown-to-html.ts`/`html-to-markdown.ts` utils.
- For code blocks, the language comes from the fenced code info string (`​```ts`) already parsed
  by slimdown-js into the `class="language-ts"` attribute — no need to re-detect language.

## Agent Notes

- 2026-09-07: Integrated the lightweight grammar/tokenizer and Markdown overlay from
  `0d060d2`, preserving the EPUB branch's search, cursor mapping, and hidden-base64 projection in
  `packages/lib/src/editor.ts`. Fixed initially blank Markdown editors by giving
  `.md-syntax-highlight` the theme's `--text-color`; the textarea remains transparent so it owns
  input and caret rendering. Added regression coverage in `packages/lib/src/editor.test.ts` for
  initially-Markdown content and masked-image overlay content. The demo bundle grew from 143,299
  bytes (42,063 gzip) to 160,208 bytes (48,637 gzip) in the source syntax-highlighting commit; the
  integrated library ESM bundle is 172.88 kB (40.88 kB gzip).
