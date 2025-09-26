import m from "mithril";
import type { I18nStrings } from "../i18n";

export interface TableSelectorAttrs {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (rows: number, cols: number) => void;
  maxRows?: number;
  maxCols?: number;
  position?: { x: number; y: number };
  t: (key: keyof I18nStrings) => string;
}

interface TableSelectorState {
  hoverRows: number;
  hoverCols: number;
}

export const TableSelector: m.Component<TableSelectorAttrs> = {
  oninit: ({ state }: m.Vnode<TableSelectorAttrs, TableSelectorState>) => {
    state.hoverRows = 0;
    state.hoverCols = 0;
  },

  view: ({ state, attrs }: m.Vnode<TableSelectorAttrs, TableSelectorState>) => {
    const {
      isOpen,
      onClose,
      onSelect,
      maxRows = 8,
      maxCols = 8,
      position,
      t,
    } = attrs;

    if (!isOpen) return null;

    const handleCellHover = (row: number, col: number) => {
      state.hoverRows = row;
      state.hoverCols = col;
    };

    const handleCellClick = (row: number, col: number) => {
      onSelect(row, col);
      onClose();
    };

    const handleBackdropClick = (e: Event) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const cellStyle = (row: number, col: number) => ({
      width: "20px",
      height: "20px",
      border: "1px solid var(--border-color, #ddd)",
      backgroundColor:
        row <= state.hoverRows && col <= state.hoverCols
          ? "var(--primary-color, #007bff)"
          : "var(--cell-bg, white)",
      cursor: "pointer",
      transition: "background-color 0.1s ease",
    });

    return m(
      ".md-table-selector-overlay",
      {
        onclick: handleBackdropClick,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      },
      [
        m(
          ".md-table-selector",
          {
            style: {
              position: "absolute",
              backgroundColor: "var(--bg-color, white)",
              border: "1px solid var(--border-color, #ddd)",
              borderRadius: "6px",
              padding: "15px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              zIndex: 1000,
              // Position it relative to the toolbar button if position is provided
              ...(position
                ? {
                    left: `${position.x}px`,
                    top: `${position.y + 10}px`, // Offset below the button
                    transform: "translateX(-50%)", // Center horizontally on the button
                  }
                : {
                    top: "50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }),
            },
            onclick: (e: Event) => e.stopPropagation(),
          },
          [
            // Header
            m(
              ".md-table-selector-header",
              {
                style: {
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--text-color, #333)",
                  textAlign: "center",
                },
              },
              [
                state.hoverRows > 0 && state.hoverCols > 0
                  ? t("tableSelectSize")
                      .replace("{rows}", state.hoverRows.toString())
                      .replace("{cols}", state.hoverCols.toString())
                  : t("tableSelectSizeDefault"),
              ],
            ),

            // Grid
            m(
              ".md-table-grid",
              {
                style: {
                  display: "grid",
                  gridTemplateRows: `repeat(${maxRows}, 20px)`,
                  gridTemplateColumns: `repeat(${maxCols}, 20px)`,
                  gap: "2px",
                  marginBottom: "10px",
                },
              },
              // Generate grid cells
              Array.from({ length: maxRows }, (_, row) =>
                Array.from({ length: maxCols }, (_, col) =>
                  m(".md-table-cell", {
                    style: cellStyle(row + 1, col + 1),
                    onmouseover: () => handleCellHover(row + 1, col + 1),
                    onclick: () => handleCellClick(row + 1, col + 1),
                    key: `${row}-${col}`,
                  }),
                ),
              ).flat(),
            ),

            // Footer with custom size option
            m(
              ".md-table-selector-footer",
              {
                style: {
                  borderTop: "1px solid var(--border-color, #e0e0e0)",
                  paddingTop: "10px",
                  fontSize: "12px",
                  color: "var(--text-muted, #666)",
                  textAlign: "center",
                },
              },
              [
                m("div", t("tableClickToInsert")),
                m(
                  "button",
                  {
                    style: {
                      marginTop: "5px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      border: "1px solid var(--border-color, #ddd)",
                      backgroundColor: "var(--button-bg, #f5f5f5)",
                      color: "var(--text-color, #333)",
                      borderRadius: "3px",
                      cursor: "pointer",
                    },
                    onclick: () => {
                      const rows = prompt(t("tableCustomRowsPrompt"), "3");
                      const cols = prompt(t("tableCustomColsPrompt"), "3");
                      if (rows && cols) {
                        const numRows = parseInt(rows);
                        const numCols = parseInt(cols);
                        if (
                          numRows > 0 &&
                          numCols > 0 &&
                          numRows <= 20 &&
                          numCols <= 20
                        ) {
                          onSelect(numRows, numCols);
                          onClose();
                        }
                      }
                    },
                  },
                  t("tableCustomSize"),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  },
};
