import { describe, expect, it } from "vitest";
import { escapeHTML, tokenize, renderToHTML } from "./syntax-tokenizer";
import { markdownGrammar } from "./markdown-grammar";
import { codeGrammar, getGrammarForLanguage, pythonRules, jsTsRules } from "./code-grammar";

describe("escapeHTML", () => {
  it("leaves plain text unchanged", () => {
    expect(escapeHTML("hello world")).toBe("hello world");
  });

  it("escapes < and >", () => {
    expect(escapeHTML("<div>")).toBe("&lt;div&gt;");
  });

  it("escapes quotes", () => {
    expect(escapeHTML('"hello"')).toBe("&quot;hello&quot;");
    expect(escapeHTML("'hello'")).toBe("&#39;hello&#39;");
  });

  it("escapes &", () => {
    expect(escapeHTML("a & b")).toBe("a &amp; b");
  });

  it("escapes all entities in one pass", () => {
    expect(escapeHTML('<tag attr="val">a & b</tag>')).toBe(
      "&lt;tag attr=&quot;val&quot;&gt;a &amp; b&lt;/tag&gt;",
    );
  });
});

describe("tokenize", () => {
  it("returns empty array for empty string", () => {
    const result = tokenize("", [{ type: "test", pattern: /./u }]);
    expect(result).toEqual([]);
  });

  it("returns null type for unmatched characters", () => {
    const result = tokenize("hello world", []);
    expect(result).toEqual(
      "hello world".split("").map((char) => ({ text: char, type: null as any })),
    );
  });

  it("matches first rule when priorities equal", () => {
    const grammar = [
      { type: "first", pattern: /^a/u },
      { type: "second", pattern: /^a/u },
    ];
    const result = tokenize("a", grammar);
    expect(result).toEqual([{ text: "a", type: "first" }]);
  });

  it("longest match wins", () => {
    const grammar = [
      { type: "short", pattern: /^ab/u },
      { type: "long", pattern: /^abc/u },
    ];
    const result = tokenize("abc", grammar);
    expect(result).toEqual([{ text: "abc", type: "long" }]);
  });

  it("handles mixed matched and unmatched characters", () => {
    const grammar = [{ type: "num", pattern: /^\d/u }];
    const result = tokenize("a1b", grammar);
    expect(result).toEqual([
      { text: "a", type: null },
      { text: "1", type: "num" },
      { text: "b", type: null },
    ]);
  });

  it("returns raw matched text (escaping is done in highlightMarkdown)", () => {
    const grammar = [{ type: "tag", pattern: /^<\w+>/u }];
    const result = tokenize("<div>text</div>", grammar);
    expect(result[0]).toEqual({ text: "<div>", type: "tag" });
  });
});

describe("renderToHTML", () => {
  it("wraps typed tokens with spans", () => {
    const tokens = [
      { text: "hello", type: "word" },
      { text: " ", type: null },
      { text: "world", type: "word" },
    ];
    const html = renderToHTML(tokens);
    expect(html).toBe('<span class="md-syn-word">hello</span> <span class="md-syn-word">world</span>');
  });

  it("escapes HTML in null-type tokens", () => {
    const tokens = [{ text: "<b>", type: null }];
    const html = renderToHTML(tokens);
    expect(html).toBe("&lt;b&gt;");
  });
});

describe("markdownGrammar", () => {
  it("tokens headings", () => {
    const result = tokenize("# Title", markdownGrammar);
    const heading = result.find((t) => t.type === "heading");
    expect(heading).toBeDefined();
    expect(heading!.text).toBe("# Title");
  });

  it("tokens bold text", () => {
    const result = tokenize("**bold**", markdownGrammar);
    const bold = result.find((t) => t.type === "bold");
    expect(bold).toBeDefined();
  });

  it("tokens italic text", () => {
    const result = tokenize("*italic*", markdownGrammar);
    const italic = result.find((t) => t.type === "italic");
    expect(italic).toBeDefined();
  });

  it("tokens inline code", () => {
    const result = tokenize("`code`", markdownGrammar);
    const code = result.find((t) => t.type === "code");
    expect(code?.text).toBe("`code`");
  });

  it("tokens fenced code blocks", () => {
    const result = tokenize("```\ncode\n```", markdownGrammar);
    const block = result.find((t) => t.type === "code-block");
    expect(block).toBeDefined();
  });

  it("tokens links", () => {
    const result = tokenize("[text](url)", markdownGrammar);
    const link = result.find((t) => t.type === "link");
    expect(link).toBeDefined();
  });

  it("tokens images", () => {
    const result = tokenize("![alt](src)", markdownGrammar);
    const image = result.find((t) => t.type === "image");
    expect(image).toBeDefined();
  });

  it("tokens blockquote markers", () => {
    const result = tokenize("> quoted text", markdownGrammar);
    const bq = result.find((t) => t.type === "blockquote");
    expect(bq).toBeDefined();
  });

  it("tokens unordered list markers", () => {
    const result = tokenize("- item", markdownGrammar);
    const list = result.find((t) => t.type === "list");
    expect(list).toBeDefined();
  });

  it("tokens ordered list markers", () => {
    const result = tokenize("1. item", markdownGrammar);
    const list = result.find((t) => t.type === "list");
    expect(list).toBeDefined();
  });
});

describe("code grammar", () => {
  it("exports a default grammar with common rules", () => {
    expect(codeGrammar.length).toBeGreaterThan(5);
    const types = codeGrammar.map((r) => r.type);
    expect(types).toContain("comment");
    expect(types).toContain("string");
    expect(types).toContain("keyword");
    expect(types).toContain("number");
    expect(types).toContain("operator");
  });

  it("detects js/ts language rules", () => {
    const rules = getGrammarForLanguage("javascript");
    expect(rules).toHaveLength(jsTsRules.length);
    const types = rules.map((r) => r.type);
    expect(types).toContain("keyword");
  });

  it("detects python language rules", () => {
    const rules = getGrammarForLanguage("python");
    expect(rules).toHaveLength(pythonRules.length);
    const types = rules.map((r) => r.type);
    expect(types).toContain("keyword");
  });

  it("falls back to common rules for unknown language", () => {
    const rules = getGrammarForLanguage("unknown");
    expect(rules).toHaveLength(codeGrammar.length);
  });
});
