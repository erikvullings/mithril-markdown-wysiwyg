import m from "mithril";
import { Modal } from "./modal";

export interface LinkModalAttrs {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text: string, title?: string) => void;
  initialValues?: {
    url?: string;
    text?: string;
    title?: string;
  };
}

export const LinkModal: m.FactoryComponent<LinkModalAttrs> = () => {
  const state = {
    url: "",
    text: "",
    title: "",
  };

  return {
    oninit: ({ attrs }) => {
      state.url = attrs.initialValues?.url || "";
      state.text = attrs.initialValues?.text || "";
      state.title = attrs.initialValues?.title || "";
    },

    view: ({ attrs }) => {
      const { isOpen, onClose, onInsert } = attrs;

      const handleInsert = () => {
        if (state.url.trim() && state.text.trim()) {
          onInsert(
            state.url.trim(),
            state.text.trim(),
            state.title.trim() || undefined,
          );
          onClose();
          // Reset form
          state.url = "";
          state.text = "";
          state.title = "";
        }
      };

      const inputStyle = {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid var(--border-color, #ddd)",
        borderRadius: "4px",
        fontSize: "14px",
        backgroundColor: "var(--input-bg, white)",
        color: "var(--text-color, black)",
      };

      const labelStyle = {
        display: "block",
        marginBottom: "5px",
        fontWeight: "500",
        fontSize: "14px",
      };

      const fieldStyle = {
        marginBottom: "15px",
      };

      return m(
        Modal,
        {
          isOpen,
          title: "Insert Link",
          onClose,
          onConfirm: handleInsert,
          confirmText: "Insert",
          size: "medium",
        },
        [
          m(".md-link-form", [
            m(".md-field", { style: fieldStyle }, [
              m("label", { style: labelStyle }, "Link Text *"),
              m("input[type=text]", {
                style: inputStyle,
                placeholder: "Text to display",
                value: state.text,
                oninput: (e: Event) => {
                  state.text = (e.target as HTMLInputElement).value;
                },
                oncreate: ({ dom }) => {
                  // Auto-focus the text field
                  setTimeout(() => (dom as HTMLInputElement).focus(), 100);
                },
              }),
            ]),

            m(".md-field", { style: fieldStyle }, [
              m("label", { style: labelStyle }, "URL *"),
              m("input[type=url]", {
                style: inputStyle,
                placeholder: "https://example.com",
                value: state.url,
                oninput: (e: Event) => {
                  state.url = (e.target as HTMLInputElement).value;
                },
              }),
            ]),

            m(".md-field", { style: fieldStyle }, [
              m("label", { style: labelStyle }, "Title (optional)"),
              m("input[type=text]", {
                style: inputStyle,
                placeholder: "Link title for tooltip",
                value: state.title,
                oninput: (e: Event) => {
                  state.title = (e.target as HTMLInputElement).value;
                },
              }),
            ]),

            // Preview if both URL and text are provided
            state.url &&
              state.text &&
              m(
                ".md-link-preview",
                {
                  style: {
                    marginTop: "15px",
                    padding: "10px",
                    border: "1px dashed var(--border-color, #ddd)",
                    borderRadius: "4px",
                    backgroundColor: "var(--preview-bg, #f9f9f9)",
                  },
                },
                [
                  m(
                    "div",
                    {
                      style: {
                        marginBottom: "8px",
                        fontSize: "12px",
                        color: "var(--text-muted, #666)",
                      },
                    },
                    "Preview:",
                  ),
                  m(
                    "a",
                    {
                      href: state.url,
                      title: state.title,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: {
                        color: "var(--link-color, #007bff)",
                        textDecoration: "underline",
                      },
                      onclick: (e: Event) => e.preventDefault(), // Prevent navigation in preview
                    },
                    state.text,
                  ),
                ],
              ),
          ]),
        ],
      );
    },
  };
};
