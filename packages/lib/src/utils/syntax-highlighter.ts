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

const fencedCodeStart = /^( {0,3})(`{3,}|~{3,})([^\r\n]*)(\r?\n|$)/gm;

const renderMarkdownTokens = (
  text: string,
  grammar: GrammarRule[],
): string => renderToHTML(tokenize(text, grammar));

const renderFenceLine = (line: string): string => {
  const newline = line.endsWith("\r\n")
    ? "\r\n"
    : line.endsWith("\n")
      ? "\n"
      : "";
  const content = newline ? line.slice(0, -newline.length) : line;
  return `<span class="md-syn-code-block">${escapeHTML(content)}</span>${newline}`;
};

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

  let html = "";
  let cursor = 0;
  fencedCodeStart.lastIndex = 0;

  for (
    let opening = fencedCodeStart.exec(text);
    opening;
    opening = fencedCodeStart.exec(text)
  ) {
    if (opening.index < cursor) continue;
    if (opening[2][0] === "`" && opening[3].includes("`")) continue;

    html += renderMarkdownTokens(text.slice(cursor, opening.index), grammar);
    html += renderFenceLine(opening[0]);

    const fenceCharacter = opening[2][0];
    const closingFence = new RegExp(
      `^ {0,3}\\${fenceCharacter}{${opening[2].length},}[ \\t]*(?:\\r?\\n|$)`,
      "gm",
    );
    closingFence.lastIndex = fencedCodeStart.lastIndex;
    const closing = closingFence.exec(text);
    const codeEnd = closing?.index ?? text.length;
    const language = opening[3].trim().split(/\s+/, 1)[0];
    html += renderToHTML(
      tokenize(
        text.slice(fencedCodeStart.lastIndex, codeEnd),
        getGrammarForLanguage(language),
      ),
    );

    if (!closing) {
      cursor = text.length;
      break;
    }

    html += renderFenceLine(closing[0]);
    cursor = closingFence.lastIndex;
    fencedCodeStart.lastIndex = cursor;
  }

  return html + renderMarkdownTokens(text.slice(cursor), grammar);
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
