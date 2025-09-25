import m from "mithril";

export interface ModalAttrs {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  size?: "small" | "medium" | "large";
}

export const Modal: m.Component<ModalAttrs> = {
  view: ({ attrs, children }) => {
    const {
      isOpen,
      title,
      onClose,
      onConfirm,
      confirmText = "OK",
      cancelText = "Cancel",
      size = "medium",
    } = attrs;

    if (!isOpen) return null;

    const handleBackdropClick = (e: Event) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter" && onConfirm) {
        onConfirm();
      }
    };

    return m(
      ".md-modal-overlay",
      {
        onclick: handleBackdropClick,
        onkeydown: handleKeyDown,
        tabindex: -1,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        },
      },
      [
        m(
          `.md-modal.md-modal--${size}`,
          {
            onclick: (e: Event) => e.stopPropagation(),
            style: {
              backgroundColor: "var(--bg-color, white)",
              color: "var(--text-color, black)",
              borderRadius: "8px",
              padding: "20px",
              minWidth:
                size === "small"
                  ? "300px"
                  : size === "large"
                    ? "600px"
                    : "450px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              border: "1px solid var(--border-color, #e0e0e0)",
            },
          },
          [
            // Header
            m(
              ".md-modal-header",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  paddingBottom: "15px",
                  borderBottom: "1px solid var(--border-color, #e0e0e0)",
                },
              },
              [
                m(
                  "h3.md-modal-title",
                  {
                    style: {
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: "600",
                    },
                  },
                  title,
                ),
                m(
                  "button.md-modal-close",
                  {
                    onclick: onClose,
                    style: {
                      background: "none",
                      border: "none",
                      fontSize: "24px",
                      cursor: "pointer",
                      padding: "0",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      color: "var(--text-color, #666)",
                    },
                  },
                  "×",
                ),
              ],
            ),

            // Content
            m(
              ".md-modal-content",
              {
                style: {
                  marginBottom: onConfirm ? "20px" : "0",
                },
              },
              children,
            ),

            // Footer (only if onConfirm is provided)
            onConfirm &&
              m(
                ".md-modal-footer",
                {
                  style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    paddingTop: "15px",
                    borderTop: "1px solid var(--border-color, #e0e0e0)",
                  },
                },
                [
                  m(
                    "button.md-modal-cancel",
                    {
                      onclick: onClose,
                      style: {
                        padding: "8px 16px",
                        border: "1px solid var(--border-color, #ddd)",
                        backgroundColor: "var(--button-bg, #f5f5f5)",
                        color: "var(--text-color, #333)",
                        borderRadius: "4px",
                        cursor: "pointer",
                      },
                    },
                    cancelText,
                  ),
                  m(
                    "button.md-modal-confirm",
                    {
                      onclick: onConfirm,
                      style: {
                        padding: "8px 16px",
                        border: "none",
                        backgroundColor: "var(--primary-color, #007bff)",
                        color: "white",
                        borderRadius: "4px",
                        cursor: "pointer",
                      },
                    },
                    confirmText,
                  ),
                ],
              ),
          ],
        ),
      ],
    );
  },
};
