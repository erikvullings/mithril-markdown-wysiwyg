# Mithril Markdown WYSIWYG Editor

A powerful WYSIWYG markdown editor built with Mithril.js, featuring dual-mode editing, theme support, and extensive formatting options.

## Features

- 🎨 **Dual Mode**: Switch seamlessly between WYSIWYG and Markdown modes
- 🌓 **Theme Support**: Light and dark themes included
- 🛠️ **Rich Toolbar**: Full formatting options including bold, italic, headers, lists, links, images, and tables
- 📱 **Responsive**: Works great on desktop and mobile devices
- 🎯 **TypeScript**: Full TypeScript support with proper type definitions
- 🔧 **Pluggable Renderers**: Use any markdown renderer (marked.js, `slimdown-js`, etc.)
- ⚡ **Zero Dependencies**: Core library has no runtime dependencies
- 🎛️ **Configurable**: Hide tabs, toolbar, or customize themes
- 🌍 **Empty Content Handling**: Built-in empty content checks

## Demo

Visit the [live demo](https://erikvullings.github.io/mithril-markdown-wysiwyg) to see the editor in action.

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
  theme?: 'light' | 'dark' // Theme (default: "light")
  placeholder?: string // Placeholder text

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
```

## Supported Formatting

The editor supports all standard markdown formatting:

- **Text formatting**: Bold, italic, strikethrough
- **Headers**: H1 through H6
- **Lists**: Ordered, unordered, and task lists
- **Links and images**: With modal dialogs for easy insertion
- **Code**: Inline code and code blocks
- **Tables**: Full table editing with context menu
- **Block elements**: Block-quotes, horizontal rules
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
- Markdown rendering examples use [Marked](https://marked.js.org/) and [`Slimdown.js`](https://github.com/ianforth/slimdown-js)
