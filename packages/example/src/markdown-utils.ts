import { marked } from "marked";
import { render as slimdownRender } from "slimdown-js";

// Configure marked for GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
});

export const markedRenderer = {
  markdownToHtml: (markdown: string): string => {
    if (!markdown || markdown.trim() === "") {
      return "";
    }
    return marked.parse(markdown) as string;
  },
};

export const slimdownRenderer = {
  markdownToHtml: (markdown: string): string => {
    if (!markdown || markdown.trim() === "") {
      return "";
    }
    return slimdownRender(markdown);
  },
};
