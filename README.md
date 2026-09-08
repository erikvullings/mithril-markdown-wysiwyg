# Mithril Markdown WYSIWYG Editor

A powerful WYSIWYG markdown editor built with Mithril.js, featuring dual-mode editing, theme support, and extensive formatting options.

## Features

- 🎨 **Dual Mode**: Switch seamlessly between WYSIWYG and Markdown modes
- 🌓 **Theme Support**: Light, dark, and automatic system themes
- 🛠️ **Rich Toolbar**: Full formatting options including bold, italic, headers, lists, links, images, and tables
- 🔎 **Find and Replace**: VS Code-style search with case, whole-word, and regex options
- 📖 **EPUB Editing**: Preserved hard breaks, paragraphs, and semantic page breaks
- 🖼️ **Compact Markdown**: Optionally hide large inline base64 image payloads while editing
- 📱 **Responsive**: Works great on desktop and mobile devices
- 🎯 **TypeScript**: Full TypeScript support with proper type definitions
- 🔧 **Pluggable Renderers**: Use any markdown renderer (marked.js, `slimdown-js`, etc.)
- ⚡ **Built-in Renderer**: `slimdown-js` is bundled and ready without extra setup
- 🎛️ **Configurable**: Hide tabs, toolbar, or customize themes
- 🌍 **Empty Content Handling**: Built-in empty content checks

## Demo

Visit the [live demo](https://erikvullings.github.io/mithril-markdown-wysiwyg) to see the editor in action.

| Light theme | Dark theme |
| :---: | :---: |
| <img src="https://raw.githubusercontent.com/erikvullings/mithril-markdown-wysiwyg/main/docs/assets/editor-light.webp" alt="Mithril Markdown WYSIWYG editor using the light theme" width="560"> | <img src="https://raw.githubusercontent.com/erikvullings/mithril-markdown-wysiwyg/main/docs/assets/editor-dark.webp" alt="Mithril Markdown WYSIWYG editor using the dark theme" width="560"> |

Try the editor directly in the browser with the [live Flems example](https://flems.io/#0=N4IgtglgJlA2CmIBcAWArAGhAZ3ggxgC7xTIgB0AVtiFgGYQI1IDaoAdgIZiJIUAWhMLFoh8Ae3bEpZADxhOEdgAJoAXgA6ITgAcdWgHyyA9AqUGQAXwwduvCtVESp8GX2fZCy4MoCynACcAayhxAHd2AFEoCEJxAOVLZTU-WP4Axn9g0IiAdQBNAGUASQKAcQBuDXZqhC9PTmJk72rlZTBxKHgkZS0FbPCa2lblQn54Hh6tTgBXOK0MEedpQh6AAwBiZUiABQBVACFlElilAHNlLo7q6r3cZQAqB4BhMChjZ8IA2ABqADEnqNxMoGOwoKN4AAPLycMGPF5vD5fX4ACUBcWUAXgOlgnHw8FUhHIN3YOyx2Gw2xcCTo8WUnGU7HgYWUOkCnDOAV0-HpcMK-AgdEIP0i1JBdIZ-EC4NgSgJACMsZwgsSauw7gSxgSdhyCQclUEgeJYPLAsp5XM4ioMUpcAFViTZABCAC0LvagRCgyQbLO8BdivgyuUboMJIAKuMPcF4AlsDMAgA3CCJ+CUrJeiIYZQo8O+AAy2dh4N2h2U4jmOjm5DW1UsVTVHi8AEE9M1gCNk8yegAKACUyQM7R7GZyURicQC2Y7KjaymWrlWygaxHIC6ki1nbQ6XR6K-g5B38E3c9G40my8IjQPWp4J7ncWNpoCPS+M2PIza2H44XDnHl2CvgE773m0ApdAcnC4AAbCgxQKH6gGjMBH5buW7DPJIKzPFK7B+j065eGoQ77muWGLs0hGgehvidPAOGwvh7R0YOl7XoeLEpEeIyWH2dYNtUYAcTMUg9qE+AzDwUjkAAju+AQAJ6FHg8BEPEPZaBsuj6CAfbZq2Oh9hUVg2CAXA8GQa4Uk45FuCAgjCNm8qdAp3jRmcSg9AADBU7RKC64wQGcgg9AAjF5XkAKS+ZY1TOVArk+GyMDnGFWJgL5pr4EEnIVmCPQbHQ0F0AAHHQnAxdUWltj4gXBUuJVeYm-C+QokIumE0BjGFEVeTokKtYEHnsD0sxxDFVgALpYLK7BBMwbBmXYZCQGMGQiFgCYiHwgiEDogHGMYIk6DlZFgKYaTrQAAgATOQADM5AlRda2MIeShUDQWCEApOj2Ng+AZDohAmbYFl8Cck6iFtZC7ftSCHcdp0SOdq3pIwLr9Jm7AdQp2AQGEClnFduLEJ4xgxOTShdJC5CSVA73sJ9og-X9ZAA0DIPWGD9iQ3SngKUw0PfLDhB7QdR3sCdZxnS96OwJjnpjrj+OE8TpNpoQFMQFTYJQlZX0gKz-0-QgU2WEAA).

## Installation

```bash
npm install mithril-markdown-wysiwyg
# or
pnpm add mithril-markdown-wysiwyg
# or
yarn add mithril-markdown-wysiwyg
```

Publish, after updating the version number in `lib/package.json`, using `cd packages/lib && npm publish`

## Quick Start

### Basic Usage

```typescript
import m from 'mithril'
import { MarkdownEditor } from 'mithril-markdown-wysiwyg'
import 'mithril-markdown-wysiwyg/css' // or '/style.css' or '/dist/index.css'

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

### With External Markdown Renderer

```typescript
import { marked } from 'marked'
import { MarkdownEditor } from 'mithril-markdown-wysiwyg'

// Configure marked for GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true,
})

const App = () => {
  let content = ''

  return {
    view: () =>
      m(MarkdownEditor, {
        content,
        onContentChange: (newContent: string) => {
          content = newContent
        },
        // Provide your own markdown renderer
        markdownToHtml: (markdown: string) => {
          // Empty content is automatically handled by the editor
          return marked.parse(markdown) as string
        },
        theme: 'dark',
        mode: 'markdown',
      }),
  }
}
```

### Advanced Configuration

```typescript
import m from 'mithril'
import { MarkdownEditor, MarkdownEditorAttrs } from 'mithril-markdown-wysiwyg'
import { render as slimdownRender } from 'slimdown-js'

const App = () => {
  let state = {
    content: '',
    mode: 'wysiwyg' as const,
    theme: 'light' as const,
    isPreview: false,
  }

  const updateState = (updates: Partial<typeof state>) => {
    state = { ...state, ...updates }
    m.redraw()
  }

  return {
    view: () => [
      // Controls
      m('div.controls', [
        m(
          'button',
          {
            onclick: () =>
              updateState({
                theme: state.theme === 'light' ? 'dark' : 'light',
              }),
          },
          'Toggle Theme',
        ),

        m(
          'button',
          {
            onclick: () =>
              updateState({
                isPreview: !state.isPreview,
              }),
          },
          'Toggle Preview',
        ),
      ]),

      // Editor
      m(MarkdownEditor, {
        content: state.content,
        mode: state.mode,
        theme: state.theme,
        isPreview: state.isPreview,
        toolbar: true,
        showTabs: true,
        placeholder: 'Write your content here...',

        // Custom renderer
        markdownToHtml: (markdown: string) => slimdownRender(markdown),

        // Event handlers
        onContentChange: (content: string) => {
          updateState({ content })
          console.log('Content changed:', content.length, 'characters')
        },

        onModeChange: (mode: 'wysiwyg' | 'markdown') => {
          updateState({ mode })
          console.log('Mode changed to:', mode)
        },
      } as MarkdownEditorAttrs),
    ],
  }
}
```

## API Reference

### `MarkdownEditorAttrs` Interface

```typescript
interface MarkdownEditorAttrs {
  // Content
  content: string // Editor content (required)

  // Display options
  mode?: 'wysiwyg' | 'markdown' // Edit mode (default: "wysiwyg")
  theme?: 'light' | 'dark' | 'auto' // Theme (default: "light")
  placeholder?: string // Placeholder text
  hideBase64Images?: boolean // Mask inline image data in Markdown mode

  // UI options
  toolbar?: boolean // Show toolbar (default: true)
  showTabs?: boolean // Show mode tabs (default: true)
  isPreview?: boolean // Show preview pane (default: false)

  // Renderers (optional - built-in fallback provided)
  markdownToHtml?: (markdown: string) => string
  htmlToMarkdown?: (html: string) => string

  // Event handlers
  onContentChange?: (content: string) => void
  onModeChange?: (mode: 'wysiwyg' | 'markdown') => void
  onTogglePreview?: () => void
  onToggleTheme?: () => void
}
```

### Key Features

#### Empty Content Handling

The editor automatically handles empty content scenarios. You don't need to check for empty strings in your markdown renderer:

```typescript
// ❌ Before - you had to do this in your renderer
markdownToHtml: (markdown: string) => {
  if (!markdown || markdown.trim() === '') {
    return ''
  }
  return marked.parse(markdown)
}

// ✅ Now - the editor handles it automatically
markdownToHtml: (markdown: string) => marked.parse(markdown)
```

#### Tabs Control

Hide the mode switching tabs if you want a single-mode editor:

```typescript
m(MarkdownEditor, {
  content,
  showTabs: false, // Hides Visual/Markdown tabs
  mode: 'wysiwyg', // Locks to WYSIWYG mode
  onContentChange: (content) => {
    /* ... */
  },
})
```

#### Theme Switching

```typescript
// Light theme (default)
m(MarkdownEditor, { theme: 'light' /* ... */ })

// Dark theme
m(MarkdownEditor, { theme: 'dark' /* ... */ })

// Follow the operating-system theme
m(MarkdownEditor, { theme: 'auto' /* ... */ })
```

#### EPUB authoring

`Enter` starts a new paragraph and `Shift+Enter` inserts a hard line break.
Both remain distinct when switching modes. The page-break toolbar button inserts
the portable marker `<!-- markdown:page-break -->`; rendered HTML uses a
`role="doc-pagebreak"` element with both `break-after: page` and
`page-break-after: always` styling for EPUB compatibility.

The built-in `slimdown-js` renderer supports soft paragraph continuations and
Markdown hard breaks (`two trailing spaces + newline`), including continuations
inside list items and blockquotes. These remain distinct in rendered HTML and
EPUB output.

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

Use `Cmd+F`/`Ctrl+F` for find and `Cmd+H`/`Ctrl+H` for find and replace.
Search supports previous/next navigation, case sensitivity, whole words, and
regular expressions.

## Supported Formatting

The editor supports all standard markdown formatting:

- **Text formatting**: Bold, italic, strikethrough
- **Headers**: H1 through H6
- **Lists**: Ordered, unordered, and task lists
- **Links and images**: With modal dialogs for easy insertion
- **Code**: Inline code and code blocks
- **Tables**: Full table editing with context menu
- **Block elements**: Block-quotes, horizontal rules, EPUB page breaks
- **Advanced**: Copy/paste, undo/redo, drag & drop

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Development

### Building

```bash
# Install dependencies
pnpm install

# Build library
pnpm build

# Run example in development
pnpm -C packages/example dev
```

### Testing

```bash
# Build and test
pnpm build
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Mithril.js](https://mithril.js.org/)
- Markdown rendering examples use [Marked](https://marked.js.org/) and [`slimdown-js`](https://github.com/erikvullings/slimdown-js)
