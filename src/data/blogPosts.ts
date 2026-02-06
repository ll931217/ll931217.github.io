import { Blog } from "@/types/blog";
import { calculateReadingTime } from "@/lib/readingTime";

const POSTS = import.meta.glob("@/content/blog/*.md", {
  eager: true,
});

export const blogPosts: Blog[] = Object.entries(POSTS).map(([path, post]: [string, any]) => {
  // Extract filename without extension as slug
  const [, filename] = path.match(/([^/\\]+)\.md$/) || [];

  // vite-plugin-markdown with Mode.HTML exports: { html, attributes }
  // or with Mode.MARKDOWN exports: { default: string } for raw markdown
  const attributes = post.attributes || post.frontmatter || {};
  const content = post.html || post.markdown || post.default || '';

  // Calculate reading time from markdown content
  const markdownContent = post.markdown || post.default || content;

  return {
    ...attributes,
    slug: filename,
    content: content,
    readingTime: calculateReadingTime(markdownContent),
  } as Blog;
});
