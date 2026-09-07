export interface I18nStrings {
  // Toolbar buttons
  bold: string;
  italic: string;
  strikethrough: string;
  inlineCode: string;
  codeBlock: string;
  link: string;
  image: string;
  table: string;
  unorderedList: string;
  orderedList: string;
  blockquote: string;
  horizontalRule: string;
  pageBreak: string;
  undo: string;
  redo: string;
  heading: string;
  paragraph: string;
  indent: string;
  outdent: string;
  checklist: string;
  clearFormat: string;
  find: string;
  replace: string;
  replaceAll: string;
  noResults: string;
  invalidExpression: string;
  matchCase: string;
  matchWholeWord: string;
  useRegularExpression: string;
  previousMatch: string;
  nextMatch: string;
  showReplace: string;
  hideReplace: string;
  closeSearch: string;

  // Table menu
  insertRowAbove: string;
  insertRowBelow: string;
  insertColumnLeft: string;
  insertColumnRight: string;
  deleteRow: string;
  deleteColumn: string;
  deleteTable: string;

  // Tab modes
  wysiwyg: string;
  markdown: string;
  preview: string;

  // Modal dialogs
  insertLinkTitle: string;
  insertImageTitle: string;
  insertTableTitle: string;
  linkText: string;
  linkUrl: string;
  linkTitle: string;
  imageAlt: string;
  imageUrl: string;
  imageTitle: string;
  tableRows: string;
  tableCols: string;
  cancel: string;
  insert: string;

  // Placeholders
  linkTextPlaceholder: string;
  linkUrlPlaceholder: string;
  linkTitlePlaceholder: string;
  imageAltPlaceholder: string;
  imageUrlPlaceholder: string;
  imageTitlePlaceholder: string;

  // Table selector
  tableSelectSize: string;
  tableSelectSizeDefault: string;
  tableClickToInsert: string;
  tableCustomSize: string;
  tableCustomRowsPrompt: string;
  tableCustomColsPrompt: string;
}

export const defaultStrings: I18nStrings = {
  // Toolbar buttons
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  inlineCode: "Inline Code",
  codeBlock: "Code Block",
  link: "Insert Link",
  image: "Insert Image",
  table: "Insert Table",
  unorderedList: "Unordered List",
  orderedList: "Ordered List",
  blockquote: "Blockquote",
  horizontalRule: "Horizontal Rule",
  pageBreak: "Page Break",
  undo: "Undo",
  redo: "Redo",
  heading: "Heading",
  paragraph: "Paragraph",
  indent: "Increase Indent",
  outdent: "Decrease Indent",
  checklist: "Task List",
  clearFormat: "Clear Formatting",
  find: "Find",
  replace: "Replace",
  replaceAll: "All",
  noResults: "No results",
  invalidExpression: "Invalid expression",
  matchCase: "Match case",
  matchWholeWord: "Match whole word",
  useRegularExpression: "Use regular expression",
  previousMatch: "Previous match",
  nextMatch: "Next match",
  showReplace: "Show replace",
  hideReplace: "Hide replace",
  closeSearch: "Close search",

  // Table menu
  insertRowAbove: "Insert Row Above",
  insertRowBelow: "Insert Row Below",
  insertColumnLeft: "Insert Column Left",
  insertColumnRight: "Insert Column Right",
  deleteRow: "Delete Row",
  deleteColumn: "Delete Column",
  deleteTable: "Delete Table",

  // Tab modes
  wysiwyg: "WYSIWYG",
  markdown: "Markdown",
  preview: "Preview",

  // Modal dialogs
  insertLinkTitle: "Insert Link",
  insertImageTitle: "Insert Image",
  insertTableTitle: "Insert Table",
  linkText: "Link Text",
  linkUrl: "URL",
  linkTitle: "Title (optional)",
  imageAlt: "Alt Text",
  imageUrl: "Image URL",
  imageTitle: "Title (optional)",
  tableRows: "Rows",
  tableCols: "Columns",
  cancel: "Cancel",
  insert: "Insert",

  // Placeholders
  linkTextPlaceholder: "Enter link text",
  linkUrlPlaceholder: "https://example.com",
  linkTitlePlaceholder: "Link title for tooltip",
  imageAltPlaceholder: "Alt text",
  imageUrlPlaceholder: "https://example.com/image.jpg",
  imageTitlePlaceholder: "Image title",

  // Table selector
  tableSelectSize: "{rows} × {cols} Table",
  tableSelectSizeDefault: "Select table size",
  tableClickToInsert: "Click to insert table",
  tableCustomSize: "Custom size...",
  tableCustomRowsPrompt: "Number of rows:",
  tableCustomColsPrompt: "Number of columns:",
};

export const createI18n = (customStrings: Partial<I18nStrings> = {}) => {
  const strings = { ...defaultStrings, ...customStrings };

  return (key: keyof I18nStrings): string => {
    return strings[key] || key;
  };
};
