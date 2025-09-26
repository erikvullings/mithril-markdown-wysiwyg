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
import { createI18n } from "./i18n";

// Global cursor position storage to persist across re-renders
const cursorPositionStorage = {
  savedSelection: null as { start: number; end: number } | null,
  savedRange: null as Range | null,
  savedRangeInfo: null as {
    startContainer: Node;
    startOffset: number;
    endContainer: Node;
    endOffset: number;
  } | null,
  savedScrollPosition: null as { top: number; left: number } | null,
};

export const MarkdownEditor: FactoryComponent<MarkdownEditorAttrs> = () => {
  let wysiwygContent = "";
  let markdownContent = "";
  let initialized = false;
  let editorActions: EditorActions | null = null;
  let internalMode: "wysiwyg" | "markdown" | null = null;

  // Helper function to safely render markdown with empty content check
  const safeMarkdownToHtml = (
    markdown: string,
    markdownToHtml?: (markdown: string) => string,
  ): string => {
    if (!markdown || markdown.trim() === "") {
      return "";
    }
    return markdownToHtml ? markdownToHtml(markdown) : markdown;
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
  let savedTableScrollPosition: { top: number; left: number } | null = null;

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

      // Function to save current cursor position
      const saveCursorPosition = () => {
        // Save scroll position for both modes
        const contentEditable = (editorActions as any)?.contentEditable;
        const textarea = editorActions?.getTextarea();
        const scrollElement =
          currentMode === "wysiwyg" ? contentEditable : textarea;

        if (scrollElement) {
          cursorPositionStorage.savedScrollPosition = {
            top: scrollElement.scrollTop,
            left: scrollElement.scrollLeft,
          };
          console.log("🔄 Saved scroll position:", {
            mode: currentMode,
            scrollTop: scrollElement.scrollTop,
            scrollLeft: scrollElement.scrollLeft,
            elementType: scrollElement.tagName,
          });
        } else {
          console.log("❌ No scroll element found for mode:", currentMode);
        }

        if (
          currentMode === "markdown" &&
          document.activeElement instanceof HTMLTextAreaElement
        ) {
          const textarea = document.activeElement;
          cursorPositionStorage.savedSelection = {
            start: textarea.selectionStart,
            end: textarea.selectionEnd,
          };
        } else if (currentMode === "wysiwyg") {
          const selection = document.getSelection();

          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            // Clone the range to preserve it
            cursorPositionStorage.savedRange = range.cloneRange();

            // Also save the container and offset information separately
            cursorPositionStorage.savedRangeInfo = {
              startContainer: range.startContainer,
              startOffset: range.startOffset,
              endContainer: range.endContainer,
              endOffset: range.endOffset,
            };
          }
        }
      };

      // Function to restore cursor position
      const restoreCursorPosition = (): Promise<void> => {
        return new Promise((resolve) => {
          if (
            currentMode === "markdown" &&
            cursorPositionStorage.savedSelection
          ) {
            const textarea = editorActions?.getTextarea();
            if (textarea) {
              setTimeout(() => {
                textarea.setSelectionRange(
                  cursorPositionStorage.savedSelection!.start,
                  cursorPositionStorage.savedSelection!.end,
                );
                textarea.focus();
                resolve();
              }, 0);
            } else {
              resolve(); // No saved selection to restore
            }
          } else if (
            currentMode === "wysiwyg" &&
            cursorPositionStorage.savedRange
          ) {
            // Use a longer timeout and ensure the contentEditable is focused first
            setTimeout(() => {
              if (editorActions) {
                const contentEditable = (editorActions as any).contentEditable;

                if (contentEditable) {
                  contentEditable.focus();

                  const selection = document.getSelection();

                  if (selection && cursorPositionStorage.savedRange) {
                    try {
                      // Clear existing selections
                      selection.removeAllRanges();

                      // Create a new range with the saved information
                      const newRange = document.createRange();

                      // Try to restore using the saved range info
                      if (
                        cursorPositionStorage.savedRangeInfo &&
                        cursorPositionStorage.savedRangeInfo.startContainer
                          .parentNode &&
                        contentEditable.contains(
                          cursorPositionStorage.savedRangeInfo.startContainer,
                        )
                      ) {
                        newRange.setStart(
                          cursorPositionStorage.savedRangeInfo.startContainer,
                          Math.min(
                            cursorPositionStorage.savedRangeInfo.startOffset,
                            cursorPositionStorage.savedRangeInfo.startContainer
                              .textContent?.length || 0,
                          ),
                        );

                        if (
                          cursorPositionStorage.savedRangeInfo.endContainer
                            .parentNode &&
                          contentEditable.contains(
                            cursorPositionStorage.savedRangeInfo.endContainer,
                          )
                        ) {
                          newRange.setEnd(
                            cursorPositionStorage.savedRangeInfo.endContainer,
                            Math.min(
                              cursorPositionStorage.savedRangeInfo.endOffset,
                              cursorPositionStorage.savedRangeInfo.endContainer
                                .textContent?.length || 0,
                            ),
                          );
                        } else {
                          newRange.collapse(true);
                        }
                        selection.addRange(newRange);
                      } else {
                        // Fallback: place cursor at the end
                        newRange.selectNodeContents(contentEditable);
                        newRange.collapse(false);
                        selection.addRange(newRange);
                      }
                    } catch (error) {
                      console.warn(
                        "❌ Failed to restore cursor position:",
                        error,
                      );
                      // Final fallback: place cursor at end
                      const range = document.createRange();
                      range.selectNodeContents(contentEditable);
                      range.collapse(false);
                      selection.removeAllRanges();
                      selection.addRange(range);
                    }
                  }
                }
              }

              // Restore scroll position
              if (cursorPositionStorage.savedScrollPosition) {
                const contentEditable = (editorActions as any)?.contentEditable;
                if (contentEditable) {
                  console.log("🔄 Restoring scroll position (WYSIWYG):", {
                    savedTop: cursorPositionStorage.savedScrollPosition.top,
                    savedLeft: cursorPositionStorage.savedScrollPosition.left,
                    currentTop: contentEditable.scrollTop,
                    currentLeft: contentEditable.scrollLeft,
                  });
                  contentEditable.scrollTop =
                    cursorPositionStorage.savedScrollPosition.top;
                  contentEditable.scrollLeft =
                    cursorPositionStorage.savedScrollPosition.left;
                  console.log("🔄 After restore:", {
                    newTop: contentEditable.scrollTop,
                    newLeft: contentEditable.scrollLeft,
                  });
                } else {
                  console.log("❌ No contentEditable found for scroll restore");
                }
              } else {
                console.log("❌ No saved scroll position to restore");
              }

              cursorPositionStorage.savedSelection = null;
              cursorPositionStorage.savedRange = null;
              cursorPositionStorage.savedRangeInfo = null;
              cursorPositionStorage.savedScrollPosition = null;
              resolve();
            }, 10); // Slightly longer timeout for better reliability
          }

          // Only clean up immediately for non-WYSIWYG modes
          // For WYSIWYG, cleanup happens after the async restore completes
          if (currentMode !== "wysiwyg" || !cursorPositionStorage.savedRange) {
            // Restore scroll position for markdown mode
            if (cursorPositionStorage.savedScrollPosition) {
              const textarea = editorActions?.getTextarea();
              if (textarea) {
                console.log("🔄 Restoring scroll position (Markdown):", {
                  savedTop: cursorPositionStorage.savedScrollPosition.top,
                  savedLeft: cursorPositionStorage.savedScrollPosition.left,
                  currentTop: textarea.scrollTop,
                  currentLeft: textarea.scrollLeft,
                });
                textarea.scrollTop =
                  cursorPositionStorage.savedScrollPosition.top;
                textarea.scrollLeft =
                  cursorPositionStorage.savedScrollPosition.left;
                console.log("🔄 After restore (Markdown):", {
                  newTop: textarea.scrollTop,
                  newLeft: textarea.scrollLeft,
                });
              } else {
                console.log("❌ No textarea found for scroll restore");
              }
            } else {
              console.log("❌ No saved scroll position to restore (Markdown)");
            }

            cursorPositionStorage.savedSelection = null;
            cursorPositionStorage.savedRange = null;
            cursorPositionStorage.savedRangeInfo = null;
            cursorPositionStorage.savedScrollPosition = null;
            resolve();
          }
        }); // Close the Promise
      };

      // Function to perform table operations with the saved context
      const performTableOperation = (operation: string): void => {
        if (!tableContextTarget || !editorActions) return;

        const contentEditable = (editorActions as any).contentEditable;
        if (!contentEditable) return;

        // Get the table and cell info from our saved context
        const cell = tableContextTarget as HTMLTableCellElement;
        const table = cell.closest("table") as HTMLTableElement;
        if (!table) return;

        // Save scroll position
        const scrollTop = contentEditable.scrollTop;
        const scrollLeft = contentEditable.scrollLeft;

        try {
          switch (operation) {
            case "insertRowAbove": {
              const row = cell.closest("tr") as HTMLTableRowElement;
              const rowIndex = Array.from(table.rows).indexOf(row);
              const cellCount = row.cells.length;
              const newRow = table.insertRow(rowIndex);
              for (let i = 0; i < cellCount; i++) {
                const newCell = newRow.insertCell(i);
                newCell.innerHTML = "&nbsp;";
                // If first row has th elements, make this a th too
                if (rowIndex === 0 && row.querySelector("th")) {
                  const th = document.createElement("th");
                  th.innerHTML = "&nbsp;";
                  newCell.parentNode?.replaceChild(th, newCell);
                }
              }
              break;
            }
            case "insertRowBelow": {
              const row = cell.closest("tr") as HTMLTableRowElement;
              const rowIndex = Array.from(table.rows).indexOf(row);
              const cellCount = row.cells.length;
              const newRow = table.insertRow(rowIndex + 1);
              for (let i = 0; i < cellCount; i++) {
                const newCell = newRow.insertCell(i);
                newCell.innerHTML = "&nbsp;";
              }
              break;
            }
            case "insertColumnLeft": {
              const row = cell.closest("tr") as HTMLTableRowElement;
              const colIndex = Array.from(row.cells).indexOf(cell);
              for (let i = 0; i < table.rows.length; i++) {
                const currentRow = table.rows[i];
                const newCell = currentRow.insertCell(colIndex);
                newCell.innerHTML = "&nbsp;";
                // If it's the first row and contains th elements, make this a th too
                if (i === 0 && currentRow.querySelector("th")) {
                  const th = document.createElement("th");
                  th.innerHTML = "&nbsp;";
                  newCell.parentNode?.replaceChild(th, newCell);
                }
              }
              break;
            }
            case "insertColumnRight": {
              const row = cell.closest("tr") as HTMLTableRowElement;
              const colIndex = Array.from(row.cells).indexOf(cell);
              for (let i = 0; i < table.rows.length; i++) {
                const currentRow = table.rows[i];
                const newCell = currentRow.insertCell(colIndex + 1);
                newCell.innerHTML = "&nbsp;";
                // If it's the first row and contains th elements, make this a th too
                if (i === 0 && currentRow.querySelector("th")) {
                  const th = document.createElement("th");
                  th.innerHTML = "&nbsp;";
                  newCell.parentNode?.replaceChild(th, newCell);
                }
              }
              break;
            }
            case "deleteRow": {
              const row = cell.closest("tr") as HTMLTableRowElement;
              if (table.rows.length > 1) {
                row.remove();
              }
              break;
            }
            case "deleteColumn": {
              const row = cell.closest("tr") as HTMLTableRowElement;
              const colIndex = Array.from(row.cells).indexOf(cell);
              if (table.rows.length > 0 && table.rows[0].cells.length > 1) {
                for (let i = 0; i < table.rows.length; i++) {
                  if (table.rows[i].cells[colIndex]) {
                    table.rows[i].deleteCell(colIndex);
                  }
                }
              }
              break;
            }
            case "deleteTable": {
              table.remove();
              break;
            }
          }

          // Notify content change
          onContentChange?.(contentEditable.innerHTML);

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

                      // Save scroll position before showing table menu
                      if (editorActions) {
                        const contentEditable = (editorActions as any)
                          .contentEditable;
                        if (contentEditable) {
                          savedTableScrollPosition = {
                            top: contentEditable.scrollTop,
                            left: contentEditable.scrollLeft,
                          };
                        }
                      }

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
            onClose: () => {
              showImageModal = false;
              m.redraw();
            },
            onInsert: handleImageInsert,
          }),

          m(LinkModal, {
            isOpen: showLinkModal,
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
              savedTableScrollPosition = null;
              m.redraw();
            },
            onInsertRowAbove: () => {
              performTableOperation("insertRowAbove");
              showTableMenu = false;
              tableContextTarget = null;
              savedTableScrollPosition = null;
              m.redraw();
            },
            onInsertRowBelow: () => {
              performTableOperation("insertRowBelow");
              showTableMenu = false;
              tableContextTarget = null;
              savedTableScrollPosition = null;
              m.redraw();
            },
            onInsertColumnLeft: () => {
              performTableOperation("insertColumnLeft");
              showTableMenu = false;
              tableContextTarget = null;
              savedTableScrollPosition = null;
              m.redraw();
            },
            onInsertColumnRight: () => {
              performTableOperation("insertColumnRight");
              showTableMenu = false;
              tableContextTarget = null;
              savedTableScrollPosition = null;
              m.redraw();
            },
            onDeleteRow: () => {
              performTableOperation("deleteRow");
              showTableMenu = false;
              tableContextTarget = null;
              savedTableScrollPosition = null;
              m.redraw();
            },
            onDeleteColumn: () => {
              performTableOperation("deleteColumn");
              showTableMenu = false;
              tableContextTarget = null;
              savedTableScrollPosition = null;
              m.redraw();
            },
            onDeleteTable: () => {
              performTableOperation("deleteTable");
              showTableMenu = false;
              tableContextTarget = null;
              savedTableScrollPosition = null;
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
