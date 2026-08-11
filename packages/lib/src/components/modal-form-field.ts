import m from "mithril";

/** Shared styling for a labeled input row inside a modal form. */
export const fieldStyle = { marginBottom: "15px" };

export const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "500",
  fontSize: "14px",
};

export const inputStyle = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid var(--border-color, #ddd)",
  borderRadius: "4px",
  fontSize: "14px",
  backgroundColor: "var(--input-bg, white)",
  color: "var(--text-color, black)",
};

/** A labeled input row, styled consistently across modal forms (link, image, ...). */
export const FormField = (label: string, input: m.Vnode<any, any>) =>
  m(".md-field", { style: fieldStyle }, [
    m("label", { style: labelStyle }, label),
    input,
  ]);
