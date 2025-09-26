/**
 * Built-in HTML to Markdown conversion based on the original markdown-wysiwyg implementation
 * This eliminates the need for clients to provide their own htmlToMarkdown function
 */

export class BuiltinHtmlToMarkdown {
  /**
   * Main conversion function - converts HTML string or element to markdown
   */
  htmlToMarkdown(elementOrHtml: string | HTMLElement): string {
    let tempDiv: HTMLElement;
    if (typeof elementOrHtml === "string") {
      tempDiv = document.createElement("div");
      tempDiv.innerHTML = elementOrHtml;
    } else {
      tempDiv = elementOrHtml.cloneNode(true) as HTMLElement;
    }

    // Remove zero-width space characters
    tempDiv.innerHTML = tempDiv.innerHTML.replace(/\u200B/g, "");

    let markdown = "";
    this._normalizeNodes(tempDiv);

    Array.from(tempDiv.childNodes).forEach((child) => {
      markdown += this._nodeToMarkdownRecursive(child);
    });

    // Clean up multiple newlines and trailing spaces
    markdown = markdown.replace(/\n\s*\n\s*\n+/g, "\n\n");
    markdown = markdown.replace(/ +\n/g, "\n");

    return markdown.trim();
  }

  /**
   * Normalize nodes by merging adjacent text nodes and handling BR elements
   */
  private _normalizeNodes(parentElement: HTMLElement): void {
    let currentNode = parentElement.firstChild;

    while (currentNode) {
      let nextNode = currentNode.nextSibling;

      // Merge adjacent text nodes
      if (
        currentNode.nodeType === Node.TEXT_NODE &&
        nextNode &&
        nextNode.nodeType === Node.TEXT_NODE
      ) {
        currentNode.textContent =
          (currentNode.textContent || "") + (nextNode.textContent || "");
        parentElement.removeChild(nextNode);
        nextNode = currentNode.nextSibling;
      }
      // Handle BR elements
      else if (currentNode.nodeName === "BR") {
        if (
          !nextNode ||
          nextNode.nodeName === "BR" ||
          this._isBlockElement(nextNode)
        ) {
          const textNode = document.createTextNode("\n");
          parentElement.insertBefore(textNode, currentNode);
        } else if (
          nextNode.nodeType === Node.TEXT_NODE &&
          !nextNode.textContent!.startsWith("\n")
        ) {
          nextNode.textContent = "\n" + nextNode.textContent;
        } else if (
          nextNode.nodeType === Node.ELEMENT_NODE &&
          !this._isBlockElement(nextNode)
        ) {
          const textNode = document.createTextNode("\n");
          parentElement.insertBefore(textNode, nextNode);
        }
        parentElement.removeChild(currentNode);
        currentNode = nextNode;
        continue;
      }

      // Recursively normalize child nodes
      if (
        currentNode &&
        currentNode.childNodes &&
        currentNode.childNodes.length > 0 &&
        currentNode.nodeType === Node.ELEMENT_NODE
      ) {
        this._normalizeNodes(currentNode as HTMLElement);
      }

      currentNode = nextNode;
    }
  }

  /**
   * Check if a node is a block-level element
   */
  private _isBlockElement(node: Node): boolean {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    const blockElements = [
      "P",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "UL",
      "OL",
      "LI",
      "BLOCKQUOTE",
      "PRE",
      "HR",
      "TABLE",
      "THEAD",
      "TBODY",
      "TR",
      "DIV",
      "IMG",
    ];
    return blockElements.includes(node.nodeName);
  }

  /**
   * Find parent element with specified tag name(s)
   */
  private _findParentElement(
    node: Node,
    tagNameOrNames: string | string[],
  ): HTMLElement | null {
    const tagNames = Array.isArray(tagNameOrNames)
      ? tagNameOrNames
      : [tagNameOrNames];
    let current = node.parentNode;

    while (current) {
      if (
        current.nodeType === Node.ELEMENT_NODE &&
        tagNames.includes(current.nodeName)
      ) {
        return current as HTMLElement;
      }
      current = current.parentNode;
    }

    return null;
  }

  /**
   * Main recursive conversion function for individual nodes
   */
  private _nodeToMarkdownRecursive(
    node: Node,
    options: { inTableCell?: boolean } = {},
  ): string {
    switch (node.nodeName) {
      case "#text":
        let text = node.textContent || "";
        if (options.inTableCell) {
          text = text.replace(/\|/g, "\\|");
          if (
            !this._findParentElement(node, "PRE") &&
            !this._findParentElement(node, "CODE")
          ) {
            text = text.replace(/\n/g, "<br>");
          }
        } else {
          if (
            !this._findParentElement(node, "PRE") &&
            !this._findParentElement(node, "CODE")
          ) {
            text = text.replace(/  +/g, " ");
          }
        }
        return text;

      case "BR":
        return options.inTableCell ? "<br>" : "\n";

      case "IMG":
        if (options.inTableCell) {
          return (node as HTMLElement).outerHTML;
        }
        const imgElement = node as HTMLImageElement;
        const imgSrc = imgElement.getAttribute("src") || "";
        const imgAlt = imgElement.getAttribute("alt") || "";
        return `![${imgAlt}](${imgSrc})\n\n`;

      case "B":
      case "STRONG":
        return `**${this._processInlineContainerRecursive(node, options).trim()}**`;

      case "I":
      case "EM":
        return `*${this._processInlineContainerRecursive(node, options).trim()}*`;

      case "S":
      case "DEL":
      case "STRIKE":
        return `~~${this._processInlineContainerRecursive(node, options).trim()}~~`;

      case "A":
        const linkElement = node as HTMLAnchorElement;
        const href = linkElement.getAttribute("href") || "";
        const linkText = this._processInlineContainerRecursive(
          node,
          options,
        ).trim();
        return `[${linkText}](${href})`;

      case "CODE":
        if (!this._findParentElement(node, "PRE")) {
          let codeContent = node.textContent || "";
          if (options.inTableCell) {
            codeContent = codeContent.replace(/\|/g, "\\|");
          }
          return `\`${codeContent.trim()}\``;
        }
        return "";

      case "P":
        if (options.inTableCell) {
          return this._nodeToHtmlForTableCell(node as HTMLElement);
        }
        const pElement = node as HTMLElement;
        const pParent = pElement.parentNode;
        const isInsideListItemOrBlockquote =
          pParent &&
          (pParent.nodeName === "LI" || pParent.nodeName === "BLOCKQUOTE");
        let pContent = this._processInlineContainerRecursive(
          node,
          options,
        ).trim();
        if (isInsideListItemOrBlockquote) {
          return (
            pContent.replace(/\n\s*\n/g, "\n").trim() + (pContent ? "\n" : "")
          );
        }
        return pContent ? `${pContent}\n\n` : "";

      case "UL":
      case "OL":
        if (options.inTableCell) {
          return this._nodeToHtmlForTableCell(node as HTMLElement);
        }
        let listMd = this._listToMarkdownRecursive(
          node as HTMLElement,
          "",
          node.nodeName,
          1,
          options,
        );
        if (listMd.trim().length > 0 && !listMd.endsWith("\n\n")) {
          if (!listMd.endsWith("\n")) listMd += "\n";
          listMd += "\n";
        }
        return listMd;

      case "BLOCKQUOTE":
        if (options.inTableCell) {
          return this._nodeToHtmlForTableCell(node as HTMLElement);
        }
        const quoteContentRaw = this._processInlineContainerRecursive(
          node,
          options,
        );
        const quoteLines = quoteContentRaw
          .split("\n")
          .map((line) => line.trim());
        const nonEmptyLines = quoteLines.filter((line) => line.length > 0);
        return (
          nonEmptyLines.map((line) => `> ${line}`).join("\n") +
          (nonEmptyLines.length > 0 ? "\n\n" : "")
        );

      case "PRE":
        if (options.inTableCell) {
          return this._nodeToHtmlForTableCell(node as HTMLElement);
        }
        const preElement = node as HTMLElement;
        if (
          preElement.firstChild &&
          preElement.firstChild.nodeName === "CODE"
        ) {
          const codeElement = preElement.firstChild as HTMLElement;
          const langMatch = codeElement.className.match(/language-(\S+)/);
          const lang = langMatch ? langMatch[1] : "";
          let preContent = codeElement.textContent || "";
          if (preContent.length > 0 && !preContent.endsWith("\n"))
            preContent += "\n";
          return `\`\`\`${lang}\n${preContent}\`\`\`\n\n`;
        }
        let preTextContent = preElement.textContent || "";
        if (preTextContent.length > 0 && !preTextContent.endsWith("\n"))
          preTextContent += "\n";
        return `\`\`\`\n${preTextContent}\`\`\`\n\n`;

      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        if (options.inTableCell) {
          return this._nodeToHtmlForTableCell(node as HTMLElement);
        }
        const level = parseInt(node.nodeName[1]);
        return `${"#".repeat(level)} ${this._processInlineContainerRecursive(node, options).trim()}\n\n`;

      case "HR":
        if (options.inTableCell) {
          return this._nodeToHtmlForTableCell(node as HTMLElement);
        }
        return "\n---\n\n";

      case "DIV":
        if (options.inTableCell) {
          return this._nodeToHtmlForTableCell(node as HTMLElement);
        }
        const divElement = node as HTMLElement;
        const divContent = this._processInlineContainerRecursive(
          node,
          options,
        ).trim();
        if (divElement.classList.contains("md-editable-area"))
          return divContent;
        return divContent ? `${divContent}\n\n` : "";

      case "TABLE":
        return this._tableToMarkdown(node as HTMLTableElement, options);

      case "LI":
        return this._processInlineContainerRecursive(node, options).trim();

      default:
        if (node.childNodes && node.childNodes.length > 0) {
          return this._processInlineContainerRecursive(node, options);
        }
        let defaultText = node.textContent || "";
        if (
          !options.inTableCell &&
          !this._findParentElement(node, "PRE") &&
          !this._findParentElement(node, "CODE")
        ) {
          defaultText = defaultText.replace(/  +/g, " ");
        }
        if (options.inTableCell) {
          defaultText = defaultText.replace(/\|/g, "\\|");
          if (
            !this._findParentElement(node, "PRE") &&
            !this._findParentElement(node, "CODE")
          ) {
            defaultText = defaultText.replace(/\n/g, "<br>");
          }
        }
        return defaultText;
    }
  }

  /**
   * Process inline container elements recursively
   */
  private _processInlineContainerRecursive(
    node: Node,
    options: { inTableCell?: boolean } = {},
  ): string {
    let result = "";
    Array.from(node.childNodes).forEach((child) => {
      result += this._nodeToMarkdownRecursive(child, options);
    });
    return result;
  }

  /**
   * Convert list to markdown recursively
   */
  private _listToMarkdownRecursive(
    listNode: HTMLElement,
    prefix: string,
    listType: string,
    depth: number,
    options: { inTableCell?: boolean } = {},
  ): string {
    let markdown = "";
    let counter = 1;

    Array.from(listNode.children).forEach((listItem) => {
      if (listItem.nodeName === "LI") {
        const marker = listType === "OL" ? `${counter}. ` : "- ";
        const itemContent = this._processInlineContainerRecursive(
          listItem,
          options,
        ).trim();

        if (itemContent) {
          const lines = itemContent.split("\n");
          lines.forEach((line, index) => {
            if (index === 0) {
              markdown += `${prefix}${marker}${line}\n`;
            } else {
              markdown += `${prefix}  ${line}\n`;
            }
          });
        }

        // Handle nested lists
        const nestedLists = listItem.querySelectorAll("ul, ol");
        nestedLists.forEach((nestedList) => {
          if (nestedList.parentNode === listItem) {
            markdown += this._listToMarkdownRecursive(
              nestedList as HTMLElement,
              prefix + "  ",
              nestedList.nodeName,
              depth + 1,
              options,
            );
          }
        });

        if (listType === "OL") counter++;
      }
    });

    return markdown;
  }

  /**
   * Convert table to markdown
   */
  private _tableToMarkdown(
    tableNode: HTMLTableElement,
    options: { inTableCell?: boolean } = {},
  ): string {
    let tableMarkdown = "";
    const tHeadNode = tableNode.querySelector("thead");
    const tBodyNode = tableNode.querySelector("tbody") || tableNode;
    let colCount = 0;
    let headerMdContent = "";
    let bodyMdContent = "";

    // Process header
    if (tHeadNode) {
      Array.from(tHeadNode.querySelectorAll("tr")).forEach((headerRowNode) => {
        const headerCells = Array.from(
          headerRowNode.querySelectorAll("th, td"),
        ).map((cell) =>
          this._cellContentToMarkdown(cell as HTMLTableCellElement),
        );
        if (headerCells.length > 0) {
          headerMdContent += `| ${headerCells.join(" | ")} |\n`;
          if (colCount === 0) colCount = headerCells.length;
        }
      });
    }

    // Use first tbody row as header if no thead
    let firstTBodyRowUsedAsHeader = false;
    if (colCount === 0 && tBodyNode) {
      const firstRow = tBodyNode.querySelector("tr");
      if (firstRow) {
        const isLikelyHeader =
          Array.from(firstRow.children).some(
            (cell) => cell.nodeName === "TH",
          ) ||
          Array.from(firstRow.children).every(
            (cell) =>
              cell.children.length === 1 &&
              ["STRONG", "B", "EM", "I"].includes(
                (cell.firstElementChild as Element)?.nodeName,
              ),
          );

        if (isLikelyHeader) {
          const potentialHeaderCells = Array.from(
            firstRow.querySelectorAll("th, td"),
          ).map((cell) =>
            this._cellContentToMarkdown(cell as HTMLTableCellElement),
          );
          if (potentialHeaderCells.length > 0) {
            headerMdContent += `| ${potentialHeaderCells.join(" | ")} |\n`;
            colCount = potentialHeaderCells.length;
            firstTBodyRowUsedAsHeader = true;
          }
        }
      }
    }

    // Determine column count
    if (colCount === 0 && tBodyNode) {
      const firstDataRow = tBodyNode.querySelector("tr");
      if (firstDataRow) {
        colCount = firstDataRow.querySelectorAll("td, th").length;
      }
    }

    // Fallback for malformed tables
    if (colCount === 0 && headerMdContent.trim() === "") {
      let fallbackContent = "";
      Array.from(tableNode.querySelectorAll("tr")).forEach((trNode) => {
        Array.from(trNode.querySelectorAll("th, td")).forEach((cellNode) => {
          fallbackContent += this._nodeToMarkdownRecursive(cellNode, {
            ...options,
            inTableCell: false,
          });
        });
      });
      return fallbackContent.trim() ? fallbackContent.trim() + "\n\n" : "";
    }

    tableMarkdown = headerMdContent;

    // Add separator row
    if (headerMdContent.trim() !== "" || colCount > 0) {
      tableMarkdown += `|${" --- |".repeat(colCount)}\n`;
    }

    // Process body rows
    Array.from(tBodyNode.querySelectorAll("tr")).forEach(
      (bodyRowNode, index) => {
        if (firstTBodyRowUsedAsHeader && index === 0) return;

        const bodyCellsHtml = Array.from(
          bodyRowNode.querySelectorAll("td, th"),
        );
        let bodyCellsMd = bodyCellsHtml.map((cell) =>
          this._cellContentToMarkdown(cell as HTMLTableCellElement),
        );

        const finalCells = [];
        for (let k = 0; k < colCount; k++) {
          finalCells.push(bodyCellsMd[k] || "");
        }
        bodyMdContent += `| ${finalCells.join(" | ")} |\n`;
      },
    );

    tableMarkdown += bodyMdContent;
    return tableMarkdown.trim() ? tableMarkdown.trim() + "\n\n" : "";
  }

  /**
   * Convert table cell content to markdown
   */
  private _cellContentToMarkdown(cell: HTMLTableCellElement): string {
    return this._processInlineContainerRecursive(cell, { inTableCell: true })
      .replace(/\n/g, " ")
      .trim();
  }

  /**
   * Convert node to HTML for table cells (preserves some HTML in table cells)
   */
  private _nodeToHtmlForTableCell(node: HTMLElement): string {
    // For table cells, preserve some HTML formatting
    return node.outerHTML;
  }
}

// Create a singleton instance
const builtinConverter = new BuiltinHtmlToMarkdown();

/**
 * Built-in HTML to markdown conversion function
 * This replaces the need for clients to provide their own htmlToMarkdown function
 */
export const builtinHtmlToMarkdown = (html: string | HTMLElement): string => {
  return builtinConverter.htmlToMarkdown(html);
};

export const detectContentType = (
  text: string,
): "html" | "markdown" | "plain" => {
  const trimmed = text.trim();

  // Try parsing as HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(trimmed, "text/html");

  const hasTags =
    doc.body.children.length > 0 || doc.body.querySelector("*") !== null;

  if (hasTags) {
    return "html";
  }

  // Markdown patterns
  const markdownRegex =
    /(^#{1,6}\s)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))|(^\s*[-*+]\s+)/m;
  if (markdownRegex.test(trimmed)) {
    return "markdown";
  }

  return "plain";
};
