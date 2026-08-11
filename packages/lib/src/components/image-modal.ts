import m from "mithril";
import { Modal } from "./modal";
import { FormField, inputStyle } from "./modal-form-field";
import type { I18nStrings } from "../i18n";

export interface ImageModalAttrs {
  isOpen: boolean;
  t: (key: keyof I18nStrings) => string;
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
      const { isOpen, t, onClose, onInsert } = attrs;

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

      return m(
        Modal,
        {
          isOpen,
          title: t("insertImageTitle"),
          onClose,
          onConfirm: handleInsert,
          confirmText: t("insert"),
          cancelText: t("cancel"),
          size: "medium",
        },
        [
          m(".md-image-form", [
            FormField(
              t("imageUrl") + " *",
              m("input[type=url]", {
                style: inputStyle,
                placeholder: t("imageUrlPlaceholder"),
                value: state.src,
                oninput: (e: Event) => {
                  state.src = (e.target as HTMLInputElement).value;
                },
                oncreate: ({ dom }) => {
                  // Auto-focus the URL field
                  setTimeout(() => (dom as HTMLInputElement).focus(), 100);
                },
              }),
            ),

            FormField(
              t("imageAlt"),
              m("input[type=text]", {
                style: inputStyle,
                placeholder: t("imageAltPlaceholder"),
                value: state.alt,
                oninput: (e: Event) => {
                  state.alt = (e.target as HTMLInputElement).value;
                },
              }),
            ),

            FormField(
              t("imageTitle"),
              m("input[type=text]", {
                style: inputStyle,
                placeholder: t("imageTitlePlaceholder"),
                value: state.title,
                oninput: (e: Event) => {
                  state.title = (e.target as HTMLInputElement).value;
                },
              }),
            ),

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
