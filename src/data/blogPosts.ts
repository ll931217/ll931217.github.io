import { Blog } from "@/types/blog";

const POSTS = import.meta.glob("@/content/blog/*.md", {
  eager: true,
}) as Record<string, { attributes: Blog; markdown: string }>;

export const blogPosts: Blog[] = Object.entries(POSTS).map(([path, post]) => {
  // Extract filename without extension as slug
  const [, filename] = path.match(/([^/\\]+)\.md$/) || [];

  return {
    ...post.attributes,
    slug: filename,
    content: post.markdown,
  };
});
