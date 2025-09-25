import m, { Component, Vnode } from "mithril";

const ICON_TABLE_INSERT_ROW_ABOVE = `<svg viewBox="0 0 24 24" fill="none"><g fill="#4a90e2"><rect x="3" y="10" width="5" height="3" rx=".5"/><rect x="9" y="10" width="5" height="3" rx=".5"/><rect x="15" y="10" width="5" height="3" rx=".5"/></g><g fill="#999"><rect x="3" y="15" width="5" height="3" rx=".5"/><rect x="9" y="15" width="5" height="3" rx=".5"/><rect x="15" y="15" width="5" height="3" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 8V4M10 5l2-2 2 2"/></svg>`;
const ICON_TABLE_INSERT_ROW_BELOW = `<svg viewBox="0 0 24 24" fill="none"><g fill="#999"><rect x="3" y="6" width="5" height="3" rx=".5"/><rect x="9" y="6" width="5" height="3" rx=".5"/><rect x="15" y="6" width="5" height="3" rx=".5"/></g><g fill="#4a90e2"><rect x="3" y="11" width="5" height="3" rx=".5"/><rect x="9" y="11" width="5" height="3" rx=".5"/><rect x="15" y="11" width="5" height="3" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 16v4M10 19l2 2 2-2"/></svg>`;
const ICON_TABLE_INSERT_COL_LEFT = `<svg viewBox="0 0 24 24" fill="none"><g fill="#4a90e2"><rect x="9" y="6" width="3" height="4" rx=".5"/><rect x="9" y="11" width="3" height="4" rx=".5"/><rect x="9" y="16" width="3" height="4" rx=".5"/></g><g fill="#999"><rect x="14" y="6" width="3" height="4" rx=".5"/><rect x="14" y="11" width="3" height="4" rx=".5"/><rect x="14" y="16" width="3" height="4" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 12H3M4 10l-2 2 2 2"/></svg>`;
const ICON_TABLE_INSERT_COL_RIGHT = `<svg viewBox="0 0 24 24" fill="none"><g fill="#999"><rect x="7" y="6" width="3" height="4" rx=".5"/><rect x="7" y="11" width="3" height="4" rx=".5"/><rect x="7" y="16" width="3" height="4" rx=".5"/></g><g fill="#4a90e2"><rect x="12" y="6" width="3" height="4" rx=".5"/><rect x="12" y="11" width="3" height="4" rx=".5"/><rect x="12" y="16" width="3" height="4" rx=".5"/></g><path stroke="#4a90e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17 12h4M20 10l2 2-2 2"/></svg>`;

export interface TableMenuAttrs {
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onInsertRowAbove: () => void;
  onInsertRowBelow: () => void;
  onInsertColumnLeft: () => void;
  onInsertColumnRight: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  onDeleteTable: () => void;
}

interface TableMenuState {
  // No state needed for this component
}

export const TableMenu: Component<TableMenuAttrs, TableMenuState> = {
  view: ({ attrs }): Vnode => {
    if (!attrs.isVisible) return m("");

    const menuItems = [
      {
        label: "Insert Row Above",
        action: attrs.onInsertRowAbove,
        icon: ICON_TABLE_INSERT_ROW_ABOVE,
      },
      {
        label: "Insert Row Below",
        action: attrs.onInsertRowBelow,
        icon: ICON_TABLE_INSERT_ROW_BELOW,
      },
      { type: "separator" },
      {
        label: "Insert Column Left",
        action: attrs.onInsertColumnLeft,
        icon: ICON_TABLE_INSERT_COL_LEFT,
      },
      {
        label: "Insert Column Right",
        action: attrs.onInsertColumnRight,
        icon: ICON_TABLE_INSERT_COL_RIGHT,
      },
      { type: "separator" },
      {
        label: "Delete Row",
        action: attrs.onDeleteRow,
        icon: "✕",
        danger: true,
      },
      {
        label: "Delete Column",
        action: attrs.onDeleteColumn,
        icon: "✕",
        danger: true,
      },
      { type: "separator" },
      {
        label: "Delete Table",
        action: attrs.onDeleteTable,
        icon: "🗑",
        danger: true,
      },
    ];

    return m(
      ".table-context-menu",
      {
        style: {
          left: `${attrs.position.x}px`,
          top: `${attrs.position.y}px`,
        },
      },
      [
        m(
          ".table-menu-backdrop",
          {
            onclick: attrs.onClose,
            oncontextmenu: (e: MouseEvent) => {
              e.preventDefault();
              attrs.onClose();
            },
          },
          m(
            ".table-menu-content",
            menuItems.map((item) => {
              if (item.type === "separator") {
                return m(".table-menu-separator");
              }

              return m(
                ".table-menu-item",
                {
                  class: item.danger ? "danger" : "",
                  onclick: (e: MouseEvent) => {
                    console.log("Clicked .table-menu-item");
                    e.preventDefault();
                    e.stopPropagation();
                    item.action && item.action();
                    attrs.onClose();
                  },
                  onkeydown: (e: KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      item.action && item.action();
                      attrs.onClose();
                    }
                  },
                  tabindex: 0,
                },
                [
                  item.icon && m(".table-menu-icon", m.trust(item.icon)),
                  m(".table-menu-label", item.label),
                ],
              );
            }),
          ),
        ),
      ],
    );
  },
};
