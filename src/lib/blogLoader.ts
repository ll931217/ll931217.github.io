
import { Blog } from '@/types/blog';
import { blogPosts } from '@/data/blogPosts';

/**
 * Load all blog posts
 */
export function getAllBlogPosts(): Blog[] {
  return [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): Blog | undefined {
  return blogPosts.find(post => post.slug === slug);
}
