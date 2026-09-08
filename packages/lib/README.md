# Mithril Markdown WYSIWYG Editor

A powerful WYSIWYG markdown editor built with Mithril.js, featuring dual-mode editing, theme support, and extensive formatting options.

## Features

- **Dual Mode**: Switch seamlessly between WYSIWYG and Markdown modes
- **Theme Support**: Light, dark, and automatic system themes
- **Rich Toolbar**: Full formatting options including bold, italic, headers, lists, links, images, and tables
- **Find and Replace**: VS Code-style search with case, whole-word, and regex options
- **EPUB Editing**: Preserved hard breaks, paragraphs, and semantic page breaks
- **Compact Markdown**: Optionally hide large inline base64 image payloads while editing
- **Responsive**: Works great on desktop and mobile devices
- **TypeScript**: Full TypeScript support with proper type definitions
- **Pluggable Renderers**: Use any markdown renderer (marked.js, `slimdown-js`, etc.)
- **Built-in Renderer**: `slimdown-js` is bundled and ready without extra setup
- **Configurable**: Hide tabs, toolbar, or customize themes
- **Empty Content Handling**: Built-in empty content checks

## Demo

Visit the [live demo](https://erikvullings.github.io/mithril-markdown-wysiwyg) to see the editor in action.

| Light theme | Dark theme |
| :---: | :---: |
| <img src="https://raw.githubusercontent.com/erikvullings/mithril-markdown-wysiwyg/main/docs/assets/editor-light.webp" alt="Mithril Markdown WYSIWYG editor using the light theme" width="560"> | <img src="https://raw.githubusercontent.com/erikvullings/mithril-markdown-wysiwyg/main/docs/assets/editor-dark.webp" alt="Mithril Markdown WYSIWYG editor using the dark theme" width="560"> |

## Installation

```bash
npm install mithril-markdown-wysiwyg
```

## Quick Start

```typescript
import m from 'mithril'
import { MarkdownEditor } from 'mithril-markdown-wysiwyg'
import 'mithril-markdown-wysiwyg/css'

const App = () => {
  let content = '# Hello World\\n\\nStart writing your markdown here...'

  return {
    view: () =>
      m(MarkdownEditor, {
        content,
        onContentChange: (newContent: string) => {
          content = newContent
        },
        placeholder: 'Start writing...',
        theme: 'light',
        toolbar: true,
        showTabs: true,
      }),
  }
}

m.mount(document.body, App)
```

## Configuration

```typescript
interface MarkdownEditorAttrs {
  content: string
  mode?: 'wysiwyg' | 'markdown'
  theme?: 'light' | 'dark' | 'auto'
  placeholder?: string
  hideBase64Images?: boolean
  toolbar?: boolean
  showTabs?: boolean
  isPreview?: boolean
  markdownToHtml?: (markdown: string) => string
  htmlToMarkdown?: (html: string) => string
  onContentChange?: (content: string) => void
  onModeChange?: (mode: 'wysiwyg' | 'markdown') => void
}
```

### EPUB authoring

`Enter` starts a new paragraph and `Shift+Enter` inserts a hard line break.
Both remain distinct when switching modes. The page-break toolbar button inserts
the portable marker `<!-- markdown:page-break -->`; rendered HTML uses a
`role="doc-pagebreak"` element with both `break-after: page` and
`page-break-after: always` styling for EPUB compatibility.

The built-in `slimdown-js` renderer supports soft paragraph continuations and
Markdown hard breaks (`two trailing spaces + newline`), including continuations
inside list items and blockquotes.

Set `hideBase64Images: true` to replace inline base64 payloads with compact,
size-labelled placeholders in Markdown mode. The original data remains in the
editor value and images continue to render normally in WYSIWYG mode.

Copying a Markdown selection that fully contains one or more hidden image
placeholders writes their original data URIs to the clipboard (`text/plain`)
instead of the placeholder text, so copy/paste round-trips the real image
data - both within the same editor and between two editor instances. A
selection that only partially overlaps a placeholder falls back to the
browser's ordinary copy of the selected characters, which is always safe
since `display` never contains a truncated or otherwise malformed data URI.
Pasting Markdown that contains a real base64 data URI stores the real data
in the editor value; the textarea immediately re-masks it back to a
placeholder on the next render. This behavior only applies to the Markdown
textarea when `hideBase64Images: true`; WYSIWYG-mode copy/paste is
unaffected.

### Search and replace

Use `Cmd+F`/`Ctrl+F` for find and `Cmd+H`/`Ctrl+H` for find and replace.
Search supports previous/next navigation, case sensitivity, whole words, and
regular expressions.

### Themes

Use `theme: 'light'`, `theme: 'dark'`, or `theme: 'auto'` to follow the
operating-system theme.

## Supported Formatting

- Text formatting: bold, italic, and strikethrough
- Headers: H1 through H6
- Lists: ordered, unordered, and task lists
- Links and images, including inline base64 images
- Inline code and fenced code blocks
- Tables
- Blockquotes, horizontal rules, and EPUB page breaks
- Copy/paste, undo/redo, and drag and drop

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

See the [complete documentation](https://github.com/erikvullings/mithril-markdown-wysiwyg#readme)
for renderer examples, development instructions, and contribution guidelines.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
