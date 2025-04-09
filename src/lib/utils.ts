import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import DOMPurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export const md = MarkdownIt({
  html: true,
  linkify: true,
}).use(MarkdownItAnchor, {
  slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, "-"),
});

export function parseMarkdown(content: string): string {
  // Parse markdown content to HTML using markdown-it
  const rawHtml = md.render(content) as string;

  // Sanitize the HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "strong",
      "em",
      "img",
      "hr",
      "br",
      "span",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel"],
  });

  return sanitizedHtml;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
