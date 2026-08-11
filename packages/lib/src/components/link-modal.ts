import m from "mithril";
import { Modal } from "./modal";
import { FormField, inputStyle } from "./modal-form-field";
import type { I18nStrings } from "../i18n";

export interface LinkModalAttrs {
  isOpen: boolean;
  t: (key: keyof I18nStrings) => string;
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
      const { isOpen, t, onClose, onInsert } = attrs;

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

      return m(
        Modal,
        {
          isOpen,
          title: t("insertLinkTitle"),
          onClose,
          onConfirm: handleInsert,
          confirmText: t("insert"),
          cancelText: t("cancel"),
          size: "medium",
        },
        [
          m(".md-link-form", [
            FormField(
              t("linkText") + " *",
              m("input[type=text]", {
                style: inputStyle,
                placeholder: t("linkTextPlaceholder"),
                value: state.text,
                oninput: (e: Event) => {
                  state.text = (e.target as HTMLInputElement).value;
                },
                oncreate: ({ dom }) => {
                  // Auto-focus the text field
                  setTimeout(() => (dom as HTMLInputElement).focus(), 100);
                },
              }),
            ),

            FormField(
              t("linkUrl") + " *",
              m("input[type=url]", {
                style: inputStyle,
                placeholder: t("linkUrlPlaceholder"),
                value: state.url,
                oninput: (e: Event) => {
                  state.url = (e.target as HTMLInputElement).value;
                },
              }),
            ),

            FormField(
              t("linkTitle"),
              m("input[type=text]", {
                style: inputStyle,
                placeholder: t("linkTitlePlaceholder"),
                value: state.title,
                oninput: (e: Event) => {
                  state.title = (e.target as HTMLInputElement).value;
                },
              }),
            ),

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
