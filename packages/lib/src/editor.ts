import m, { type FactoryComponent } from "mithril";
import { MarkdownEditorAttrs, ToolbarButton } from "./types";
import {
  createI18nToolbarConfig,
  headingOptions,
  isDropdownButton,
} from "./toolbar-config";
import { EditorActions } from "./editor-actions";
import { ImageModal } from "./components/image-modal";
import { LinkModal } from "./components/link-modal";
import { TableSelector } from "./components/table-selector";
import { TableMenu } from "./components/table-menu";
import { DropdownMenu } from "./components/dropdown-menu";
import {
  builtinHtmlToMarkdown,
  detectContentType,
} from "./utils/builtin-html-to-markdown";
import * as DOMUtils from "./utils/dom-commands";
import { markdownToWysiwygHtml } from "./utils/markdown-to-html";
import { createCursorPositionStore } from "./utils/cursor-position-store";
import { createI18n } from "./i18n";
import {
  applyMaskedMarkdownEdit,
  displayIndexToSourceIndex,
  expandPageBreakMarkers,
  findTextMatches,
  getMaskedClipboardText,
  isInsideFencedCode,
  isPageBreakMarkerLine,
  maskBase64Images,
  PAGE_BREAK_MARKER,
  replaceTextRange,
  searchableDomText,
  selectTextRange,
  sourceIndexToDisplayIndex,
  textOffsetWithin,
  type HiddenBase64Image,
  type SearchMatch,
  type SearchOptions,
} from "./utils/editor-content";
import {
  highlightCodeBlocks,
  highlightMarkdown,
} from "./utils/syntax-highlighter";
import { markdownGrammar } from "./utils/markdown-grammar";

type PageBreakBoundary = {
  ordinal: number;
  side: "before" | "after";
};

export const MarkdownEditor: FactoryComponent<MarkdownEditorAttrs> = () => {
  let wysiwygContent = "";
  let markdownContent = "";
  let initialized = false;
  let editorActions: EditorActions | null = null;
  let internalMode: "wysiwyg" | "markdown" | null = null;
  let editorRoot: HTMLElement | null = null;
  let pendingTextOffset: number | null = null;
  let pendingMarkdownIndex: number | null = null;
  let pendingPageBreakBoundary: PageBreakBoundary | null = null;
  let pendingMarkdownPageBreakBoundary: PageBreakBoundary | null = null;
  let pendingModeScroll: { top: number; left: number } | null = null;
  let activeHiddenImages: HiddenBase64Image[] = [];
  let activeMaskedDisplay = "";
  let activeMarkdownSource = "";
  let showSearch = false;
  let showReplace = false;
  let searchQuery = "";
  let replacement = "";
  let activeMatch = -1;
  let searchOptions: SearchOptions = {
    caseSensitive: false,
    wholeWord: false,
    regex: false,
  };
  // Scoped to this editor instance, so multiple editors on one page don't
  // clobber each other's saved cursor/scroll position.
  const cursorPositionStore = createCursorPositionStore();

  // Syntax-highlight overlay elements (markdown textarea mode)
  let highlightPre: HTMLElement | null = null;
  let markdownTextarea: HTMLTextAreaElement | null = null;

  // Update the syntax-highlight overlay with the latest markdown content
  const updateHighlightOverlay = (content: string): void => {
    if (!highlightPre) return;
    highlightPre.innerHTML = highlightMarkdown(content, markdownGrammar);
  };

  // Helper function to safely render markdown with empty content check
  const safeMarkdownToHtml = (
    markdown: string,
    markdownToHtml?: (markdown: string) => string,
  ): string => {
    if (!markdown || markdown.trim() === "") {
      return "";
    }
    return markdownToHtml
      ? markdownToHtml(expandPageBreakMarkers(markdown))
      : markdownToWysiwygHtml(markdown);
  };

  const htmlText = (html: string): string => {
    const container = document.createElement("div");
    container.innerHTML = html;
    return searchableDomText(container);
  };

  const markdownTextOffset = (
    markdown: string,
    index: number,
    markdownToHtml?: (markdown: string) => string,
  ): number => {
    const marker = "\uE000";
    const maxDistance = Math.min(markdown.length, 128);
    for (let distance = 0; distance <= maxDistance; distance++) {
      const candidates =
        distance === 0 ? [index] : [index - distance, index + distance];
      for (const candidate of candidates) {
        if (candidate < 0 || candidate > markdown.length) continue;
        const text = htmlText(
          safeMarkdownToHtml(
            markdown.slice(0, candidate) +
              marker +
              markdown.slice(candidate),
            markdownToHtml,
          ),
        );
        const markerOffset = text.indexOf(marker);
        if (markerOffset >= 0) return markerOffset;
      }
    }

    const fullTextLength = htmlText(
      safeMarkdownToHtml(markdown, markdownToHtml),
    ).length;
    return markdown.length
      ? Math.round((index / markdown.length) * fullTextLength)
      : 0;
  };

  const markdownIndexForDomSelection = (
    markdown: string,
    root: HTMLElement,
    range: Range,
    markdownToHtml?: (markdown: string) => string,
  ): number => {
    const targetOffset = textOffsetWithin(
      root,
      range.startContainer,
      range.startOffset,
    );
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      const text = range.startContainer.textContent ?? "";
      const candidates: number[] = [];
      let candidate = markdown.indexOf(text);
      while (candidate >= 0) {
        candidates.push(candidate + range.startOffset);
        candidate = markdown.indexOf(text, candidate + 1);
      }
      if (candidates.length) {
        const closest = candidates.reduce((best, current) =>
          Math.abs(
            markdownTextOffset(markdown, current, markdownToHtml) -
              targetOffset,
          ) <
          Math.abs(
            markdownTextOffset(markdown, best, markdownToHtml) - targetOffset,
          )
            ? current
            : best,
        );
        const parent = range.startContainer.parentElement;
        if (parent?.closest("a") && range.startOffset === text.length) {
          const linkTargetStart = markdown.indexOf("](", closest);
          const linkEnd =
            linkTargetStart >= 0 ? markdown.indexOf(")", linkTargetStart) : -1;
          if (linkEnd >= 0) return linkEnd + 1;
        }
        return closest;
      }
    }

    const candidates = [0, markdown.length];
    for (let index = 0; index < markdown.length; index++) {
      if (markdown[index] === "\n") {
        candidates.push(index, index + 1);
      }
    }
    return candidates.reduce((best, current) =>
      Math.abs(
        markdownTextOffset(markdown, current, markdownToHtml) - targetOffset,
      ) <
      Math.abs(markdownTextOffset(markdown, best, markdownToHtml) - targetOffset)
        ? current
        : best,
    );
  };

  const pageBreakMarkerIndexes = (markdown: string): number[] => {
    const indexes: number[] = [];
    let markerStart = markdown.indexOf(PAGE_BREAK_MARKER);
    while (markerStart >= 0) {
      const lineStart = markdown.lastIndexOf("\n", markerStart - 1) + 1;
      const lineEnd = markdown.indexOf("\n", markerStart);
      const line = markdown.slice(
        lineStart,
        lineEnd < 0 ? markdown.length : lineEnd,
      );
      if (
        isPageBreakMarkerLine(line) &&
        !isInsideFencedCode(markdown, markerStart)
      ) {
        indexes.push(markerStart);
      }
      markerStart = markdown.indexOf(
        PAGE_BREAK_MARKER,
        markerStart + PAGE_BREAK_MARKER.length,
      );
    }
    return indexes;
  };

  const pageBreakBoundaryAtMarkdownIndex = (
    markdown: string,
    index: number,
  ): PageBreakBoundary | null => {
    const markerIndexes = pageBreakMarkerIndexes(markdown);
    for (let ordinal = 0; ordinal < markerIndexes.length; ordinal++) {
      const markerStart = markerIndexes[ordinal];
      if (index === markerStart) return { ordinal, side: "before" };
      if (index === markerStart + PAGE_BREAK_MARKER.length) {
        return { ordinal, side: "after" };
      }
    }
    return null;
  };

  const markdownIndexForPageBreakBoundary = (
    markdown: string,
    boundary: PageBreakBoundary,
  ): number | null => {
    const markerStart = pageBreakMarkerIndexes(markdown)[boundary.ordinal];
    if (markerStart === undefined) return null;
    return (
      markerStart +
      (boundary.side === "after" ? PAGE_BREAK_MARKER.length : 0)
    );
  };

  const pageBreakBoundaryAtDomSelection = (
    root: HTMLElement,
    range: Range,
  ): PageBreakBoundary | null => {
    const pageBreaks = Array.from(
      root.querySelectorAll<HTMLElement>('[data-markdown-page-break="true"]'),
    );
    for (let ordinal = 0; ordinal < pageBreaks.length; ordinal++) {
      const pageBreak = pageBreaks[ordinal];
      const parent = pageBreak.parentNode;
      if (!parent || range.startContainer !== parent) continue;
      const offset = Array.from(parent.childNodes).indexOf(pageBreak);
      if (range.startOffset === offset) return { ordinal, side: "before" };
      if (range.startOffset === offset + 1) return { ordinal, side: "after" };
    }
    return null;
  };

  const selectPageBreakBoundary = (
    root: HTMLElement,
    boundary: PageBreakBoundary,
  ): boolean => {
    const pageBreak = root.querySelectorAll<HTMLElement>(
      '[data-markdown-page-break="true"]',
    )[boundary.ordinal];
    const parent = pageBreak?.parentNode;
    if (!pageBreak || !parent) return false;
    const offset =
      Array.from(parent.childNodes).indexOf(pageBreak) +
      (boundary.side === "after" ? 1 : 0);
    const range = document.createRange();
    range.setStart(parent, offset);
    range.collapse(true);
    const selection = document.getSelection();
    root.focus();
    selection?.removeAllRanges();
    selection?.addRange(range);
    return true;
  };

  // Modal states
  let showImageModal = false;
  let showLinkModal = false;
  let showTableSelector = false;
  let showTableMenu = false;
  let tableMenuPosition = { x: 0, y: 0 };
  let tableSelectorPosition = { x: 0, y: 0 };

  // Dropdown states
  let showDropdown = false;
  let dropdownOptions: ToolbarButton[] = [];
  let dropdownPosition = { x: 0, y: 0 };
  let dropdownTriggerElement: HTMLElement | null = null;
  let activeDropdownButton: string | null = null;

  // Table context menu state
  let tableContextTarget: HTMLElement | null = null;

  return {
    view: ({ attrs }) => {
      const {
        mode = "wysiwyg",
        theme = "light",
        toolbar = true,
        showTabs = true,
        placeholder = "Start writing...",
        content = "",
        isPreview = false,
        markdownToHtml,
        htmlToMarkdown,
        onContentChange,
        onModeChange,
        i18n,
        hideBase64Images = false,
      } = attrs;

      // Initialize mode and content on first render
      if (!initialized) {
        internalMode = mode;

        if (detectContentType(content) === "html") {
          // Content is HTML
          wysiwygContent = content;
          markdownContent = htmlToMarkdown
            ? htmlToMarkdown(content)
            : builtinHtmlToMarkdown(content);
        } else {
          // Content is markdown
          markdownContent = content;
          wysiwygContent = safeMarkdownToHtml(content, markdownToHtml);
        }
        initialized = true;
      }

      // Determine the current mode - use internal mode if onModeChange is not provided
      const currentMode = onModeChange ? mode : internalMode || mode;
      const maskedMarkdown = hideBase64Images
        ? maskBase64Images(markdownContent)
        : { display: markdownContent, hiddenImages: [] as HiddenBase64Image[] };
      activeHiddenImages = maskedMarkdown.hiddenImages;
      activeMaskedDisplay = maskedMarkdown.display;
      activeMarkdownSource = markdownContent;

      // Create i18n function and toolbar configuration
      const t = createI18n(i18n);
      const toolbarConfig = createI18nToolbarConfig(t);
      const currentToolbarGroups = toolbarConfig.groups;

      const handleContentChange = (
        newContent: string,
        contentMode: "wysiwyg" | "markdown",
      ) => {
        if (contentMode === "wysiwyg") {
          wysiwygContent = newContent;
          markdownContent = htmlToMarkdown
            ? htmlToMarkdown(newContent)
            : builtinHtmlToMarkdown(newContent);
          editorActions?.recordHistory(newContent);
          onContentChange?.(markdownContent);
        } else {
          markdownContent = newContent;
          wysiwygContent = safeMarkdownToHtml(newContent, markdownToHtml);
          onContentChange?.(markdownContent);
        }
      };

      // Copying a Markdown selection should never hand the user a hidden
      // image *placeholder* instead of its real data - that would silently
      // lose the image on paste elsewhere. When the selection wholly
      // contains one or more placeholders, put their original data URIs on
      // the clipboard instead. A selection that only partially overlaps a
      // placeholder is left to the browser's default copy: `display` never
      // contains a malformed/truncated data URI in the first place, so
      // there's nothing unsafe to guard against there (see
      // `getMaskedClipboardText`'s docs for the full rationale).
      const handleMarkdownCopy = (event: Event) => {
        if (!hideBase64Images || activeHiddenImages.length === 0) return;
        const textarea = editorActions?.getTextarea();
        if (!textarea) return;
        const { selectionStart, selectionEnd } = textarea;
        if (selectionStart === selectionEnd) return;

        const rawSelection = activeMaskedDisplay.slice(
          selectionStart,
          selectionEnd,
        );
        const clipboardText = getMaskedClipboardText(
          activeMaskedDisplay,
          activeHiddenImages,
          selectionStart,
          selectionEnd,
        );
        if (clipboardText === rawSelection) return;

        const clipboardEvent = event as ClipboardEvent;
        if (!clipboardEvent.clipboardData) return;
        clipboardEvent.preventDefault();
        clipboardEvent.clipboardData.setData("text/plain", clipboardText);
      };

      if (!editorActions) {
        // This callback is created once, on the first render, but content
        // changes can arrive from any later render/mode. Look up the mode
        // via editorActions.getMode() at call time rather than closing over
        // `currentMode` - that would freeze it at whatever mode was active
        // on this very first render, silently misclassifying every content
        // change made after the user switches modes (e.g. a markdown-mode
        // edit getting treated as WYSIWYG HTML, corrupting the textarea's
        // value and resetting the cursor to the end).
        editorActions = new EditorActions((newContent: string) => {
          const actionMode = editorActions!.getMode();
          handleContentChange(
            actionMode === "markdown"
              ? applyMaskedMarkdownEdit(
                  activeMarkdownSource,
                  activeMaskedDisplay,
                  newContent,
                  activeHiddenImages,
                )
              : newContent,
            actionMode,
          );
        });
        editorActions.initHistory(wysiwygContent);
      }
      editorActions.setMode(currentMode);

      const handleModeChange = (newMode: "wysiwyg" | "markdown") => {
        if (newMode !== currentMode) {
          const scrollSource =
            currentMode === "markdown"
              ? editorActions?.getTextarea()
              : editorActions?.getContentEditable();
          if (scrollSource) {
            pendingModeScroll = {
              top: scrollSource.scrollTop,
              left: scrollSource.scrollLeft,
            };
          }

          if (currentMode === "markdown") {
            const textarea = editorActions?.getTextarea();
            if (textarea) {
              const sourceIndex = displayIndexToSourceIndex(
                maskedMarkdown.display,
                textarea.selectionStart,
                maskedMarkdown.hiddenImages,
              );
              pendingPageBreakBoundary = pageBreakBoundaryAtMarkdownIndex(
                markdownContent,
                sourceIndex,
              );
              if (!pendingPageBreakBoundary) {
                pendingTextOffset = markdownTextOffset(
                  markdownContent,
                  sourceIndex,
                  markdownToHtml,
                );
              }
            }
          } else {
            const contentEditable = editorActions?.getContentEditable();
            const selection = document.getSelection();
            if (
              contentEditable &&
              selection?.rangeCount &&
              contentEditable.contains(selection.anchorNode)
            ) {
              const range = selection.getRangeAt(0);
              const pageBreakBoundary = pageBreakBoundaryAtDomSelection(
                contentEditable,
                range,
              );
              if (pageBreakBoundary) {
                pendingMarkdownPageBreakBoundary = pageBreakBoundary;
              } else {
                pendingMarkdownIndex = markdownIndexForDomSelection(
                    markdownContent,
                    contentEditable,
                    range,
                    markdownToHtml,
                  );
              }
            }
          }

          // Convert content when switching modes
          if (newMode === "markdown" && currentMode === "wysiwyg") {
            // Switching from WYSIWYG to markdown - convert HTML to markdown
            markdownContent = htmlToMarkdown
              ? htmlToMarkdown(wysiwygContent)
              : builtinHtmlToMarkdown(wysiwygContent);
          } else if (newMode === "wysiwyg" && currentMode === "markdown") {
            // Switching from markdown to WYSIWYG - convert markdown to HTML
            wysiwygContent = safeMarkdownToHtml(
              markdownContent,
              markdownToHtml,
            );
            // The WYSIWYG content is freshly regenerated from markdown, so
            // undo history from before the mode switch no longer applies.
            editorActions?.initHistory(wysiwygContent);
          }

          // Update internal mode if no external mode management
          if (!onModeChange) {
            internalMode = newMode;
          }

          editorActions?.setMode(newMode);
          onModeChange?.(newMode);
        }
      };

      const getSearchText = (): string => {
        if (currentMode === "markdown") return maskedMarkdown.display;
        const contentEditable = editorActions?.getContentEditable();
        return contentEditable ? searchableDomText(contentEditable) : "";
      };

      const searchResult = findTextMatches(
        getSearchText(),
        searchQuery,
        searchOptions,
      );
      const matches = searchResult.matches;
      if (activeMatch >= matches.length) {
        activeMatch = matches.length ? matches.length - 1 : -1;
      }

      const selectMatch = (match: SearchMatch): void => {
        if (currentMode === "markdown") {
          const textarea = editorActions?.getTextarea();
          if (!textarea) return;
          textarea.focus();
          textarea.setSelectionRange(match.start, match.end);
          const lineHeight =
            parseFloat(getComputedStyle(textarea).lineHeight) || 20;
          const line = textarea.value.slice(0, match.start).split("\n").length;
          textarea.scrollTop = Math.max(0, (line - 2) * lineHeight);
          return;
        }
        const contentEditable = editorActions?.getContentEditable();
        if (contentEditable) {
          selectTextRange(contentEditable, match.start, match.end);
        }
      };

      const moveToMatch = (direction: 1 | -1): void => {
        if (!matches.length) {
          activeMatch = -1;
          return;
        }
        activeMatch =
          (activeMatch + direction + matches.length) % matches.length;
        selectMatch(matches[activeMatch]);
      };

      const notifyMarkdownDisplayChange = (
        display: string,
      ): void => {
        handleContentChange(
          applyMaskedMarkdownEdit(
            markdownContent,
            maskedMarkdown.display,
            display,
            maskedMarkdown.hiddenImages,
          ),
          "markdown",
        );
      };

      const replaceMatches = (replaceAll: boolean): void => {
        if (!matches.length) return;
        const selectedMatches = replaceAll
          ? [...matches].reverse()
          : [matches[Math.max(activeMatch, 0)]];

        if (currentMode === "markdown") {
          let display = maskedMarkdown.display;
          for (const match of selectedMatches) {
            display =
              display.slice(0, match.start) +
              replacement +
              display.slice(match.end);
          }
          notifyMarkdownDisplayChange(display);
          const textarea = editorActions?.getTextarea();
          if (textarea) textarea.value = display;
        } else {
          const contentEditable = editorActions?.getContentEditable();
          if (!contentEditable) return;
          for (const match of selectedMatches) {
            replaceTextRange(contentEditable, match, replacement);
          }
          handleContentChange(contentEditable.innerHTML, "wysiwyg");
        }
        activeMatch = -1;
      };

      const openSearch = (withReplace: boolean): void => {
        if (showSearch && showReplace === withReplace) {
          showSearch = false;
          showReplace = false;
          return;
        }
        showSearch = true;
        showReplace = withReplace;
        m.redraw.sync();
        setTimeout(() => {
          const input = editorRoot?.querySelector<HTMLInputElement>(
            ".md-search-input",
          );
          input?.focus();
          input?.select();
        });
      };

      const handleEditorKeyDown = (event: Event): boolean => {
        const keyboardEvent = event as KeyboardEvent;
        const modifier = keyboardEvent.metaKey || keyboardEvent.ctrlKey;
        if (modifier && keyboardEvent.key.toLowerCase() === "f") {
          keyboardEvent.preventDefault();
          keyboardEvent.stopPropagation();
          openSearch(false);
          return true;
        }
        if (modifier && keyboardEvent.key.toLowerCase() === "h") {
          keyboardEvent.preventDefault();
          keyboardEvent.stopPropagation();
          openSearch(true);
          return true;
        }
        if (keyboardEvent.key === "Escape" && showSearch) {
          keyboardEvent.preventDefault();
          showSearch = false;
          showReplace = false;
          return true;
        }
        return false;
      };

      editorActions.setOnToggleMode(() =>
        handleModeChange(currentMode === "wysiwyg" ? "markdown" : "wysiwyg"),
      );

      // Modal handlers
      const handleImageInsert = async (
        src: string,
        alt: string,
        title?: string,
      ) => {
        if (editorActions) {
          // Restore cursor position before insertion
          await restoreCursorPosition();
          editorActions.image(src, alt, title);
        }
      };

      const handleLinkInsert = async (
        url: string,
        text: string,
        _title?: string,
      ) => {
        if (editorActions) {
          // Restore cursor position before insertion
          await restoreCursorPosition();
          editorActions.link(url, text);
        }
      };

      const handleTableInsert = async (rows: number, cols: number) => {
        if (editorActions) {
          // Restore cursor position before insertion and wait for it to complete
          await restoreCursorPosition();

          editorActions.table(rows, cols);
        }
      };

      const cursorTarget = () => ({
        mode: currentMode,
        contentEditable: editorActions?.getContentEditable() ?? null,
        textarea: editorActions?.getTextarea() ?? null,
      });

      const saveCursorPosition = () => cursorPositionStore.save(cursorTarget());

      const restoreCursorPosition = (): Promise<void> =>
        cursorPositionStore.restore(cursorTarget());

      // Table operations, keyed by the context-menu action name, all delegating
      // to the same DOMUtils functions used by EditorActions' cursor-based variants.
      const tableOperations: Record<
        string,
        (
          element: HTMLElement,
          cell: HTMLTableCellElement,
        ) => string
      > = {
        insertRowAbove: DOMUtils.insertRowAbove,
        insertRowBelow: DOMUtils.insertRowBelow,
        insertColumnLeft: DOMUtils.insertColumnLeft,
        insertColumnRight: DOMUtils.insertColumnRight,
        deleteRow: DOMUtils.deleteCurrentRow,
        deleteColumn: DOMUtils.deleteCurrentColumn,
        deleteTable: DOMUtils.deleteCurrentTable,
      };

      // Function to perform table operations with the saved context
      const performTableOperation = (operation: string): void => {
        if (!tableContextTarget || !editorActions) return;

        const contentEditable = editorActions.getContentEditable();
        if (!contentEditable) return;

        const cell = tableContextTarget as HTMLTableCellElement;
        const run = tableOperations[operation];
        if (!run) return;

        // Save scroll position
        const scrollTop = contentEditable.scrollTop;
        const scrollLeft = contentEditable.scrollLeft;

        try {
          const newContent = run(contentEditable, cell);
          onContentChange?.(newContent);

          // Restore scroll position
          setTimeout(() => {
            contentEditable.scrollTop = scrollTop;
            contentEditable.scrollLeft = scrollLeft;
          }, 10);
        } catch (error) {
          console.error("Table operation failed:", error);
        }
      };

      // Toolbar button click handler
      const handleToolbarAction = (
        action: string,
        button?: any,
        event?: Event,
      ) => {
        // Handle dropdown buttons
        if (button && isDropdownButton(button)) {
          if (action === "toggleHeading") {
            // Save cursor position before showing dropdown
            saveCursorPosition();

            const target = event?.target as HTMLElement;
            if (target) {
              const rect = target.getBoundingClientRect();
              // Use i18n heading options from the toolbar config
              const headingButton = currentToolbarGroups[0][0]; // First button in first group
              dropdownOptions = headingButton.dropdown || headingOptions;
              dropdownPosition = { x: rect.left, y: rect.bottom + 4 };
              dropdownTriggerElement = target;
              activeDropdownButton = button.name;
              showDropdown = true;
              m.redraw();
              return;
            }
          }
        }

        switch (action) {
          case "image":
            saveCursorPosition();
            showImageModal = true;
            m.redraw();
            break;
          case "link":
            saveCursorPosition();
            showLinkModal = true;
            m.redraw();
            break;
          case "table":
            saveCursorPosition();
            // Capture button position for table selector
            const target = event?.target as HTMLElement;
            if (target) {
              const rect = target.getBoundingClientRect();
              tableSelectorPosition = {
                x: rect.left + rect.width / 2,
                y: rect.bottom,
              };
            }
            showTableSelector = true;
            m.redraw();
            break;
          default:
            editorActions?.executeAction(action);
        }
      };

      // Handle dropdown selection
      const handleDropdownSelect = async (option: ToolbarButton) => {
        showDropdown = false;
        activeDropdownButton = null;

        if (editorActions) {
          // Restore cursor position before executing action
          await restoreCursorPosition();
          editorActions.executeAction(option.action);
        }
        m.redraw();
      };

      return m(
        ".md-wysiwyg-editor-wrapper",
        {
          "data-theme": theme,
          oncreate: (vnode: m.VnodeDOM) => {
            editorRoot = vnode.dom as HTMLElement;
          },
        },
        [
          toolbar &&
            m(".md-toolbar", [
              currentToolbarGroups
                .map((group, groupIndex) => [
                  ...group.map((button) => {
                    // Check if button should be disabled
                    let isDisabled = false;
                    if (button.action === "undo") {
                      isDisabled = !editorActions?.canUndo();
                    } else if (button.action === "redo") {
                      isDisabled = !editorActions?.canRedo();
                    }

                    return m("button", {
                      type: "button",
                      class: [
                        "md-toolbar-button",
                        isDropdownButton(button) ? "has-dropdown" : "",
                        isDropdownButton(button) &&
                        showDropdown &&
                        activeDropdownButton === button.name
                          ? "dropdown-open"
                          : "",
                        isDisabled ? "disabled" : "",
                      ]
                        .join(" ")
                        .trim(),
                      disabled: isDisabled,
                      title: `${button.title}${
                        button.shortcut ? ` (${button.shortcut})` : ""
                      }`,
                      onclick: (e: Event) => {
                        e.preventDefault();
                        if (!isDisabled) {
                          handleToolbarAction(button.action, button, e);
                        }
                      },
                      innerHTML: button.icon,
                    });
                  }),
                  // Add separator after each group except the last one
                  groupIndex < currentToolbarGroups.length - 1 &&
                    m(".md-toolbar-separator"),
                ])
                .flat()
                .filter(Boolean),
            ]),
          m(".md-editor-content-area", [
            showSearch &&
              m(
                ".md-search-panel",
                {
                  key: "search-panel",
                  onkeydown: (event: Event) => {
                    const keyboardEvent = event as KeyboardEvent;
                    const modifier =
                      keyboardEvent.metaKey || keyboardEvent.ctrlKey;
                    if (
                      modifier &&
                      ["f", "h"].includes(keyboardEvent.key.toLowerCase())
                    ) {
                      keyboardEvent.preventDefault();
                      keyboardEvent.stopPropagation();
                      openSearch(keyboardEvent.key.toLowerCase() === "h");
                    } else if (keyboardEvent.key === "Escape") {
                      keyboardEvent.preventDefault();
                      showSearch = false;
                      showReplace = false;
                    } else if (keyboardEvent.key === "Enter") {
                      keyboardEvent.preventDefault();
                      moveToMatch(keyboardEvent.shiftKey ? -1 : 1);
                    }
                  },
                },
                [
                  m(".md-search-row", [
                    m("input.md-search-input", {
                      type: "text",
                      value: searchQuery,
                      placeholder: t("find"),
                      "aria-label": t("find"),
                      oninput: (event: Event) => {
                        searchQuery = (event.target as HTMLInputElement).value;
                        activeMatch = -1;
                      },
                    }),
                    m(
                      "span.md-search-count",
                      searchResult.error
                        ? t("invalidExpression")
                        : matches.length
                          ? `${Math.max(activeMatch + 1, 1)} of ${matches.length}`
                          : t("noResults"),
                    ),
                    [
                      {
                        label: t("matchCase"),
                        text: "Aa",
                        key: "caseSensitive" as const,
                      },
                      {
                        label: t("matchWholeWord"),
                        text: "ab",
                        key: "wholeWord" as const,
                      },
                      {
                        label: t("useRegularExpression"),
                        text: ".*",
                        key: "regex" as const,
                      },
                    ].map((option) =>
                      m(
                        "button.md-search-option",
                        {
                          type: "button",
                          class: searchOptions[option.key] ? "active" : "",
                          title: option.label,
                          "aria-label": option.label,
                          "aria-pressed": searchOptions[option.key]
                            ? "true"
                            : "false",
                          onclick: () => {
                            searchOptions = {
                              ...searchOptions,
                              [option.key]: !searchOptions[option.key],
                            };
                            activeMatch = -1;
                          },
                        },
                        option.text,
                      ),
                    ),
                    m(
                      "button.md-search-action",
                      {
                        type: "button",
                        title: t("previousMatch"),
                        "aria-label": t("previousMatch"),
                        disabled: !matches.length,
                        onclick: () => moveToMatch(-1),
                      },
                      "↑",
                    ),
                    m(
                      "button.md-search-action",
                      {
                        type: "button",
                        title: t("nextMatch"),
                        "aria-label": t("nextMatch"),
                        disabled: !matches.length,
                        onclick: () => moveToMatch(1),
                      },
                      "↓",
                    ),
                    m(
                      "button.md-search-action",
                      {
                        type: "button",
                        title: showReplace
                          ? t("hideReplace")
                          : t("showReplace"),
                        "aria-label": showReplace
                          ? t("hideReplace")
                          : t("showReplace"),
                        "aria-expanded": showReplace ? "true" : "false",
                        onclick: () => {
                          showReplace = !showReplace;
                        },
                      },
                      "↔",
                    ),
                    m(
                      "button.md-search-action",
                      {
                        type: "button",
                        title: t("closeSearch"),
                        "aria-label": t("closeSearch"),
                        onclick: () => {
                          showSearch = false;
                          showReplace = false;
                        },
                      },
                      "×",
                    ),
                  ]),
                  showReplace &&
                    m(".md-search-row", [
                      m("input.md-replace-input", {
                        type: "text",
                        value: replacement,
                        placeholder: t("replace"),
                        "aria-label": t("replace"),
                        oninput: (event: Event) => {
                          replacement = (
                            event.target as HTMLInputElement
                          ).value;
                        },
                      }),
                      m(
                        "button.md-search-action",
                        {
                          type: "button",
                          disabled: !matches.length,
                          onclick: () => replaceMatches(false),
                        },
                        t("replace"),
                      ),
                      m(
                        "button.md-search-action",
                        {
                          type: "button",
                          disabled: !matches.length,
                          onclick: () => replaceMatches(true),
                        },
                        t("replaceAll"),
                      ),
                    ]),
                ],
              ),
            currentMode === "markdown"
              ? m(
                  ".md-markdown-editor-container",
                  {
                    key: "markdown-editor",
                  },
                  [
                    m("pre.md-syntax-highlight", {
                      oncreate: (vnode: m.VnodeDOM) => {
                        highlightPre = vnode.dom as HTMLElement;
                        updateHighlightOverlay(maskedMarkdown.display);
                      },
                      onupdate: () => {
                        updateHighlightOverlay(maskedMarkdown.display);
                      },
                    }),
                    m("textarea.md-markdown-area[name=markdown-area]", {
                      placeholder,
                      value: maskedMarkdown.display,
                      oninput: (e: Event) => {
                        const target = e.target as HTMLTextAreaElement;
                        handleContentChange(
                          applyMaskedMarkdownEdit(
                            markdownContent,
                            maskedMarkdown.display,
                            target.value,
                            maskedMarkdown.hiddenImages,
                          ),
                          "markdown",
                        );
                      },
                      onkeydown: (e: Event) => {
                        if (handleEditorKeyDown(e)) return;
                        const target = e.target as HTMLTextAreaElement;
                        editorActions?.handleKeyDown(e);
                        // Force the view to catch up with the DOM mutation
                        // handleKeyDown may have just made (e.g. continuing a
                        // list on Enter) within this same tick, rather than
                        // waiting for Mithril's usual rAF-deferred redraw.
                        // Without this, a later redraw can momentarily diff
                        // against stale state and disturb focus/selection,
                        // leaving the textarea looking like it needs a click
                        // before typing continues.
                        m.redraw.sync();
                        target.focus();
                      },
                      onpaste: (e: Event) => editorActions?.handlePaste(e),
                      oncopy: handleMarkdownCopy,
                      oncreate: (vnode: m.VnodeDOM) => {
                        const textarea = vnode.dom as HTMLTextAreaElement;
                        editorActions?.setTextarea(textarea);
                        markdownTextarea = textarea;
                        const markdownIndex = pendingMarkdownPageBreakBoundary
                          ? markdownIndexForPageBreakBoundary(
                              markdownContent,
                              pendingMarkdownPageBreakBoundary,
                            )
                          : pendingMarkdownIndex;
                        if (markdownIndex !== null) {
                          const displayIndex = sourceIndexToDisplayIndex(
                            maskedMarkdown.display,
                            markdownIndex,
                            maskedMarkdown.hiddenImages,
                          );
                          textarea.setSelectionRange(displayIndex, displayIndex);
                          textarea.focus();
                        }
                        pendingMarkdownIndex = null;
                        pendingMarkdownPageBreakBoundary = null;
                        if (pendingModeScroll) {
                          textarea.scrollTop = pendingModeScroll.top;
                          textarea.scrollLeft = pendingModeScroll.left;
                          if (highlightPre) {
                            highlightPre.scrollTop = pendingModeScroll.top;
                            highlightPre.scrollLeft = pendingModeScroll.left;
                          }
                          pendingModeScroll = null;
                        }
                      },
                      onscroll: () => {
                        if (highlightPre && markdownTextarea) {
                          highlightPre.scrollTop = markdownTextarea.scrollTop;
                          highlightPre.scrollLeft = markdownTextarea.scrollLeft;
                        }
                      },
                    }),
                  ],
                )
              : m("div.md-editable-area", {
                  key: "wysiwyg-editor",
                  contenteditable: true,
                  "data-placeholder": placeholder,
                  oninput: (e: Event) => {
                    const target = e.target as HTMLElement;
                    handleContentChange(target.innerHTML, "wysiwyg");
                  },
                  onkeydown: (e: Event) => {
                    if (!handleEditorKeyDown(e)) editorActions?.handleKeyDown(e);
                  },
                  oncontextmenu: (e: MouseEvent) => {
                    // Check if we're right-clicking on a table
                    const target = e.target as HTMLElement;
                    const table = target.closest("table");
                    if (table && currentMode === "wysiwyg") {
                      e.preventDefault();
                      e.stopPropagation();

                      // Save the specific target element (cell) that was clicked
                      tableContextTarget = target.closest("td, th") || target;

                      // Save cursor position before showing table menu
                      saveCursorPosition();

                      // Close any existing dropdown first
                      showDropdown = false;
                      activeDropdownButton = null;

                      // Show table menu
                      showTableMenu = true;
                      tableMenuPosition = { x: e.clientX, y: e.clientY };
                      m.redraw();
                      return false; // Prevent default context menu
                    }
                  },
                  onclick: (e: MouseEvent) => {
                    // Close menus when clicking within the editor content area
                    // Don't propagate this event to parent elements
                    e.stopPropagation();

                    let needsRedraw = false;

                    if (showTableMenu) {
                      showTableMenu = false;
                      needsRedraw = true;
                    }

                    if (showDropdown) {
                      showDropdown = false;
                      activeDropdownButton = null;
                      needsRedraw = true;
                    }

                    if (needsRedraw) {
                      m.redraw();
                    }
                  },
                  oncreate: (vnode: m.VnodeDOM) => {
                    const element = vnode.dom as HTMLElement;
                    element.innerHTML = wysiwygContent;
                    editorActions?.setContentEditable(element);
                    if (pendingPageBreakBoundary) {
                      selectPageBreakBoundary(element, pendingPageBreakBoundary);
                      pendingPageBreakBoundary = null;
                    } else if (pendingTextOffset !== null) {
                      selectTextRange(
                        element,
                        pendingTextOffset,
                        pendingTextOffset,
                      );
                      pendingTextOffset = null;
                    }
                    if (pendingModeScroll) {
                      element.scrollTop = pendingModeScroll.top;
                      element.scrollLeft = pendingModeScroll.left;
                      pendingModeScroll = null;
                    }
                  },
                  onupdate: (vnode: m.VnodeDOM) => {
                    const element = vnode.dom as HTMLElement;
                    // Only update if the content is actually different and there's no active selection
                    // This prevents cursor position loss during typing
                    if (
                      element.innerHTML !== wysiwygContent &&
                      !document.getSelection()?.rangeCount
                    ) {
                      element.innerHTML = wysiwygContent;
                    }
                  },
                }),
          ].filter(Boolean)),
          showTabs &&
            m(".md-tabs", [
              m(
                "button.md-tab-button",
                {
                  type: "button",
                  class: currentMode === "wysiwyg" ? "active" : "",
                  onclick: () => handleModeChange("wysiwyg"),
                },
                t("wysiwyg"),
              ),
              m(
                "button.md-tab-button",
                {
                  type: "button",
                  class: currentMode === "markdown" ? "active" : "",
                  onclick: () => handleModeChange("markdown"),
                },
                t("markdown"),
              ),
            ]),
          isPreview &&
            m(".editor-preview", {
              innerHTML:
                currentMode === "markdown"
                  ? highlightCodeBlocks(
                      safeMarkdownToHtml(markdownContent, markdownToHtml),
                    )
                  : wysiwygContent,
            }),

          // Modals
          m(ImageModal, {
            isOpen: showImageModal,
            t,
            onClose: () => {
              showImageModal = false;
              m.redraw();
            },
            onInsert: handleImageInsert,
          }),

          m(LinkModal, {
            isOpen: showLinkModal,
            t,
            onClose: () => {
              showLinkModal = false;
              m.redraw();
            },
            onInsert: handleLinkInsert,
          }),

          m(TableSelector, {
            isOpen: showTableSelector,
            position: tableSelectorPosition,
            t,
            onClose: () => {
              showTableSelector = false;
              m.redraw();
            },
            onSelect: handleTableInsert,
          }),

          m(TableMenu, {
            isVisible: showTableMenu,
            position: tableMenuPosition,
            t,
            onClose: () => {
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
            onInsertRowAbove: () => {
              performTableOperation("insertRowAbove");
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
            onInsertRowBelow: () => {
              performTableOperation("insertRowBelow");
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
            onInsertColumnLeft: () => {
              performTableOperation("insertColumnLeft");
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
            onInsertColumnRight: () => {
              performTableOperation("insertColumnRight");
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
            onDeleteRow: () => {
              performTableOperation("deleteRow");
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
            onDeleteColumn: () => {
              performTableOperation("deleteColumn");
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
            onDeleteTable: () => {
              performTableOperation("deleteTable");
              showTableMenu = false;
              tableContextTarget = null;
              m.redraw();
            },
          }),

          m(DropdownMenu, {
            isVisible: showDropdown,
            position: dropdownPosition,
            options: dropdownOptions,
            triggerElement: dropdownTriggerElement,
            onClose: () => {
              showDropdown = false;
              activeDropdownButton = null;
              m.redraw();
            },
            onSelect: handleDropdownSelect,
          }),
        ],
      );
    },
  };
};
