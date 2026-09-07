/**
 * Grammar rules for highlighting programming languages.
 *
 * The common set covers patterns shared across most languages (JS/TS, Python,
 * CSS, Bash, JSON).  Language-specific subsets select only the rules they need
 * from the common set.
 */

import type { GrammarRule } from "./syntax-tokenizer";

// ── Common tokens ──────────────────────────────────────────────────────────

const commonRules: GrammarRule[] = [
  // Block comments
  {
    type: "comment",
    pattern: /^\/\*[\s\S]*?\*\//,
  },
  // Line comments
  {
    type: "comment",
    pattern: /^(\/\/|#).*$/m,
  },
  // Strings (double-quoted)
  {
    type: "string",
    pattern: /^"[^"\\]*(?:\\.[^"\\]*)*"/,
  },
  // Strings (single-quoted)
  {
    type: "string",
    pattern: /^'[^'\\]*(?:\\.[^'\\]*)*'/,
  },
  // Template literals
  {
    type: "string",
    pattern: /^`[^`\\]*(?:\\.[^`\\]*)*`/,
  },
  // Numbers
  {
    type: "number",
    pattern: /^(?:0x[\da-f]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:e[+-]?\d+)?)/iu,
  },
  // Regex literals
  {
    type: "regex",
    pattern: /^\/(?![*\/])(?:[^\/\\]|\\.)+\/[gimsuy]*/,
  },
  // Keywords
  {
    type: "keyword",
    pattern: /^(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|yield|typeof|instanceof|in|of|throw|try|catch|finally|void|delete|super|static|get|set|abstract|implements|interface|package|private|protected|public|enum|type|namespace|declare|as|is|readonly|require|module|__dirname|__filename)\b/u,
  },
  // Boolean / special values
  {
    type: "constant",
    pattern: /^(?:true|false|null|undefined|NaN|Infinity)\b/u,
  },
  // Operators
  {
    type: "operator",
    pattern: /^(?:=>|===|!==|==|!=|&=|\|=|\^=|\+=|-=|\*=|\/=|%=\*|\*\*|\.{3}|[+\-*\/%&|^~<>!=]=?|[?!:])/u,
  },
  // Brackets / braces / parens
  {
    type: "punctuation",
    pattern: /^[()[\]{}]/,
  },
];

// ── JS/TS specific ─────────────────────────────────────────────────────────

export const codeGrammar: GrammarRule[] = commonRules;
export const jsTsRules: GrammarRule[] = [
  ...commonRules,
  // TypeScript-specific type keywords
  {
    type: "keyword",
    pattern: /^(?:type|interface|namespace|declare|enum|implements|readonly|as|is|keyof|infer|typeof|never|unknown|void)\b/u,
  },
];

// ── Python specific ────────────────────────────────────────────────────────

export const pythonRules: GrammarRule[] = [
  ...commonRules.filter(
    (r) =>
      r.pattern.source !==
        /^(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|yield|typeof|instanceof|in|of|throw|try|catch|finally|void|delete|super|static|get|set|abstract|implements|interface|package|private|protected|public|enum|type|namespace|declare|as|is|readonly|require|module|__dirname|__filename)\b/u.source,
  ),
  {
    type: "keyword",
    pattern: /^(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/u,
  },
  {
    type: "constant",
    pattern: /^(?:True|False|None)\b/u,
  },
  {
    type: "string",
    pattern: /^f"[^"\\]*(?:\\.[^"\\]*)*"/,
  },
  {
    type: "string",
    pattern: /^f'[^'\\]*(?:\\.[^'\\]*)*'/,
  },
];

// ── JSON specific ──────────────────────────────────────────────────────────

export const jsonRules: GrammarRule[] = [
  ...commonRules.filter(
    (r) =>
      r.pattern.source !== /^(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|yield|typeof|instanceof|in|of|throw|try|catch|finally|void|delete|super|static|get|set|abstract|implements|interface|package|private|protected|public|enum|type|namespace|declare|as|is|readonly|require|module|__dirname|__filename)\b/u.source &&
      r.pattern.source !== /^(\/\/|#).*$/m.source,
  ),
  {
    type: "keyword",
    pattern: /^(?:true|false|null)\b/u,
  },
];

// ── Bash specific ──────────────────────────────────────────────────────────

export const bashRules: GrammarRule[] = [
  ...commonRules.filter(
    (r) =>
      r.pattern.source !== /^(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|yield|typeof|instanceof|in|of|throw|try|catch|finally|void|delete|super|static|get|set|abstract|implements|interface|package|private|protected|public|enum|type|namespace|declare|as|is|readonly|require|module|__dirname|__filename)\b/u.source,
  ),
  {
    type: "keyword",
    pattern: /^(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|function|in|select|time|coproc)\b/u,
  },
  {
    type: "constant",
    pattern: /^(\$|&&|\|\||\{\w+\})/u,
  },
  {
    type: "string",
    pattern: /^"[^"\\]*(?:\\.[^"\\]*)*"/,
  },
  {
    type: "string",
    pattern: /^'[^']*'/,
  },
  {
    type: "comment",
    pattern: /^#.*$/,
  },
];

// ── CSS specific ───────────────────────────────────────────────────────────

export const cssRules: GrammarRule[] = [
  ...commonRules,
  {
    type: "selector",
    pattern: /^[.#:>+~\[\]{}^$*|=-][\w-]+/u,
  },
  {
    type: "property",
    pattern: /^[\w-]+(?=\s*:)/u,
  },
  {
    type: "function",
    pattern: /^(?:var|attr|calc|count|url|rgb|rgba|linear-gradient|radial-gradient|translate|rotate|scale|matrix)\(/u,
  },
  {
    type: "number",
    pattern: /^(?:\d+\.?\d*(?:px|em|rem|%|vw|vh|vmin|vmax|deg|rad|s|ms|fr|turn)?)/u,
  },
];

// ── Language lookup ────────────────────────────────────────────────────────

const languageMap: Record<string, GrammarRule[]> = {
  javascript: jsTsRules,
  js: jsTsRules,
  typescript: jsTsRules,
  ts: jsTsRules,
  tsx: jsTsRules,
  jsx: jsTsRules,
  python: pythonRules,
  py: pythonRules,
  json: jsonRules,
  bash: bashRules,
  sh: bashRules,
  shell: bashRules,
  css: cssRules,
  scss: cssRules,
  less: cssRules,
};

/**
 * Return the grammar rules for a given language identifier.
 * Falls back to `commonRules` when the language is unknown.
 */
export const getGrammarForLanguage = (
  lang: string,
): GrammarRule[] => languageMap[lang.toLowerCase()] ?? commonRules;
