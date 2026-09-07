# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mithril-markdown-wysiwyg is a WYSIWYG markdown editor library for Mithril.js, published as an npm package. It provides dual-mode editing (visual HTML editor + raw markdown textarea), a rich toolbar with 50+ formatting actions, theme support, i18n, and pluggable markdown renderers.

## Repository Structure

```
packages/
  lib/              # Core library (published to npm as mithril-markdown-wysiwyg)
    src/
      editor.ts             # MarkdownEditor Mithril component (main entry)
      editor-actions.ts     # EditorActions class — all formatting/insertion logic
      types.ts              # TypeScript interfaces (MarkdownEditorAttrs, ToolbarButton)
      toolbar-config.ts     # Button definitions, icons, grouping, i18n config
      i18n/index.ts         # i18n strings interface, defaults, createI18n() factory
      index.ts              # Public exports
      styles.css            # All editor CSS
      global.d.ts           # `declare module "*.css"` for Vite
    vite.config.ts          # Multi-format build (ESM, CJS, UMD, UMD-min)
    vitest.config.ts        # jsdom test environment
  example/                # Demo app with 3 editor instances (marked, slimdown, Dutch i18n)
docs/                     # Deployed demo site (built from example/)
TASKS/                    # Active development tasks
```

## Key Architecture

**Two-panel dual-mode editor**: The `MarkdownEditor` component maintains two parallel content stores (`wysiwygContent` as HTML, `markdownContent` as markdown strings). Mode switching converts between them using `builtinHtmlToMarkdown` (default) and `markdownToWysiwygHtml` (wraps slimdown-js). The conversion happens inside `handleModeChange()` and `handleContentChange()`.

**EditorActions class** (`editor-actions.ts`): All formatting logic lives here. Each action (bold, heading, etc.) dispatches mode-specific implementations — DOM mutations via `DOMUtils` for WYSIWYG, string manipulation via `MarkdownUtils` for markdown mode. This class is instantiated once per editor instance in the `editor.ts` lifecycle.

**Toolbar configuration**: `toolbar-config.ts` defines `toolbarButtonGroups` (7 groups, ~22 buttons) with inline SVG icons. Buttons can be simple actions, modals (link/image/table), or dropdowns (headings). `createI18nToolbarConfig()` translates titles at runtime.

**Multiple output formats**: Vite produces ESM (`index.esm.js`), CJS (`index.js`), UMD (`index.umd.js`), and minified UMD (`index.umd.min.js`). Build uses `emptyOutDir: false` to preserve generated `.d.ts` files across the type-then-bundle pipeline.

## Common Commands

```bash
# Install dependencies
pnpm install

# Build library (runs in prepare hook)
pnpm build:lib

# Build everything (lib + example)
pnpm build

# Run example app in dev mode
pnpm -C packages/example dev

# Run tests
pnpm -C packages/lib test

# Run tests in watch mode
pnpm -C packages/lib test:watch

# Run a single test file
pnpm -C packages/lib test -- --reporter=verbose src/utils/dom-commands.test.ts

# Release (bumps version in lib/package.json and publishes)
pnpm release:patch
pnpm release:minor
pnpm release:major
```

## Development Notes

- **Tests**: Vitest with jsdom. Test files live alongside source as `*.test.ts`. Run `pnpm -C packages/lib test` from repo root.
- **TypeScript**: Strict mode, targets ES2019. Declaration files generated via `tsc --emitDeclarationOnly`.
- **CSS**: Single source file `src/styles.css` — exported as a sideEffect via Vite. No CSS modules.
- **Peer dependency**: `mithril ^2.3.8`. The library also bundles `slimdown-js` as the default markdown renderer (re-exported for consumers who want to use it explicitly).
- **Cursor management**: `cursor-position-store.ts` preserves scroll/selection across mode switches. It's scoped per editor instance to support multiple editors on one page.
- **Undo/redo**: Only available in WYSIWYG mode via `ContentHistory` — wraps `this.history.undo()`/`.redo()` and directly sets `contentEditable.innerHTML`. Marked mode has no undo/redo.
- **Deprecations**: `onTogglePreview` and `onToggleTheme` in `MarkdownEditorAttrs` are marked deprecated — the callbacks exist but are never invoked. The theme toggle is done externally by the consumer.
- **Multiple renderers**: The example app demonstrates 3 configurations: (1) full editor with marked.js, (2) minimal (no toolbar) with slimdown-js, (3) Dutch i18n with marked.js. Use this as a reference for consumer patterns.
