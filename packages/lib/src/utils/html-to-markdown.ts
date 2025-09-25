/**
 * Enhanced HTML to Markdown conversion utilities
 * Handles complex HTML structures and preserves formatting integrity
 */

export interface ConversionOptions {
  preserveWhitespace?: boolean;
  gfmTables?: boolean;
  taskLists?: boolean;
  strikethrough?: boolean;
  codeBlocks?: boolean;
  headingStyle?: "atx" | "setext"; // # Heading vs Heading\n=======
  bulletListMarker?: "-" | "*" | "+";
  emDelimiter?: "*" | "_";
  strongDelimiter?: "**" | "__";
  codeDelimiter?: "`";
  linkStyle?: "inline" | "reference";
}

export const defaultOptions: ConversionOptions = {
  preserveWhitespace: false,
  gfmTables: true,
  taskLists: true,
  strikethrough: true,
  codeBlocks: true,
  headingStyle: "atx",
  bulletListMarker: "-",
  emDelimiter: "*",
  strongDelimiter: "**",
  codeDelimiter: "`",
  linkStyle: "inline",
};

/**
 * Advanced HTML to Markdown converter
 */
export class HTMLToMarkdownConverter {
  private options: ConversionOptions;
  private linkReferences: Map<string, { url: string; title?: string }> =
    new Map();
  private linkCounter = 0;

  constructor(options: ConversionOptions = defaultOptions) {
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Convert HTML string to Markdown
   */
  convert(html: string): string {
    if (!html || html.trim() === "") {
      return "";
    }

    // Reset state
    this.linkReferences.clear();
    this.linkCounter = 0;

    // Clean up HTML first
    let cleaned = this.cleanupHTML(html);

    // Process the HTML
    let markdown = this.processHTML(cleaned);

    // Clean up markdown
    markdown = this.cleanupMarkdown(markdown);

    // Add reference links if using reference style
    if (
      this.options.linkStyle === "reference" &&
      this.linkReferences.size > 0
    ) {
      markdown += "\n\n" + this.generateReferenceLinks();
    }

    return markdown.trim();
  }

  /**
   * Clean up HTML before processing
   */
  private cleanupHTML(html: string): string {
    return (
      html
        // Normalize contentEditable artifacts
        .replace(/<div>/gi, "<p>")
        .replace(/<\/div>/gi, "</p>")

        // Handle line breaks
        .replace(/<br\s*\/?>/gi, "\n")

        // Remove empty paragraphs
        .replace(/<p>\s*<\/p>/gi, "")
        .replace(/<div>\s*<\/div>/gi, "")

        // Normalize whitespace in text nodes
        .replace(/>\s+</g, "><")
        .replace(/\s+/g, " ")

        // Remove comments
        .replace(/<!--[\s\S]*?-->/g, "")

        // Clean up spans without meaningful attributes
        .replace(/<span(?:\s+[^>]*)?>([^<]*)<\/span>/gi, "$1")

        .trim()
    );
  }

  /**
   * Process HTML and convert to markdown
   */
  private processHTML(html: string): string {
    let markdown = html;

    // Process in order of complexity (most specific first)
    markdown = this.processCodeBlocks(markdown);
    markdown = this.processInlineCode(markdown);
    markdown = this.processTables(markdown);
    markdown = this.processLists(markdown);
    markdown = this.processHeaders(markdown);
    markdown = this.processBlockquotes(markdown);
    markdown = this.processLinks(markdown);
    markdown = this.processImages(markdown);
    markdown = this.processEmphasis(markdown);
    markdown = this.processHorizontalRules(markdown);
    markdown = this.processParagraphs(markdown);

    // Remove any remaining HTML tags
    markdown = markdown.replace(/<[^>]*>/g, "");

    return markdown;
  }

  /**
   * Process code blocks
   */
  private processCodeBlocks(markdown: string): string {
    if (!this.options.codeBlocks) return markdown;

    // Handle pre + code blocks
    return markdown.replace(
      /<pre[^>]*><code(?:\s+class="language-([^"]*)")?[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
      (_, language, code) => {
        const cleanCode = this.unescapeHTML(code).replace(/^\n|\n$/g, "");
        const lang = language || "";
        return `\n\n${this.options.codeDelimiter}${this.options.codeDelimiter}${this.options.codeDelimiter}${lang}\n${cleanCode}\n${this.options.codeDelimiter}${this.options.codeDelimiter}${this.options.codeDelimiter}\n\n`;
      },
    );
  }

  /**
   * Process inline code
   */
  private processInlineCode(markdown: string): string {
    return markdown.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, code) => {
      const cleanCode = this.unescapeHTML(code);
      const delimiter = this.options.codeDelimiter!;

      // Handle backticks in code by using more backticks
      if (cleanCode.includes(delimiter)) {
        const extraTicks = delimiter.repeat(2);
        return ` ${extraTicks}${cleanCode}${extraTicks} `;
      }

      return `${delimiter}${cleanCode}${delimiter}`;
    });
  }

  /**
   * Process tables
   */
  private processTables(markdown: string): string {
    if (!this.options.gfmTables) return markdown;

    return markdown.replace(
      /<table[^>]*>([\s\S]*?)<\/table>/gi,
      (_, tableContent) => {
        const rows = this.extractTableRows(tableContent);
        if (rows.length === 0) return "";

        let result = "\n\n";

        rows.forEach((row, index) => {
          result += "| " + row.join(" | ") + " |\n";

          // Add separator after header row
          if (index === 0) {
            result += "| " + row.map(() => "---").join(" | ") + " |\n";
          }
        });

        result += "\n";
        return result;
      },
    );
  }

  /**
   * Extract table rows and cells
   */
  private extractTableRows(tableContent: string): string[][] {
    const rows: string[][] = [];

    // Extract all rows (both thead and tbody)
    const rowMatches = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);

    if (rowMatches) {
      rowMatches.forEach((rowHtml) => {
        const cellMatches = rowHtml.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi);

        if (cellMatches) {
          const cells = cellMatches.map((cellHtml) => {
            return this.processHTML(
              cellHtml.replace(/<t[hd][^>]*>|<\/t[hd]>/gi, ""),
            )
              .replace(/\|/g, "\\|") // Escape pipes
              .trim();
          });

          if (cells.length > 0) {
            rows.push(cells);
          }
        }
      });
    }

    return rows;
  }

  /**
   * Process lists (ordered and unordered)
   */
  private processLists(markdown: string): string {
    // Process nested lists recursively
    markdown = this.processNestedLists(markdown, 0);

    // Process task lists if enabled
    if (this.options.taskLists) {
      markdown = this.processTaskLists(markdown);
    }

    return markdown;
  }

  /**
   * Process nested lists with proper indentation
   */
  private processNestedLists(markdown: string, depth: number): string {
    const indent = "  ".repeat(depth);

    // Unordered lists
    markdown = markdown.replace(
      /<ul[^>]*>([\s\S]*?)<\/ul>/gi,
      (_, listContent) => {
        return this.processListItems(
          listContent,
          this.options.bulletListMarker!,
          indent,
        );
      },
    );

    // Ordered lists
    markdown = markdown.replace(
      /<ol[^>]*>([\s\S]*?)<\/ol>/gi,
      (_, listContent) => {
        return this.processOrderedListItems(listContent, indent);
      },
    );

    return markdown;
  }

  /**
   * Process list items
   */
  private processListItems(
    listContent: string,
    marker: string,
    indent: string,
  ): string {
    const items = listContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);

    if (!items) return "";

    let result = "\n";

    items.forEach((itemHtml) => {
      const content = itemHtml.replace(/<\/?li[^>]*>/gi, "");

      // Handle nested lists
      const processedContent = this.processNestedLists(
        content,
        indent.length / 2 + 1,
      );
      const cleanContent = this.processHTML(processedContent).trim();

      if (cleanContent) {
        result += `${indent}${marker} ${cleanContent}\n`;
      }
    });

    return result + "\n";
  }

  /**
   * Process ordered list items
   */
  private processOrderedListItems(listContent: string, indent: string): string {
    const items = listContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);

    if (!items) return "";

    let result = "\n";
    let counter = 1;

    items.forEach((itemHtml) => {
      const content = itemHtml.replace(/<\/?li[^>]*>/gi, "");

      // Handle nested lists
      const processedContent = this.processNestedLists(
        content,
        indent.length / 2 + 1,
      );
      const cleanContent = this.processHTML(processedContent).trim();

      if (cleanContent) {
        result += `${indent}${counter}. ${cleanContent}\n`;
        counter++;
      }
    });

    return result + "\n";
  }

  /**
   * Process task lists (GitHub-style checkboxes)
   */
  private processTaskLists(markdown: string): string {
    // Handle checked tasks
    markdown = markdown.replace(
      /<input[^>]*type=['"']checkbox['"'][^>]*checked[^>]*>\s*/gi,
      "- [x] ",
    );

    // Handle unchecked tasks
    markdown = markdown.replace(
      /<input[^>]*type=['"']checkbox['"'][^>]*>\s*/gi,
      "- [ ] ",
    );

    return markdown;
  }

  /**
   * Process headers
   */
  private processHeaders(markdown: string): string {
    for (let level = 6; level >= 1; level--) {
      const regex = new RegExp(`<h${level}[^>]*>([\s\S]*?)<\/h${level}>`, "gi");

      markdown = markdown.replace(regex, (_, content) => {
        const cleanContent = this.processHTML(content).trim();

        if (this.options.headingStyle === "setext" && level <= 2) {
          const underline = level === 1 ? "=" : "-";
          return `\n\n${cleanContent}\n${underline.repeat(cleanContent.length)}\n\n`;
        } else {
          const hashes = "#".repeat(level);
          return `\n\n${hashes} ${cleanContent}\n\n`;
        }
      });
    }

    return markdown;
  }

  /**
   * Process blockquotes
   */
  private processBlockquotes(markdown: string): string {
    return markdown.replace(
      /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
      (_, content) => {
        const processedContent = this.processHTML(content);
        const lines = processedContent.split("\n");
        const quotedLines = lines.map((line) => "> " + line.trim()).join("\n");
        return `\n\n${quotedLines}\n\n`;
      },
    );
  }

  /**
   * Process links
   */
  private processLinks(markdown: string): string {
    return markdown.replace(
      /<a[^>]*href=['"]([^'"]*)['"'][^>]*(?:title=['"]([^'"]*)['"])?[^>]*>([\s\S]*?)<\/a>/gi,
      (_, href, title, text) => {
        const linkText = this.processHTML(text).trim();

        if (this.options.linkStyle === "reference") {
          return this.createReferenceLink(href, linkText, title);
        } else {
          const titlePart = title ? ` "${title}"` : "";
          return `[${linkText}](${href}${titlePart})`;
        }
      },
    );
  }

  /**
   * Create reference-style link
   */
  private createReferenceLink(
    href: string,
    text: string,
    title?: string,
  ): string {
    this.linkCounter++;
    const refId = this.linkCounter.toString();

    this.linkReferences.set(refId, { url: href, title });

    return `[${text}][${refId}]`;
  }

  /**
   * Generate reference links section
   */
  private generateReferenceLinks(): string {
    let result = "";

    this.linkReferences.forEach((ref, id) => {
      const titlePart = ref.title ? ` "${ref.title}"` : "";
      result += `[${id}]: ${ref.url}${titlePart}\n`;
    });

    return result;
  }

  /**
   * Process images
   */
  private processImages(markdown: string): string {
    return markdown.replace(
      /<img[^>]*src=['"]([^'"]*)['"'][^>]*(?:alt=['"]([^'"]*)['"])?[^>]*(?:title=['"]([^'"]*)['"])?[^>]*\/?>/gi,
      (_, src, alt, title) => {
        const altText = alt || "";
        const titlePart = title ? ` "${title}"` : "";
        return `![${altText}](${src}${titlePart})`;
      },
    );
  }

  /**
   * Process emphasis (bold and italic)
   */
  private processEmphasis(markdown: string): string {
    // Strong (bold) - process first to avoid conflicts
    markdown = markdown.replace(
      /<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi,
      (_, __, content) => {
        const processedContent = this.processHTML(content);
        return `${this.options.strongDelimiter}${processedContent}${this.options.strongDelimiter}`;
      },
    );

    // Emphasis (italic)
    markdown = markdown.replace(
      /<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi,
      (_, __, content) => {
        const processedContent = this.processHTML(content);
        return `${this.options.emDelimiter}${processedContent}${this.options.emDelimiter}`;
      },
    );

    // Strikethrough
    if (this.options.strikethrough) {
      markdown = markdown.replace(
        /<(s|del|strike)[^>]*>([\s\S]*?)<\/(s|del|strike)>/gi,
        (_, __, content) => {
          const processedContent = this.processHTML(content);
          return `~~${processedContent}~~`;
        },
      );
    }

    return markdown;
  }

  /**
   * Process horizontal rules
   */
  private processHorizontalRules(markdown: string): string {
    return markdown.replace(/<hr[^>]*\/?>/gi, "\n\n---\n\n");
  }

  /**
   * Process paragraphs
   */
  private processParagraphs(markdown: string): string {
    return markdown.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, content) => {
      const processedContent = this.processHTML(content).trim();
      return processedContent ? `\n\n${processedContent}\n\n` : "";
    });
  }

  /**
   * Clean up markdown output
   */
  private cleanupMarkdown(markdown: string): string {
    return (
      markdown
        // Normalize line breaks
        .replace(/\n{3,}/g, "\n\n")
        .replace(/^\n+|\n+$/g, "")

        // Clean up list formatting
        .replace(/\n(\s*[-*+]\s)/g, "\n$1")
        .replace(/\n(\s*\d+\.\s)/g, "\n$1")

        // Fix emphasis spacing
        .replace(/(\*\*|__|\*|_)(\s+)/g, "$2$1")
        .replace(/(\s+)(\*\*|__|\*|_)/g, "$1$2")

        // Clean up extra whitespace
        .replace(/[ \t]+$/gm, "") // Trailing whitespace
        .replace(/^[ \t]+/gm, "") // Leading whitespace (preserve intentional indentation)

        .trim()
    );
  }

  /**
   * Unescape HTML entities
   */
  private unescapeHTML(text: string): string {
    const entities: { [key: string]: string } = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
      "&nbsp;": " ",
      "&#x2F;": "/",
      "&#x60;": "`",
      "&#x3D;": "=",
    };

    return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
  }
}

/**
 * Convenience function for converting HTML to Markdown
 */
export const htmlToMarkdown = (
  html: string,
  options?: ConversionOptions,
): string => {
  const converter = new HTMLToMarkdownConverter(options);
  return converter.convert(html);
};

/**
 * Enhanced conversion specifically for contentEditable output
 */
export const contentEditableToMarkdown = (html: string): string => {
  return htmlToMarkdown(html, {
    preserveWhitespace: false,
    gfmTables: true,
    taskLists: true,
    strikethrough: true,
    codeBlocks: true,
    headingStyle: "atx",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
  });
};
