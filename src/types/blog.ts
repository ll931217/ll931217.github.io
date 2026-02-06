export interface Blog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  readingTime?: string; // Formatted string like "5 min read"
}
