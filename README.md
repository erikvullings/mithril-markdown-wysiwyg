# Mithril Markdown WYSIWYG Editor

A powerful WYSIWYG markdown editor built with Mithril.js, inspired by the [markdown-wysiwyg](https://github.com/celsowm/markdown-wysiwyg) project.

## Features

- 🎨 **Dual Mode**: Switch seamlessly between WYSIWYG and Markdown modes
- 🌓 **Theme Support**: Light and dark themes included
- 🛠️ **Rich Toolbar**: Full formatting options including bold, italic, headers, lists, links, images, and tables
- ⚡ **Fast & Lightweight**: Built with Rollup for optimal bundle size
- 📱 **Responsive**: Works great on desktop and mobile devices
- 🎯 **TypeScript**: Full TypeScript support with proper type definitions

## Demo

Visit the [live demo](https://your-username.github.io/mithril-markdown-wysiwyg) to see the editor in action.

## Installation

```bash
# Install the package
npm install mithril-markdown-wysiwyg

# or with pnpm
pnpm add mithril-markdown-wysiwyg

# or with yarn
yarn add mithril-markdown-wysiwyg
```

## Usage

### Basic Usage

```typescript
import m from 'mithril';
import { createMarkdownEditor } from 'mithril-markdown-wysiwyg';

const App = () => {
  const editor = createMarkdownEditor({
    theme: 'light',
    mode: 'wysiwyg',
    initialValue: '# Hello World\\n\\nStart writing your markdown here...',
    onChange: (value) => {
      console.log('Content changed:', value);
    }
  });

  return {
    view: () => m(editor.component, {
      ...editor.options,
      state: editor.states(),
      actions: editor.actions
    })
  };
};

m.mount(document.body, App);
```

### Configuration Options

```typescript
interface EditorOptions {
  theme?: 'light' | 'dark';           // Theme (default: 'light')
  placeholder?: string;               // Placeholder text
  toolbar?: boolean;                  // Show toolbar (default: true)
  initialValue?: string;              // Initial content
  onChange?: (value: string) => void; // Change callback
  mode?: 'wysiwyg' | 'markdown';     // Initial mode (default: 'wysiwyg')
}
```

### Available Actions

The editor exposes several actions you can use programmatically:

```typescript
const editor = createMarkdownEditor();

// Toggle between light and dark themes
editor.actions.toggleTheme();

// Toggle preview mode
editor.actions.togglePreview();

// Update editor content and state
editor.actions.updateEditor({
  content: 'New content',
  mode: 'markdown'
});
```

## Development

This is a monorepo with two packages:

- `packages/lib` - The main library package
- `packages/example` - Example application for testing

### Setup

```bash
# Install dependencies
pnpm install

# Build the library
pnpm -C packages/lib build

# Build the example app (outputs to docs/ for GitHub Pages)
pnpm -C packages/example build

# Run the example app in development mode
pnpm -C packages/example dev
```

### Scripts

```bash
# Build all packages
pnpm build

# Run development servers for all packages
pnpm dev

# Preview the built example
http-server docs -p 3000
```

## Architecture

### Library Package (`packages/lib`)

- **TypeScript**: Full type safety
- **Rollup**: Modern bundling with tree-shaking
- **Marked**: Markdown parsing and rendering
- **PostCSS**: CSS processing and optimization

### Example Package (`packages/example`)

- **Rspack**: Fast bundling for development and production
- **TypeScript**: Type-safe development
- **GitHub Pages**: Automatic deployment to `docs/` folder

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [celsowm/markdown-wysiwyg](https://github.com/celsowm/markdown-wysiwyg)
- Built with [Mithril.js](https://mithril.js.org/)
- Uses [Marked](https://marked.js.org/) for markdown processing