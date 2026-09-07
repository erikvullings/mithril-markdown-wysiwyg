/**
 * High-level syntax highlighting functions.
 *
 * Exports two public functions:
 * - `highlightMarkdown(text, grammar)` — produces HTML with colored spans for
 *   raw Markdown source (used by the textarea overlay).
 * - `highlightCodeBlocks(html, language)` — post-processes rendered HTML and
 *   adds syntax highlighting to `<pre><code>` blocks inside it.
 */

import { escapeHTML, tokenize, renderToHTML } from "./syntax-tokenizer";
import type { GrammarRule } from "./syntax-tokenizer";
import { markdownGrammar } from "./markdown-grammar";
import { getGrammarForLanguage } from "./code-grammar";

// ── Markdown highlighting ──────────────────────────────────────────────────

/**
 * Highlight a Markdown string and return HTML with `<span>` tokens.
 *
 * @param text          The raw Markdown text.
 * @param grammar       Optional grammar override; defaults to `markdownGrammar`.
 * @returns HTML with syntax-highlighting `<span>` elements.
 */
export const highlightMarkdown = (
  text: string,
  grammar: GrammarRule[] = markdownGrammar,
): string => {
  if (!text) return "";
  const tokens = tokenize(text, grammar);
  return renderToHTML(tokens);
};

// ── Code-block highlighting ────────────────────────────────────────────────

/**
 * Highlight code blocks inside rendered HTML.
 *
 * Finds every `<pre><code class="language-…">…</code></pre>` block in the
 * HTML, extracts the text content, tokenizes it with the appropriate language
 * grammar, and injects the highlighted spans back into the block.
 *
 * @param html     The rendered HTML string (e.g. from `markdownToHtml`).
 * @param language Fallback language when no `language-x` class is found
 *                 (defaults to `"js"`).
 * @returns The HTML string with syntax-highlighted `<span>` elements inside
 *          each code block.
 */
export const highlightCodeBlocks = (
  html: string,
  language: string = "js",
): string => {
  if (!html) return "";

  // Match <pre><code class="language-...">...</code></pre>
  const codeBlockRegex =
    /<pre[^>]*><code(?:\s+class="language-([^"]*)")?[^>]*>([\s\S]*?)<\/code><\/pre>/gi;

  return html.replace(codeBlockRegex, (_match: string, classLang: string | undefined, content: string) => {
    const lang = (classLang || language).toLowerCase();
    const grammar = getGrammarForLanguage(lang);

    if (!content.trim()) {
      return `<pre><code${classLang ? ` class="language-${classLang}"` : ""}>${content}</code></pre>`;
    }

    // Content is the raw text from the code block (not HTML-escaped).
    const tokens = tokenize(content, grammar);
    const highlighted = renderToHTML(tokens);

    return `<pre><code${classLang ? ` class="language-${classLang}"` : ""}>${highlighted}</code></pre>`;
  });
};

