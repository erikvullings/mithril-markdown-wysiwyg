import m from "mithril";
import { MarkdownEditor, MarkdownEditorAttrs } from "mithril-markdown-wysiwyg";
import "mithril-markdown-wysiwyg/dist/index.css";
import { markedRenderer, slimdownRenderer } from "./markdown-utils";

const initialContent = `# Welcome to the Mithril Markdown Editor

This is a **powerful** WYSIWYG markdown editor built with *Mithril.js*.

## Features

- **Dual Mode**: Switch between WYSIWYG and Markdown modes
- **Theme Support**: Light and dark themes
- **Rich Toolbar**: Full formatting options
- **Real-time Preview**: See your markdown rendered instantly
- **Pluggable Renderers**: Use marked.js or slimdown-js

### Formatting Examples

You can format text in many ways:

- **Bold text**
- *Italic text*
- ~~Strikethrough text~~
- \`Inline code\`
- [Links](https://mithril.js.org)

### Code Blocks

\`\`\`javascript
const editor = {
  theme: 'light',
  mode: 'wysiwyg',
  content: 'Hello world!'
};
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

- Unordered item
- Another item
- Last item

### Tables

| Feature | Supported |
|---------|-----------|
| Bold | ✅ |
| Italic | ✅ |
| Links | ✅ |
| Tables | ✅ |

> This is a blockquote. It can contain multiple lines and **formatted text**.

---

Try switching between **Visual** and **Markdown** modes to see the editor in action!`;

interface AppState {
  editor1: {
    mode: "wysiwyg" | "markdown";
    content: string;
    theme: "light" | "dark";
    isPreview: boolean;
    renderer: "marked" | "slimdown";
  };
  editor2: {
    mode: "wysiwyg" | "markdown";
    content: string;
    theme: "light" | "dark";
    isPreview: boolean;
    renderer: "marked" | "slimdown";
  };
}

const App = () => {
  let state: AppState = {
    editor1: {
      mode: "wysiwyg",
      content: initialContent,
      theme: "light",
      isPreview: false,
      renderer: "marked",
    },
    editor2: {
      mode: "markdown",
      content:
        "# Simple Editor with slimdown-js\n\nThis editor uses **slimdown-js** for rendering.",
      theme: "light",
      isPreview: false,
      renderer: "slimdown",
    },
  };

  const updateEditor1 = (updates: Partial<typeof state.editor1>) => {
    state.editor1 = { ...state.editor1, ...updates };
    m.redraw();
  };

  const updateEditor2 = (updates: Partial<typeof state.editor2>) => {
    state.editor2 = { ...state.editor2, ...updates };
    m.redraw();
  };

  const toggleTheme = () => {
    const newTheme = state.editor1.theme === "light" ? "dark" : "light";
    updateEditor1({ theme: newTheme });
    updateEditor2({ theme: newTheme });
    document.body.className = newTheme === "dark" ? "dark-theme" : "";
  };

  const togglePreview = () => {
    updateEditor1({ isPreview: !state.editor1.isPreview });
  };

  const toggleRenderer1 = () => {
    const newRenderer =
      state.editor1.renderer === "marked" ? "slimdown" : "marked";
    updateEditor1({ renderer: newRenderer });
  };

  const getRenderer = (rendererType: "marked" | "slimdown") => {
    return rendererType === "marked" ? markedRenderer : slimdownRenderer;
  };

  return {
    view: () => [
      m("div.container", [
        m("div.header", [
          m("h1", "Mithril Markdown WYSIWYG Editor"),
          m("p", "A powerful WYSIWYG markdown editor built with Mithril.js"),
        ]),

        m("div.demo-section", [
          m("h2", `Editor with ${state.editor1.renderer} renderer`),
          m("div.controls", [
            m("button.theme-toggle", { onclick: toggleTheme }, "Toggle Theme"),
            m(
              "button.theme-toggle",
              { onclick: togglePreview },
              "Toggle Preview",
            ),
            m(
              "button.theme-toggle",
              { onclick: toggleRenderer1 },
              `Switch to ${state.editor1.renderer === "marked" ? "slimdown" : "marked"}`,
            ),
          ]),
          m(MarkdownEditor, {
            mode: state.editor1.mode,
            content: state.editor1.content,
            theme: state.editor1.theme,
            isPreview: state.editor1.isPreview,
            toolbar: true,
            placeholder: "Start writing...",
            ...getRenderer(state.editor1.renderer),
            onContentChange: (content: string) => {
              updateEditor1({ content });
              console.log(
                "Editor 1 content changed:",
                content.length,
                "characters",
              );
            },
            onModeChange: (mode: "wysiwyg" | "markdown") => {
              updateEditor1({ mode });
            },
          } as MarkdownEditorAttrs),
        ]),

        m("div.demo-section", [
          m(
            "h2",
            `Minimal Editor with ${state.editor2.renderer} renderer (No Toolbar)`,
          ),
          m(MarkdownEditor, {
            mode: state.editor2.mode,
            content: state.editor2.content,
            theme: state.editor2.theme,
            isPreview: state.editor2.isPreview,
            toolbar: false,
            placeholder: "Type your markdown here...",
            ...getRenderer(state.editor2.renderer),
            onContentChange: (content: string) => {
              updateEditor2({ content });
            },
            onModeChange: (mode: "wysiwyg" | "markdown") => {
              updateEditor2({ mode });
            },
          } as MarkdownEditorAttrs),
        ]),

        m("div.demo-section", [
          m("h2", "Usage Examples"),
          m("div", [
            m("h3", "Basic Setup"),
            m(
              "pre",
              m(
                "code",
                `import m from "mithril";
import { MarkdownEditor } from "mithril-markdown-wysiwyg";
import "mithril-markdown-wysiwyg/dist/index.css";

const App = () => {
  let content = "# Hello World";

  return {
    view: () =>
      m(MarkdownEditor, {
        content,
        onContentChange: (newContent) => {
          content = newContent;
        },
        placeholder: "Start writing...",
        theme: "light",
        toolbar: true,
        showTabs: true
      })
  };
};`,
              ),
            ),

            m("h3", "With Custom Renderer"),
            m(
              "pre",
              m(
                "code",
                `import { marked } from "marked";

const App = () => {
  let content = "";

  return {
    view: () =>
      m(MarkdownEditor, {
        content,
        onContentChange: (newContent) => content = newContent,
        markdownToHtml: (markdown) => marked.parse(markdown),
        theme: "dark"
      })
  };
};`,
              ),
            ),

            m("h3", "Configuration Options"),
            m(
              "pre",
              m(
                "code",
                `interface MarkdownEditorAttrs {
  content: string;                           // Required
  mode?: "wysiwyg" | "markdown";            // Default: "wysiwyg"
  theme?: "light" | "dark";                 // Default: "light"
  toolbar?: boolean;                        // Default: true
  showTabs?: boolean;                       // Default: true
  isPreview?: boolean;                      // Default: false
  placeholder?: string;
  markdownToHtml?: (md: string) => string;  // Optional renderer
  htmlToMarkdown?: (html: string) => string; // Optional converter
  onContentChange?: (content: string) => void;
  onModeChange?: (mode: string) => void;
}`,
              ),
            ),
          ]),
        ]),

        m("div.demo-section", [
          m("h2", "About the Implementation"),
          m("div", [
            m("h3", "Key Features:"),
            m("ul", [
              m(
                "li",
                "🔧 Dependency injection: markdown renderers are injected, not bundled",
              ),
              m(
                "li",
                "🔄 No conversion corruption: content is preserved when switching modes",
              ),
              m(
                "li",
                "🔌 Pluggable renderers: Use marked.js, slimdown-js, or any custom renderer",
              ),
              m("li", "📦 Clean architecture: lib has zero dependencies"),
              m("li", "🛠️ Full toolbar with proper grouping and separators"),
              m("li", "🌓 Dark theme support with proper contrast"),
              m("li", "📱 Responsive design for mobile and desktop"),
              m("li", "♿ Keyboard navigation and accessibility support"),
              m(
                "li",
                "🎛️ Configurable UI: hide tabs, toolbar, or customize themes",
              ),
              m("li", "🔍 Built-in empty content handling"),
            ]),
            m("h3", "Renderers:"),
            m("ul", [
              m("li", [
                m("strong", "marked.js"),
                ": Full-featured GitHub-flavored markdown with table support",
              ]),
              m("li", [
                m("strong", "slimdown-js"),
                ": Lightweight, fast markdown renderer",
              ]),
              m("li", [
                m("strong", "Custom"),
                ": Bring your own renderer - any function that converts markdown to HTML",
              ]),
            ]),
          ]),
        ]),
      ]),
    ],
  };
};

m.mount(document.body, App);
