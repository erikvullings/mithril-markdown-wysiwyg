import m, { type FactoryComponent } from "mithril";
import { MarkdownEditorAttrs, ToolbarButton } from "./types";
import {
  toolbarButtonGroups,
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

export const MarkdownEditor: FactoryComponent<MarkdownEditorAttrs> = () => {
  let wysiwygContent = "";
  let markdownContent = "";
  let initialized = false;
  let editorActions: EditorActions | null = null;
  let internalMode: "wysiwyg" | "markdown" | null = null;
  // Scoped to this editor instance, so multiple editors on one page don't
  // clobber each other's saved cursor/scroll position.
  const cursorPositionStore = createCursorPositionStore();

  // Helper function to safely render markdown with empty content check
  const safeMarkdownToHtml = (
    markdown: string,
    markdownToHtml?: (markdown: string) => string,
  ): string => {
    if (!markdown || markdown.trim() === "") {
      return "";
    }
    return markdownToHtml
      ? markdownToHtml(markdown)
      : markdownToWysiwygHtml(markdown);
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
      } = attrs;

      // Initialize mode and content on first render
      if (!initialized) {
        // Set initial internal mode if onModeChange is not provided
        if (!onModeChange) {
          internalMode = mode;
        }

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
          onContentChange?.(markdownContent);
        } else {
          markdownContent = newContent;
          wysiwygContent = safeMarkdownToHtml(newContent, markdownToHtml);
          onContentChange?.(markdownContent);
        }
      };

      if (!editorActions) {
        editorActions = new EditorActions((newContent: string) => {
          handleContentChange(newContent, currentMode);
        });
      }
      editorActions.setMode(currentMode);

      const handleModeChange = (newMode: "wysiwyg" | "markdown") => {
        if (newMode !== currentMode) {
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
          }

          // Update internal mode if no external mode management
          if (!onModeChange) {
            internalMode = newMode;
          }

          editorActions?.setMode(newMode);
          onModeChange?.(newMode);
        }
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
        title?: string,
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
            currentMode === "markdown"
              ? m(
                  ".md-markdown-editor-container",
                  {
                    key: "markdown-editor",
                    style: { display: "flex" },
                  },
                  m("textarea.md-markdown-area[name=markdown-area]", {
                    placeholder,
                    value: markdownContent,
                    oninput: (e: Event) => {
                      const target = e.target as HTMLTextAreaElement;
                      handleContentChange(target.value, "markdown");
                    },
                    oncreate: (vnode: m.VnodeDOM) => {
                      editorActions?.setTextarea(
                        vnode.dom as HTMLTextAreaElement,
                      );
                    },
                  }),
                )
              : m("div.md-editable-area", {
                  key: "wysiwyg-editor",
                  contenteditable: true,
                  "data-placeholder": placeholder,
                  oninput: (e: Event) => {
                    const target = e.target as HTMLElement;
                    handleContentChange(target.innerHTML, "wysiwyg");
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
          ]),
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
                  ? safeMarkdownToHtml(markdownContent, markdownToHtml)
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
