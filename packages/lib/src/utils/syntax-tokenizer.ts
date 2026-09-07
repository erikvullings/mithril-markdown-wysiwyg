/**
 * Core tokenizer for syntax highlighting.
 *
 * Takes plain text and a grammar (array of `{ type, pattern }` rules),
 * returns a list of `{ text, type }` tokens.  Rules are applied left-to-
 * right with longest-match semantics at each position.
 *
 * Text is also HTML-escaped so the token list can be safely rendered into
 * `innerHTML`.
 */

export interface Token {
  text: string;
  type: string | null;
}

export interface GrammarRule {
  type: string;
  pattern: RegExp;
}

/**
 * HTML-escape a string so it can be embedded safely in `innerHTML`.
 */
export const escapeHTML = (text: string): string =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Tokenize `text` against `grammar`.  Returns an array of `{ text, type }`
 * tokens.  When no rule matches a stretch of text the token type is `null`.
 */
export const tokenize = (
  text: string,
  grammar: GrammarRule[],
): Token[] => {
  if (!text) return [];

  const tokens: Token[] = [];
  let pos = 0;

  while (pos < text.length) {
    let bestMatch: { type: string; length: number } | null = null;

    for (const rule of grammar) {
      const match = rule.pattern.exec(text.slice(pos));
      if (match && (!bestMatch || match[0].length > bestMatch.length)) {
        bestMatch = { type: rule.type, length: match[0].length };
      }
    }

    if (bestMatch) {
      tokens.push({
        text: text.slice(pos, pos + bestMatch.length),
        type: bestMatch.type,
      });
      pos += bestMatch.length;
    } else {
      tokens.push({ text: text[pos], type: null });
      pos++;
    }
  }

  return tokens;
};

/**
 * Render a token list to HTML: `<span class="type">text</span>` for each
 * token that has a type, or raw escaped text when type is `null`.
 *
 * This always escapes HTML entities in `text` so the output is safe for
 * `innerHTML`.
 */
export const renderToHTML = (tokens: Token[]): string =>
  tokens
    .map(({ text, type }) =>
      type ? `<span class="md-syn-${type}">${escapeHTML(text)}</span>` : escapeHTML(text),
    )
    .join("");
