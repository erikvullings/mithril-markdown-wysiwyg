# 0003 Clarify/consolidate duplicate HTML<->Markdown converters

Status: done
Priority: high
Subsystem: lib
Depends on: none

## Context
There are two ~600-line HTML<->Markdown converter implementations plus a Markdown->HTML converter:

- `packages/lib/src/utils/builtin-html-to-markdown.ts` (595 lines, DOM-walking) — used as the
  default fallback in `editor.ts:98-100` and `editor.ts:123-125` when no `htmlToMarkdown` prop is
  supplied.
- `packages/lib/src/utils/html-to-markdown.ts` (582 lines, regex-based) — relationship to the
  builtin converter is unclear from the code; may be dead, an alternate implementation, or used
  elsewhere.
- `packages/lib/src/utils/markdown-to-html.ts` (620 lines) — exists but is **not** used as a
  fallback: `safeMarkdownToHtml` in `editor.ts:42-50` just returns the raw markdown string
  unmodified when no `markdownToHtml` prop is given, silently producing wrong output (raw
  markdown shown as if it were HTML).

## Acceptance Criteria
- Determine whether `html-to-markdown.ts` is used anywhere (exported from `index.ts`? imported by
  `packages/example`?). If dead, remove it. If it's an intentional alternate implementation,
  document why both exist (e.g. in a code comment or docs) and which one is the default.
- `safeMarkdownToHtml` falls back to `markdown-to-html.ts`'s converter when no `markdownToHtml`
  prop is provided, matching the existing fallback behavior on the HTML->Markdown side.
- No behavior change for consumers who already pass explicit `markdownToHtml`/`htmlToMarkdown`
  props.

## Implementation Notes
- Check `packages/lib/src/index.ts` and `packages/lib/src/types-only.ts` for what's exported
  publicly today — changing exports is a breaking change for consumers, so confirm before removing.
- Check `packages/example/src/markdown-utils.ts` for which converter(s) the example app relies on.

## Agent Notes
- Direction changed mid-task per explicit user instruction: use the user's own `slimdown-js`
  package (published, v1.4.1, also available locally at `/Users/erik.vullings/dev/slimdown-js`) as
  the markdown→HTML implementation, rather than deciding between the two existing custom
  converters.
- `packages/lib/src/utils/markdown-to-html.ts` (620-line custom regex `MarkdownToHtmlConverter`
  class) replaced entirely with a ~25-line wrapper around `slimdown-js`'s `render()`. Public export
  names (`markdownToHtml`, `markdownToWysiwygHtml`) kept for API stability, but their option type
  changed from the old bespoke `MarkdownToHtmlOptions` to `slimdown-js`'s `RenderOptions` — a
  breaking change to that exported surface (lib is pre-1.0, 0.2.3). `MarkdownToHtmlConverter` class
  and `defaultMarkdownOptions` are gone; nothing else in the repo referenced them.
- Added `slimdown-js: ^1.4.1` to `packages/lib/package.json` `dependencies` (previously the lib had
  zero runtime dependencies beyond peer `mithril`).
- Fixed the actual bug from the original findings: `editor.ts`'s `safeMarkdownToHtml` now falls back
  to `markdownToWysiwygHtml` (slimdown-backed) when no `markdownToHtml` prop is supplied, instead of
  returning the raw markdown string unconverted. Mirrors the existing `htmlToMarkdown` fallback
  pattern (`builtinHtmlToMarkdown`).
- Resolved the `html-to-markdown.ts` vs `builtin-html-to-markdown.ts` question: kept both, since
  they're genuinely different (confirmed by grep) — `html-to-markdown.ts` is pure regex, no DOM
  APIs, so it works outside a browser (SSR/Node); `builtin-html-to-markdown.ts` walks the live DOM
  (`document`, `DOMParser`) and is what `editor.ts` actually defaults to. `html-to-markdown.ts` is
  unused internally but is public API (`index.ts` exports `htmlToMarkdown`/`contentEditableToMarkdown`
  from it) — not removed, since removing public API on a published package needs a deliberate major
  bump, not a silent architecture cleanup. Added doc comments to both files' headers stating this
  relationship so it isn't rediscovered as "duplication" next time.
- Verified: `tsc --noEmit` clean in `packages/lib`; `pnpm run build` (full build incl. type decls)
  succeeds; ran the built `dist/index.esm.js` directly under Node and confirmed
  `markdownToHtml('# Hello\n\n**bold** *italic*\n\n- one\n- two')` produces correct HTML via
  slimdown-js, and `markdownToWysiwygHtml` (the actual fallback editor.ts calls) is exported and
  functional. `packages/example` typechecks against the rebuilt `.d.ts` (one remaining CSS-import
  error is pre-existing/unrelated — confirmed via `git stash` — part of the in-progress rspack→vite
  migration happening outside this task).
- Note: `packages/example`'s own `markedRenderer`/`slimdownRenderer` toggle
  (`packages/example/src/markdown-utils.ts`) already demonstrated `slimdown-js` as a pluggable
  `markdownToHtml` prop before this task — this task only changed the *internal default* used when
  no prop is passed.

- **Follow-up (same session, user-directed):** re-litigated whether bundling `slimdown-js` as a
  hard dependency was right, since it forces it into every consumer's bundle even when they pass
  their own renderer. Decision: keep the built-in default (asked and confirmed — dropping it and
  requiring `markdownToHtml` was rejected as it would be a bigger breaking change for less benefit,
  and would make `markdownToHtml`/`htmlToMarkdown` asymmetric since `htmlToMarkdown` already has a
  zero-config built-in default). Additionally, per explicit request:
  - Re-exported `slimdown-js`'s `render`/`addRule`/types from `packages/lib/src/index.ts` as
    `slimdownRender`/`slimdownAddRule`/`SlimdownRenderOptions`/`SlimdownExtension`, so consumers who
    want to pass it explicitly (e.g. with custom `RenderOptions`) don't need `slimdown-js` as a
    second direct dependency — only one copy ships, already bundled here.
  - Added `"sideEffects": false` to `packages/lib/package.json` for general tree-shaking hygiene
    (verified safe: the `import "./styles.css"` side-effect in `src/index.ts` is extracted to a
    separate `dist/index.css` file by the Vite build, not left as a JS-level side effect in
    `dist/index.esm.js`).
  - **Important limitation surfaced and explained to the user, not silently glossed over:** this
    does *not* make `slimdown-js` droppable from bundles that use `MarkdownEditor`, even for
    consumers who always pass their own `markdownToHtml`. `editor.ts`'s fallback path statically
    imports and references `markdownToWysiwygHtml` unconditionally — bundlers tree-shake based on
    the *import graph*, not on which runtime branches execute, so they can't prove the fallback is
    unreachable for a given consumer. True elimination would require converting the fallback to a
    dynamic `import()`, making markdown→HTML conversion asynchronous throughout the editor — judged
    out of proportion to the bundle-size win and not pursued.
