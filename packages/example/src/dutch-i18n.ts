import type { I18nStrings } from "mithril-markdown-wysiwyg";

/**
 * Dutch (Netherlands) translations for the markdown editor
 */
export const dutchStrings: Partial<I18nStrings> = {
  // Toolbar buttons
  bold: "Vet",
  italic: "Cursief",
  strikethrough: "Doorgestreept",
  inlineCode: "Inline Code",
  codeBlock: "Codeblok",
  link: "Link Invoegen",
  image: "Afbeelding Invoegen",
  table: "Tabel Invoegen",
  unorderedList: "Opsommingslijst",
  orderedList: "Genummerde Lijst",
  blockquote: "Citaat",
  horizontalRule: "Horizontale Lijn",
  undo: "Ongedaan maken",
  redo: "Opnieuw",
  heading: "Kop",
  indent: "Inspringing Verhogen",
  outdent: "Inspringing Verlagen",

  // Table menu
  insertRowAbove: "Rij Boven Invoegen",
  insertRowBelow: "Rij Onder Invoegen",
  insertColumnLeft: "Kolom Links Invoegen",
  insertColumnRight: "Kolom Rechts Invoegen",
  deleteRow: "Rij Verwijderen",
  deleteColumn: "Kolom Verwijderen",
  deleteTable: "Tabel Verwijderen",

  // Tab modes
  wysiwyg: "Visueel",
  markdown: "Markdown",
  preview: "Voorbeeld",

  // Modal dialogs
  insertLinkTitle: "Link Invoegen",
  insertImageTitle: "Afbeelding Invoegen",
  insertTableTitle: "Tabel Invoegen",
  linkText: "Linktekst",
  linkUrl: "URL",
  imageAlt: "Alt-tekst",
  imageUrl: "Afbeelding URL",
  imageTitle: "Titel (optioneel)",
  tableRows: "Rijen",
  tableCols: "Kolommen",
  cancel: "Annuleren",
  insert: "Invoegen",

  // Placeholders
  linkTextPlaceholder: "Voer linktekst in",
  linkUrlPlaceholder: "https://voorbeeld.nl",
  imageAltPlaceholder: "Alt-tekst",
  imageUrlPlaceholder: "https://voorbeeld.nl/afbeelding.jpg",
  imageTitlePlaceholder: "Afbeelding titel",
};
