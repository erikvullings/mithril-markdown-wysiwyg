import { describe, expect, it } from "vitest";
import { highlightMarkdown, highlightCodeBlocks } from "./syntax-highlighter";

describe("highlightMarkdown", () => {
  it("returns empty string for empty input", () => {
    expect(highlightMarkdown("")).toBe("");
  });

  it("highlights headings", () => {
    const html = highlightMarkdown("# Hello World");
    expect(html).toContain('<span class="md-syn-heading">#</span> Hello World');
  });

  it("highlights bold text", () => {
    const html = highlightMarkdown("**bold**");
    expect(html).toBe('<span class="md-syn-bold">**</span>bold<span class="md-syn-bold">**</span>');
  });

  it("highlights italic text", () => {
    const html = highlightMarkdown("*italic*");
    expect(html).toBe('<span class="md-syn-italic">*</span>italic<span class="md-syn-italic">*</span>');
  });

  it("highlights links", () => {
    const html = highlightMarkdown("[text](url)");
    expect(html).toContain('<span class="md-syn-link">[</span>text](url)');
  });

  it("highlights images", () => {
    const html = highlightMarkdown("![alt](src)");
    expect(html).toContain('<span class="md-syn-image">![</span>alt](src)');
  });

  it("highlights inline code", () => {
    const html = highlightMarkdown("`code`");
    expect(html).toBe('<span class="md-syn-code">`</span>code<span class="md-syn-code">`</span>');
  });

  it("highlights blockquote markers", () => {
    const html = highlightMarkdown("> quoted");
    expect(html).toContain('<span class="md-syn-blockquote">&gt; </span>quoted');
  });

  it("escapes HTML entities in output", () => {
    const html = highlightMarkdown("<script>alert(1)</script>");
    // < and > are escaped to &lt; and &gt; by renderToHTML
    expect(html).toContain("&lt;");
    expect(html).toContain("&gt;");
  });

  it("highlights code blocks", () => {
    const html = highlightMarkdown("```\ncode\n```");
    expect(html).toContain('<span class="md-syn-code-block">```</span>');
  });
});

describe("highlightCodeBlocks", () => {
  it("returns empty string for empty input", () => {
    expect(highlightCodeBlocks("")).toBe("");
  });

  it("highlights code inside fenced blocks", () => {
    const html =
      '<pre><code class="language-js">const x = 1;</code></pre>';
    const highlighted = highlightCodeBlocks(html, "js");
    expect(highlighted).toContain('<span class="md-syn-keyword">const</span>');
    expect(highlighted).toContain('<span class="md-syn-number">1</span>');
  });

  it("preserves surrounding HTML structure", () => {
    const html =
      '<p>Before</p><pre><code class="language-js">x = 1</code></pre><p>After</p>';
    const highlighted = highlightCodeBlocks(html, "js");
    expect(highlighted).toContain("<p>Before</p>");
    expect(highlighted).toContain("<p>After</p>");
  });

  it("uses empty code block content gracefully", () => {
    const html = '<pre><code class="language-js"></code></pre>';
    const highlighted = highlightCodeBlocks(html, "js");
    expect(highlighted).toBe('<pre><code class="language-js"></code></pre>');
  });

  it("highlights python code", () => {
    const html =
      '<pre><code class="language-python">def foo(): pass</code></pre>';
    const highlighted = highlightCodeBlocks(html, "python");
    expect(highlighted).toContain('<span class="md-syn-keyword">def</span>');
  });

  it("highlights CSS code", () => {
    const html = '<pre><code class="language-css">.foo { color: red; }</code></pre>';
    const highlighted = highlightCodeBlocks(html, "css");
    expect(highlighted).toContain('<span class="md-syn-selector">.foo</span>');
  });

  it("highlights JSON code", () => {
    const html = '<pre><code class="language-json">{"a": 1}</code></pre>';
    const highlighted = highlightCodeBlocks(html, "json");
    expect(highlighted).toContain('<span class="md-syn-number">1</span>');
  });

  it("highlights bash code with strings", () => {
    const html = '<pre><code class="language-bash">echo "hello"</code></pre>';
    const highlighted = highlightCodeBlocks(html, "bash");
    // Quotes are HTML-escaped by renderToHTML
    expect(highlighted).toContain('<span class="md-syn-string">&quot;hello&quot;</span>');
  });

  it("highlights raw code content (caller provides raw text)", () => {
    const html = '<pre><code class="language-js">&lt;div&gt;</code></pre>';
    const highlighted = highlightCodeBlocks(html, "js");
    // & is treated as operator, lt;div and &gt; as separate tokens
    expect(highlighted).toContain('<span class="md-syn-operator">&amp;</span>');
  });
});
