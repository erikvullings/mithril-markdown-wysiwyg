/**
 * Grammar rules for highlighting raw Markdown source.
 *
 * Each rule pairs a CSS class name with a `RegExp` used to match that syntax
 * element.  Rules are evaluated left-to-right with longest-match semantics at
 * every position, so a fenced code block will always win over an inline code
 * backtick or a link opening bracket.
 */

import type { GrammarRule } from "./syntax-tokenizer";

export const markdownGrammar: GrammarRule[] = [
  // --- Fenced code block line ---
  {
    type: "code-block",
    pattern: /^(?:`{3,}[^`\r\n]*|~{3,}[^\r\n]*)/,
    lineStart: true,
  },
  // --- Inline code ---
  {
    type: "code",
    pattern: /^(`+)(?!`)([^\r\n]*?)(?<!`)\1(?!`)/,
  },
  // --- Headings ---
  {
    type: "heading",
    pattern: /^#{1,6}[ \t]+[^\r\n]*/,
    lineStart: true,
  },
  // --- Bold / italic spans ---
  {
    type: "bold",
    pattern:
      /^(?:\*\*(?=\S)(?:[^*\r\n]|\*(?!\*))*?\S\*\*|__(?=\S)(?:[^_\r\n]|_(?!_))*?\S__)/u,
  },
  {
    type: "italic",
    pattern:
      /^(?:\*(?=\S)(?:[^*\r\n])*?\S\*|_(?=\S)(?:[^_\r\n])*?\S_)/u,
  },
  // --- Images / links ---
  {
    type: "image",
    pattern: /^!\[[^\]\r\n]*\]\([^\)\r\n]*\)/,
  },
  {
    type: "link",
    pattern: /^\[[^\]\r\n]*\]\([^\)\r\n]*\)/,
  },
  // --- Blockquotes ---
  {
    type: "blockquote",
    pattern: /^>[ \t]?[^\r\n]*/,
    lineStart: true,
  },
  // --- Lists ---
  {
    type: "list",
    pattern: /^[ \t]{0,3}(?:[-*+]|\d+[.)])[ \t]+[^\r\n]*/,
    lineStart: true,
  },
];
