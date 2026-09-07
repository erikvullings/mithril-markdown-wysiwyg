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
  // --- Fenced code blocks (highest priority — must come first) ---
  {
    type: "code-block",
    pattern: /^```[^\n]*/,
  },
  // --- Inline code delimiter ---
  {
    type: "code",
    pattern: /^`(?!`)/,
  },
  // --- Headings marker ---
  {
    type: "heading",
    pattern: /^(#{1,6})(?=\s)/,
  },
  // --- Bold / italic delimiters ---
  {
    type: "bold",
    pattern: /^(?:\*\*|__)/u,
  },
  {
    type: "italic",
    pattern: /^(?:\*(?!\*)|_(?!_))/u,
  },
  // --- Images / links opening delimiters ---
  {
    type: "image",
    pattern: /^!\[/,
  },
  {
    type: "link",
    pattern: /^\[/,
  },
  // --- Blockquote marker ---
  {
    type: "blockquote",
    pattern: /^>\s*/m,
  },
  // --- Unordered list marker ---
  {
    type: "list",
    pattern: /^(\s*[-*+]\s+)/,
  },
  // --- Ordered list marker ---
  {
    type: "list",
    pattern: /^(\s*\d+\.\s+)/,
  },
];
