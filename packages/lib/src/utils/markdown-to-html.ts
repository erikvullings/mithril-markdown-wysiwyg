/**
 * Enhanced Markdown to HTML conversion utilities
 * Optimized for WYSIWYG editor compatibility
 */

export interface MarkdownToHtmlOptions {
  gfm?: boolean; // GitHub Flavored Markdown
  breaks?: boolean; // Convert line breaks to <br>
  tables?: boolean; // Support tables
  taskLists?: boolean; // Support task lists
  strikethrough?: boolean; // Support strikethrough
  autolink?: boolean; // Auto-convert URLs to links
  smartQuotes?: boolean; // Smart quote conversion
  smartypants?: boolean; // Smart punctuation
  highlight?: (code: string, language: string) => string; // Code highlighting
  sanitize?: boolean; // Sanitize HTML output
  baseUrl?: string; // Base URL for relative links
}

export const defaultMarkdownOptions: MarkdownToHtmlOptions = {
  gfm: true,
  breaks: true,
  tables: true,
  taskLists: true,
  strikethrough: true,
  autolink: true,
  smartQuotes: false,
  smartypants: false,
  sanitize: false,
};

/**
 * Enhanced Markdown to HTML converter
 */
export class MarkdownToHtmlConverter {
  private options: MarkdownToHtmlOptions;

  constructor(options: MarkdownToHtmlOptions = defaultMarkdownOptions) {
    this.options = { ...defaultMarkdownOptions, ...options };
  }

  /**
   * Convert Markdown string to HTML
   */
  convert(markdown: string): string {
    if (!markdown || markdown.trim() === "") {
      return "";
    }

    let html = markdown;

    // Process in order (most specific first)
    html = this.processCodeBlocks(html);
    html = this.processInlineCode(html);
    html = this.processTables(html);
    html = this.processTaskLists(html);
    html = this.processLists(html);
    html = this.processHeaders(html);
    html = this.processBlockquotes(html);
    html = this.processHorizontalRules(html);
    html = this.processLinks(html);
    html = this.processImages(html);
    html = this.processEmphasis(html);
    html = this.processLineBreaks(html);
    html = this.processParagraphs(html);

    // Post-process
    if (this.options.autolink) {
      html = this.processAutolinks(html);
    }

    if (this.options.smartQuotes) {
      html = this.processSmartQuotes(html);
    }

    if (this.options.smartypants) {
      html = this.processSmartPunctuation(html);
    }

    if (this.options.sanitize) {
      html = this.sanitizeHtml(html);
    }

    return html.trim();
  }

  /**
   * Process code blocks (fenced and indented)
   */
  private processCodeBlocks(markdown: string): string {
    // Fenced code blocks with language
    markdown = markdown.replace(
      /^```(\w*)\n([\s\S]*?)\n```$/gm,
      (match, language, code) => {
        const langClass = language
          ? ` class="language-${this.escapeHtml(language)}"`
          : "";
        const escapedCode = this.escapeHtml(code);

        if (this.options.highlight && language) {
          try {
            const highlighted = this.options.highlight(code, language);
            return `<pre><code${langClass}>${highlighted}</code></pre>`;
          } catch (e) {
            // Fallback to escaped code if highlighting fails
          }
        }

        return `<pre><code${langClass}>${escapedCode}</code></pre>`;
      },
    );

    // Simple fenced code blocks
    markdown = markdown.replace(/^```\n([\s\S]*?)\n```$/gm, (match, code) => {
      const escapedCode = this.escapeHtml(code);
      return `<pre><code>${escapedCode}</code></pre>`;
    });

    // Indented code blocks (4+ spaces)
    markdown = markdown.replace(
      /^( {4,}|\t+)(.*)$/gm,
      (match, indent, code) => {
        const escapedCode = this.escapeHtml(code);
        return `<pre><code>${escapedCode}</code></pre>`;
      },
    );

    return markdown;
  }

  /**
   * Process inline code
   */
  private processInlineCode(markdown: string): string {
    // Handle multiple backticks
    markdown = markdown.replace(
      /(`{2,})([\s\S]*?)\1/g,
      (match, ticks, code) => {
        const escapedCode = this.escapeHtml(code.trim());
        return `<code>${escapedCode}</code>`;
      },
    );

    // Handle single backticks
    markdown = markdown.replace(/`([^`\n]+)`/g, (match, code) => {
      const escapedCode = this.escapeHtml(code);
      return `<code>${escapedCode}</code>`;
    });

    return markdown;
  }

  /**
   * Process tables (GFM style)
   */
  private processTables(markdown: string): string {
    if (!this.options.tables) return markdown;

    return markdown.replace(
      /^\|(.+)\|\s*\n\|(\s*:?-+:?\s*\|)+\s*\n((\|.*\|\s*\n?)*)/gm,
      (_match, headerRow: string, separatorRow: string, bodyRows: string) => {
        const headers = this.parseTableRow(headerRow);
        const alignments = this.parseTableAlignment(separatorRow);
        const rows = bodyRows
          .trim()
          .split("\n")
          .map((row) => this.parseTableRow(row));

        let html = "<table>\n<thead>\n<tr>\n";

        headers.forEach((header, index) => {
          const align = alignments[index]
            ? ` style="text-align: ${alignments[index]}"`
            : "";
          html += `<th${align}>${this.processInlineMarkdown(header.trim())}</th>\n`;
        });

        html += "</tr>\n</thead>\n";

        if (rows.length > 0) {
          html += "<tbody>\n";

          rows.forEach((row) => {
            html += "<tr>\n";
            row.forEach((cell, index) => {
              const align = alignments[index]
                ? ` style="text-align: ${alignments[index]}"`
                : "";
              html += `<td${align}>${this.processInlineMarkdown(cell.trim())}</td>\n`;
            });
            html += "</tr>\n";
          });

          html += "</tbody>\n";
        }

        html += "</table>";
        return html;
      },
    );
  }

  /**
   * Parse table row into cells
   */
  private parseTableRow(row: string): string[] {
    return row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
  }

  /**
   * Parse table alignment from separator row
   */
  private parseTableAlignment(separatorRow: string): (string | null)[] {
    return separatorRow
      .split("|")
      .slice(1, -1)
      .map((cell) => {
        cell = cell.trim();
        if (cell.startsWith(":") && cell.endsWith(":")) return "center";
        if (cell.endsWith(":")) return "right";
        if (cell.startsWith(":")) return "left";
        return null;
      });
  }

  /**
   * Process task lists
   */
  private processTaskLists(markdown: string): string {
    if (!this.options.taskLists) return markdown;

    // Checked tasks
    markdown = markdown.replace(
      /^(\s*)- \[x\] (.*)$/gm,
      '$1- <input type="checkbox" checked disabled> $2',
    );

    // Unchecked tasks
    markdown = markdown.replace(
      /^(\s*)- \[ \] (.*)$/gm,
      '$1- <input type="checkbox" disabled> $2',
    );

    return markdown;
  }

  /**
   * Process lists (ordered and unordered)
   */
  private processLists(markdown: string): string {
    // Ordered lists
    markdown = markdown.replace(
      /^(\s*)(\d+)\.\s+(.*(?:\n(?!\s*\d+\.\s+).*)*)/gm,
      (_match, indent: string, _number, content: string) => {
        const items = content
          .split(/\n(?=\s*\d+\.\s+)/)
          .map((item) => `<li>${this.processInlineMarkdown(item.trim())}</li>`)
          .join("\n");
        return `${indent}<ol>\n${items}\n</ol>`;
      },
    );

    // Unordered lists
    markdown = markdown.replace(
      /^(\s*)([-*+])\s+(.*(?:\n(?!\s*[-*+]\s+).*)*)/gm,
      (_match, indent: string, _marker, content: string) => {
        const items = content
          .split(/\n(?=\s*[-*+]\s+)/)
          .map((item) => `<li>${this.processInlineMarkdown(item.trim())}</li>`)
          .join("\n");
        return `${indent}<ul>\n${items}\n</ul>`;
      },
    );

    return markdown;
  }

  /**
   * Process headers
   */
  private processHeaders(markdown: string): string {
    // ATX style headers (# ## ### etc.)
    markdown = markdown.replace(
      /^(#{1,6})\s+(.*)$/gm,
      (match, hashes, content) => {
        const level = hashes.length;
        const processedContent = this.processInlineMarkdown(content.trim());
        return `<h${level}>${processedContent}</h${level}>`;
      },
    );

    // Setext style headers (underlined)
    markdown = markdown.replace(
      /^(.+)\n(=+|-+)$/gm,
      (match, content, underline) => {
        const level = underline[0] === "=" ? 1 : 2;
        const processedContent = this.processInlineMarkdown(content.trim());
        return `<h${level}>${processedContent}</h${level}>`;
      },
    );

    return markdown;
  }

  /**
   * Process blockquotes
   */
  private processBlockquotes(markdown: string): string {
    return markdown.replace(/^>\s+(.*)$/gm, (match, content) => {
      const processedContent = this.processInlineMarkdown(content);
      return `<blockquote><p>${processedContent}</p></blockquote>`;
    });
  }

  /**
   * Process horizontal rules
   */
  private processHorizontalRules(markdown: string): string {
    return markdown.replace(/^(\*{3,}|-{3,}|_{3,})$/gm, "<hr>");
  }

  /**
   * Process links
   */
  private processLinks(markdown: string): string {
    // Reference-style links [text][ref]
    const references: { [key: string]: { url: string; title?: string } } = {};

    // Extract reference definitions
    markdown = markdown.replace(
      /^\[([^\]]+)\]:\s*(.+?)(?:\s+"([^"]*)")?$/gm,
      (match, id, url, title) => {
        references[id.toLowerCase()] = { url: url.trim(), title };
        return "";
      },
    );

    // Process reference links
    markdown = markdown.replace(
      /\[([^\]]+)\]\[([^\]]*)\]/g,
      (match, text, ref) => {
        const refId = (ref || text).toLowerCase();
        const reference = references[refId];

        if (reference) {
          const title = reference.title
            ? ` title="${this.escapeHtml(reference.title)}"`
            : "";
          return `<a href="${this.escapeHtml(reference.url)}"${title}>${this.processInlineMarkdown(text)}</a>`;
        }

        return match;
      },
    );

    // Inline links [text](url "title")
    markdown = markdown.replace(
      /\[([^\]]+)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g,
      (match, text, url, title) => {
        const href =
          this.options.baseUrl && !url.match(/^https?:\/\//)
            ? this.options.baseUrl + url
            : url;
        const titleAttr = title ? ` title="${this.escapeHtml(title)}"` : "";
        return `<a href="${this.escapeHtml(href.trim())}"${titleAttr}>${this.processInlineMarkdown(text)}</a>`;
      },
    );

    return markdown;
  }

  /**
   * Process images
   */
  private processImages(markdown: string): string {
    // Inline images ![alt](src "title")
    return markdown.replace(
      /!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g,
      (match, alt, src, title) => {
        const srcAttr =
          this.options.baseUrl && !src.match(/^https?:\/\//)
            ? this.options.baseUrl + src
            : src;
        const titleAttr = title ? ` title="${this.escapeHtml(title)}"` : "";
        return `<img src="${this.escapeHtml(srcAttr.trim())}" alt="${this.escapeHtml(alt)}"${titleAttr}>`;
      },
    );
  }

  /**
   * Process emphasis (bold, italic, strikethrough)
   */
  private processEmphasis(markdown: string): string {
    // Bold with **text** or __text__
    markdown = markdown.replace(
      /(\*\*|__)((?:(?!\1)[\s\S])+?)\1/g,
      (match, marker, content) => {
        return `<strong>${this.processInlineMarkdown(content)}</strong>`;
      },
    );

    // Italic with *text* or _text_ (but not in URLs or other contexts)
    markdown = markdown.replace(
      /(?<![\w*_])(\*|_)((?:(?!\1)[\s\S])+?)\1(?![\w*_])/g,
      (match, marker, content) => {
        return `<em>${this.processInlineMarkdown(content)}</em>`;
      },
    );

    // Strikethrough with ~~text~~
    if (this.options.strikethrough) {
      markdown = markdown.replace(
        /~~((?:(?!~~)[\s\S])+?)~~/g,
        (match, content) => {
          return `<del>${this.processInlineMarkdown(content)}</del>`;
        },
      );
    }

    return markdown;
  }

  /**
   * Process line breaks
   */
  private processLineBreaks(markdown: string): string {
    if (!this.options.breaks) return markdown;

    // Convert single line breaks to <br> (but not in code blocks)
    return markdown.replace(/(?<!^|  )\n(?![\n\r])/g, "<br>\n");
  }

  /**
   * Process paragraphs
   */
  private processParagraphs(markdown: string): string {
    // Split content into blocks
    const blocks = markdown.split(/\n\s*\n/);

    return blocks
      .map((block) => {
        block = block.trim();

        // Skip if already HTML, empty, or special markdown block
        if (
          !block ||
          block.startsWith("<") ||
          block.match(/^#{1,6}\s/) ||
          block.match(/^[-*+]\s/) ||
          block.match(/^\d+\.\s/) ||
          block.match(/^>\s/) ||
          block.match(/^```/) ||
          block.match(/^ {4,}/)
        ) {
          return block;
        }

        return `<p>${this.processInlineMarkdown(block)}</p>`;
      })
      .join("\n\n");
  }

  /**
   * Process autolinks
   */
  private processAutolinks(markdown: string): string {
    // HTTP(S) URLs
    markdown = markdown.replace(/(?<![\w@])https?:\/\/[^\s<>]+/gi, (match) => {
      return `<a href="${match}">${match}</a>`;
    });

    // Email addresses
    markdown = markdown.replace(
      /(?<![\w@])[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}/g,
      (match) => {
        return `<a href="mailto:${match}">${match}</a>`;
      },
    );

    return markdown;
  }

  /**
   * Process smart quotes
   */
  private processSmartQuotes(markdown: string): string {
    return markdown
      .replace(/"/g, "&ldquo;")
      .replace(/"/g, "&rdquo;")
      .replace(/'/g, "&lsquo;")
      .replace(/'/g, "&rsquo;");
  }

  /**
   * Process smart punctuation
   */
  private processSmartPunctuation(markdown: string): string {
    return markdown
      .replace(/--/g, "&mdash;")
      .replace(/\.\.\./g, "&hellip;")
      .replace(/(^|[^-])--([^-]|$)/g, "$1&mdash;$2");
  }

  /**
   * Process inline markdown (for use within HTML tags)
   */
  private processInlineMarkdown(text: string): string {
    // Only process inline elements
    text = this.processEmphasis(text);
    text = this.processInlineCode(text);
    text = this.processLinks(text);
    text = this.processImages(text);
    return text;
  }

  /**
   * Escape HTML characters
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * Basic HTML sanitization
   */
  private sanitizeHtml(html: string): string {
    // Allow only safe tags
    const allowedTags = [
      "p",
      "br",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "del",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "code",
      "pre",
      "hr",
    ];

    const allowedAttributes = ["href", "src", "alt", "title", "style"];

    // This is a basic implementation - in production, use a proper sanitization library
    return html.replace(
      /<(\/?)([\w-]+)([^>]*)>/g,
      (match, slash, tag, attrs) => {
        if (!allowedTags.includes(tag.toLowerCase())) {
          return "";
        }

        if (attrs) {
          attrs = attrs.replace(
            /([\w-]+)=(["'])[^"']*\2/g,
            (attrMatch: string, name: string, quote: string) => {
              return allowedAttributes.includes(name.toLowerCase())
                ? attrMatch
                : "";
            },
          );
        }

        return `<${slash}${tag}${attrs}>`;
      },
    );
  }
}

/**
 * Convenience function for converting Markdown to HTML
 */
export const markdownToHtml = (
  markdown: string,
  options?: MarkdownToHtmlOptions,
): string => {
  const converter = new MarkdownToHtmlConverter(options);
  return converter.convert(markdown);
};

/**
 * Enhanced conversion specifically for WYSIWYG editor
 */
export const markdownToWysiwygHtml = (markdown: string): string => {
  return markdownToHtml(markdown, {
    gfm: true,
    breaks: true,
    tables: true,
    taskLists: true,
    strikethrough: true,
    autolink: false, // Avoid auto-linking in editor
    sanitize: false, // Editor handles sanitization
  });
};
