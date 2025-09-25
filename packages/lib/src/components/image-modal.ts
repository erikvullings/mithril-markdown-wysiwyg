import m from "mithril";
import { Modal } from "./modal";

export interface ImageModalAttrs {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (src: string, alt: string, title?: string) => void;
  initialValues?: {
    src?: string;
    alt?: string;
    title?: string;
  };
}

export const ImageModal: m.FactoryComponent<ImageModalAttrs> = () => {
  const state = {
    src: "",
    alt: "",
    title: "",
  };

  return {
    oninit: ({ attrs }) => {
      state.src = attrs.initialValues?.src || "";
      state.alt = attrs.initialValues?.alt || "";
      state.title = attrs.initialValues?.title || "";
    },

    view: ({ attrs }) => {
      const { isOpen, onClose, onInsert } = attrs;

      const handleInsert = () => {
        if (state.src.trim()) {
          onInsert(
            state.src.trim(),
            state.alt.trim(),
            state.title.trim() || undefined,
          );
          onClose();
          // Reset form
          state.src = "";
          state.alt = "";
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
          title: "Insert Image",
          onClose,
          onConfirm: handleInsert,
          confirmText: "Insert",
          size: "medium",
        },
        [
          m(".md-image-form", [
            m(".md-field", { style: fieldStyle }, [
              m("label", { style: labelStyle }, "Image URL *"),
              m("input[type=url]", {
                style: inputStyle,
                placeholder: "https://example.com/image.jpg",
                value: state.src,
                oninput: (e: Event) => {
                  state.src = (e.target as HTMLInputElement).value;
                },
                oncreate: ({ dom }) => {
                  // Auto-focus the URL field
                  setTimeout(() => (dom as HTMLInputElement).focus(), 100);
                },
              }),
            ]),

            m(".md-field", { style: fieldStyle }, [
              m("label", { style: labelStyle }, "Alt Text"),
              m("input[type=text]", {
                style: inputStyle,
                placeholder: "Describe the image",
                value: state.alt,
                oninput: (e: Event) => {
                  state.alt = (e.target as HTMLInputElement).value;
                },
              }),
            ]),

            m(".md-field", { style: fieldStyle }, [
              m("label", { style: labelStyle }, "Title (optional)"),
              m("input[type=text]", {
                style: inputStyle,
                placeholder: "Image title for tooltip",
                value: state.title,
                oninput: (e: Event) => {
                  state.title = (e.target as HTMLInputElement).value;
                },
              }),
            ]),

            // Preview if URL is provided
            state.src &&
              m(
                ".md-image-preview",
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
                  m("img", {
                    src: state.src,
                    alt: state.alt,
                    title: state.title,
                    style: {
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    },
                    onerror: (e: Event) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    },
                    onload: (e: Event) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "block";
                    },
                  }),
                ],
              ),
          ]),
        ],
      );
    },
  };
};
