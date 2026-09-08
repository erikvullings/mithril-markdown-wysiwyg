import { PAGE_BREAK_HTML, PAGE_BREAK_MARKER } from "slimdown-js";

export { PAGE_BREAK_HTML, PAGE_BREAK_MARKER };

const BASE64_IMAGE_PATTERN =
  /data:(image\/[a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi;

export interface HiddenBase64Image {
  placeholder: string;
  source: string;
}

export interface MaskedMarkdown {
  display: string;
  hiddenImages: HiddenBase64Image[];
}

export const isPageBreakMarkerLine = (line: string): boolean => {
  const marker = line.match(/^ {0,3}(.*?)[ \t\r]*$/);
  return marker?.[1] === PAGE_BREAK_MARKER;
};

export const expandPageBreakMarkers = (markdown: string): string => {
  let fence: { marker: "`" | "~"; length: number } | null = null;

  return markdown
    .split(/\r?\n/)
    .map((line) => {
      const openingFence = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (!fence && openingFence) {
        fence = {
          marker: openingFence[1][0] as "`" | "~",
          length: openingFence[1].length,
        };
        return line;
      }

      if (fence) {
        const closingFence = line.match(/^ {0,3}(`+|~+)[ \t]*$/);
        if (
          closingFence &&
          closingFence[1][0] === fence.marker &&
          closingFence[1].length >= fence.length
        ) {
          fence = null;
        }
        return line;
      }

      return isPageBreakMarkerLine(line) ? PAGE_BREAK_HTML : line;
    })
    .join("\n");
};

export const isInsideFencedCode = (
  markdown: string,
  index: number,
): boolean => {
  let fence: { marker: "`" | "~"; length: number } | null = null;
  const lines = markdown.slice(0, index).split(/\r?\n/);

  for (const line of lines) {
    if (!fence) {
      const openingFence = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (openingFence) {
        fence = {
          marker: openingFence[1][0] as "`" | "~",
          length: openingFence[1].length,
        };
      }
      continue;
    }

    const closingFence = line.match(/^ {0,3}(`+|~+)[ \t]*$/);
    if (
      closingFence &&
      closingFence[1][0] === fence.marker &&
      closingFence[1].length >= fence.length
    ) {
      fence = null;
    }
  }

  return fence !== null;
};

export const maskBase64Images = (markdown: string): MaskedMarkdown => {
  const hiddenImages: HiddenBase64Image[] = [];
  const display = markdown.replace(
    BASE64_IMAGE_PATTERN,
    (source: string, mediaType: string, data: string) => {
      const sizeInKb = Math.max(1, Math.round((data.length * 3) / 4 / 1024));
      const placeholder = `data:${mediaType};base64,{hidden image ${hiddenImages.length + 1}: ${sizeInKb} KB}`;
      hiddenImages.push({ placeholder, source });
      return placeholder;
    },
  );

  return { display, hiddenImages };
};

export const restoreBase64Images = (
  display: string,
  hiddenImages: HiddenBase64Image[],
): string =>
  hiddenImages.reduce(
    (markdown, image) => markdown.split(image.placeholder).join(image.source),
    display,
  );

export const applyMaskedMarkdownEdit = (
  source: string,
  previousDisplay: string,
  nextDisplay: string,
  hiddenImages: HiddenBase64Image[],
): string => {
  let start = 0;
  while (
    start < previousDisplay.length &&
    start < nextDisplay.length &&
    previousDisplay[start] === nextDisplay[start]
  ) {
    start++;
  }

  let previousEnd = previousDisplay.length;
  let nextEnd = nextDisplay.length;
  while (
    previousEnd > start &&
    nextEnd > start &&
    previousDisplay[previousEnd - 1] === nextDisplay[nextEnd - 1]
  ) {
    previousEnd--;
    nextEnd--;
  }

  for (const image of hiddenImages) {
    const imageStart = previousDisplay.indexOf(image.placeholder);
    const imageEnd = imageStart + image.placeholder.length;
    if (imageStart < 0) continue;
    const insertsInsideImage =
      start === previousEnd && start > imageStart && start < imageEnd;
    const partiallyEditsImage =
      start < imageEnd &&
      previousEnd > imageStart &&
      !(start <= imageStart && previousEnd >= imageEnd);
    if (insertsInsideImage || partiallyEditsImage) return source;
  }

  const sourceStart = displayIndexToSourceIndex(
    previousDisplay,
    start,
    hiddenImages,
  );
  const sourceEnd = displayIndexToSourceIndex(
    previousDisplay,
    previousEnd,
    hiddenImages,
  );
  return (
    source.slice(0, sourceStart) +
    restoreBase64Images(
      nextDisplay.slice(start, nextEnd),
      hiddenImages,
    ) +
    source.slice(sourceEnd)
  );
};

/**
 * Build the `text/plain` clipboard payload for a copy from the masked
 * Markdown textarea (`start`/`end` are display-string indices, e.g. the
 * textarea's `selectionStart`/`selectionEnd`).
 *
 * A hidden image placeholder that is selected in its entirety is expanded
 * back to its original data URI so copying Markdown out - and pasting it
 * back in, here or elsewhere - never loses the image data. A placeholder
 * that is only partially covered by the selection is left as the raw
 * selected characters rather than assembled into a new, truncated data URI:
 * this mirrors the guarded partial-edit behavior of
 * `applyMaskedMarkdownEdit`, which similarly refuses to touch a placeholder
 * it can't safely resolve. All other selected text (including a wholly
 * unselected placeholder's untouched characters) passes through unchanged.
 */
export const getMaskedClipboardText = (
  display: string,
  hiddenImages: HiddenBase64Image[],
  start: number,
  end: number,
): string => {
  if (start >= end || hiddenImages.length === 0) {
    return display.slice(start, end);
  }

  const positioned = hiddenImages
    .map((image) => {
      const placeholderStart = display.indexOf(image.placeholder);
      return placeholderStart < 0
        ? null
        : {
            image,
            placeholderStart,
            placeholderEnd: placeholderStart + image.placeholder.length,
          };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .sort((a, b) => a.placeholderStart - b.placeholderStart);

  let result = "";
  let cursor = start;

  for (const { image, placeholderStart, placeholderEnd } of positioned) {
    const fullySelected = placeholderStart >= start && placeholderEnd <= end;
    if (!fullySelected) continue;

    result += display.slice(cursor, placeholderStart);
    result += image.source;
    cursor = placeholderEnd;
  }

  result += display.slice(cursor, end);
  return result;
};

export const displayIndexToSourceIndex = (
  display: string,
  displayIndex: number,
  hiddenImages: HiddenBase64Image[],
): number => {
  let sourceOffset = 0;

  for (const image of hiddenImages) {
    const start = display.indexOf(image.placeholder);
    if (start < 0 || displayIndex <= start) continue;
    if (displayIndex < start + image.placeholder.length) {
      return start + sourceOffset;
    }
    sourceOffset += image.source.length - image.placeholder.length;
  }

  return displayIndex + sourceOffset;
};

export const sourceIndexToDisplayIndex = (
  display: string,
  sourceIndex: number,
  hiddenImages: HiddenBase64Image[],
): number => {
  let sourceOffset = 0;

  for (const image of hiddenImages) {
    const displayStart = display.indexOf(image.placeholder);
    if (displayStart < 0) continue;
    const sourceStart = displayStart + sourceOffset;
    if (sourceIndex <= sourceStart) break;
    if (sourceIndex < sourceStart + image.source.length) return displayStart;
    sourceOffset += image.source.length - image.placeholder.length;
  }

  return sourceIndex - sourceOffset;
};

export interface SearchOptions {
  caseSensitive: boolean;
  wholeWord: boolean;
  regex: boolean;
}

export interface SearchMatch {
  start: number;
  end: number;
}

interface DomPoint {
  node: Node;
  offset: number;
}

interface DomTextIndex {
  text: string;
  points: DomPoint[];
}

const BLOCK_ELEMENTS = new Set([
  "ADDRESS",
  "ARTICLE",
  "ASIDE",
  "BLOCKQUOTE",
  "DIV",
  "FIGCAPTION",
  "FIGURE",
  "FOOTER",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "HEADER",
  "HR",
  "LI",
  "MAIN",
  "NAV",
  "OL",
  "P",
  "PRE",
  "SECTION",
  "TABLE",
  "UL",
]);

const createDomTextIndex = (root: HTMLElement): DomTextIndex => {
  let text = "";
  const points: DomPoint[] = [{ node: root, offset: 0 }];

  const appendText = (node: Node): void => {
    const value = node.textContent ?? "";
    points[text.length] = { node, offset: 0 };
    for (let index = 0; index < value.length; index++) {
      text += value[index];
      points[text.length] = { node, offset: index + 1 };
    }
  };

  const appendBreak = (parent: Node, offset: number): void => {
    text += "\n";
    points[text.length] = { node: parent, offset };
  };

  const visit = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      appendText(node);
      return;
    }
    if (node.nodeName === "BR") {
      const parent = node.parentNode ?? root;
      const offset =
        Array.from(parent.childNodes).indexOf(node as ChildNode) + 1;
      appendBreak(parent, offset);
      return;
    }

    Array.from(node.childNodes).forEach(visit);
    if (
      node !== root &&
      node.nodeType === Node.ELEMENT_NODE &&
      BLOCK_ELEMENTS.has(node.nodeName) &&
      node.nextSibling
    ) {
      const parent = node.parentNode ?? root;
      const offset =
        Array.from(parent.childNodes).indexOf(node as ChildNode) + 1;
      appendBreak(parent, offset);
      appendBreak(parent, offset);
    }
  };

  visit(root);
  return { text, points };
};

export const searchableDomText = (root: HTMLElement): string =>
  createDomTextIndex(root).text;

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const findTextMatches = (
  text: string,
  query: string,
  options: SearchOptions,
): { matches: SearchMatch[]; error?: string } => {
  if (!query) return { matches: [] };

  const expression = options.regex ? query : escapeRegExp(query);
  const pattern = options.wholeWord ? `\\b(?:${expression})\\b` : expression;

  try {
    const matcher = new RegExp(pattern, options.caseSensitive ? "gu" : "giu");
    const matches: SearchMatch[] = [];
    let match: RegExpExecArray | null;

    while ((match = matcher.exec(text))) {
      matches.push({ start: match.index, end: match.index + match[0].length });
      if (match[0].length === 0) {
        const nextCodePoint = text.codePointAt(matcher.lastIndex);
        matcher.lastIndex += nextCodePoint !== undefined && nextCodePoint > 0xffff
          ? 2
          : 1;
      }
    }

    return { matches };
  } catch (error) {
    return {
      matches: [],
      error: error instanceof Error ? error.message : "Invalid expression",
    };
  }
};

export const textOffsetWithin = (
  root: HTMLElement,
  container: Node,
  offset: number,
): number => {
  const index = createDomTextIndex(root);
  const exact = index.points.findIndex(
    (point) => point.node === container && point.offset === offset,
  );
  if (exact >= 0) return exact;

  const range = document.createRange();
  range.selectNodeContents(root);
  range.setEnd(container, offset);
  return range.toString().length;
};

export const selectTextRange = (
  root: HTMLElement,
  start: number,
  end: number,
): void => {
  const index = createDomTextIndex(root);
  const startPoint = index.points[Math.min(start, index.points.length - 1)];
  const endPoint = index.points[Math.min(end, index.points.length - 1)];
  const range = document.createRange();
  range.setStart(startPoint.node, startPoint.offset);
  range.setEnd(endPoint.node, endPoint.offset);
  const selection = document.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  const scrollTarget =
    startPoint.node.nodeType === Node.TEXT_NODE
      ? startPoint.node.parentElement
      : (startPoint.node as HTMLElement);
  scrollTarget?.scrollIntoView?.({ block: "nearest" });
  root.focus();
};

export const replaceTextRange = (
  root: HTMLElement,
  match: SearchMatch,
  replacement: string,
): void => {
  selectTextRange(root, match.start, match.end);
  const selection = document.getSelection();
  if (!selection?.rangeCount) return;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const node = document.createTextNode(replacement);
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};
