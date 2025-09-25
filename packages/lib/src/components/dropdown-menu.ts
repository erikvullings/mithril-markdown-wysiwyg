import m, { Component, Vnode } from "mithril";
import { ToolbarButton } from "../types";

export interface DropdownMenuAttrs {
  isVisible: boolean;
  position: { x: number; y: number };
  options: ToolbarButton[];
  onClose: () => void;
  onSelect: (option: ToolbarButton) => void;
  triggerElement: HTMLElement | null;
}

interface DropdownMenuState {
  selectedIndex: number;
}

export const DropdownMenu: Component<DropdownMenuAttrs, DropdownMenuState> = {
  oninit: ({ state }) => {
    state.selectedIndex = -1;
  },

  oncreate: ({ attrs, state, dom }) => {
    if (attrs.isVisible) {
      // Add keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!attrs.isVisible) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            state.selectedIndex = Math.min(
              state.selectedIndex + 1,
              attrs.options.length - 1,
            );
            m.redraw();
            break;
          case "ArrowUp":
            e.preventDefault();
            state.selectedIndex = Math.max(state.selectedIndex - 1, 0);
            m.redraw();
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            if (
              state.selectedIndex >= 0 &&
              state.selectedIndex < attrs.options.length
            ) {
              attrs.onSelect(attrs.options[state.selectedIndex]);
            }
            break;
          case "Escape":
            e.preventDefault();
            attrs.onClose();
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      // Cleanup on component destroy
      (dom as any)._keydownHandler = handleKeyDown;
    }
  },

  onremove: ({ dom }) => {
    const handler = (dom as any)._keydownHandler;
    if (handler) {
      document.removeEventListener("keydown", handler);
    }
  },

  view: ({ attrs, state }): Vnode => {
    if (!attrs.isVisible || attrs.options.length === 0) {
      return m("");
    }

    // Calculate position relative to trigger element if provided
    let menuPosition = attrs.position;
    if (attrs.triggerElement) {
      const rect = attrs.triggerElement.getBoundingClientRect();
      menuPosition = {
        x: rect.left,
        y: rect.bottom + 4, // Small gap below the trigger
      };
    }

    return m(
      ".dropdown-menu-container",
      {
        style: {
          position: "fixed",
          left: `${menuPosition.x}px`,
          top: `${menuPosition.y}px`,
          zIndex: 1000,
        },
        onclick: (e: MouseEvent) => {
          e.stopPropagation();
        },
      },
      [
        m(".dropdown-backdrop", {
          onclick: (e: MouseEvent) => {
            attrs.onClose();
          },
          oncontextmenu: (e: MouseEvent) => {
            e.preventDefault();
            attrs.onClose();
          },
        }),
        m(
          ".dropdown-menu-content",
          attrs.options.map((option, index) => {
            const isSelected = index === state.selectedIndex;

            return m(
              ".dropdown-menu-item",
              {
                key: option.name,
                class: isSelected ? "selected" : "",
                onclick: (e: MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  attrs.onSelect(option);
                },
                onmouseenter: () => {
                  state.selectedIndex = index;
                  m.redraw();
                },
                onkeydown: (e: KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    attrs.onSelect(option);
                  }
                },
                tabindex: isSelected ? 0 : -1,
              },
              [
                m(".dropdown-menu-icon", {
                  innerHTML: option.icon,
                }),
                m(".dropdown-menu-label", option.title),
                option.shortcut &&
                  m(".dropdown-menu-shortcut", option.shortcut),
              ],
            );
          }),
        ),
      ],
    );
  },
};
