/**
 * Calculate estimated reading time for text content
 *
 * Based on average reading speed of 200-250 words per minute.
 * This is a standard convention used by Medium, Dev.to, etc.
 *
 * @param content - The text content to analyze
 * @param wordsPerMinute - Reading speed (default: 225)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 225
): string {
  // Strip markdown syntax for accurate word count
  const plainText = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`[^`]+`/g, "")
    // Remove headers
    .replace(/^#{1,6}\s+/gm, "")
    // Remove links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // Remove bold/italic
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
    // Remove blockquotes
    .replace(/^>\s+/gm, "")
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, "")
    .replace(/^[\s]*\d+\.\s+/gm, "")
    // Remove extra whitespace
    .replace(/\s+/g, " ")
    .trim();

  // Count words
  const wordCount = plainText.split(" ").filter((word) => word.length > 0).length;

  // Calculate minutes
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  if (minutes < 1) {
    return "< 1 min read";
  }

  return `${minutes} min read`;
}

/**
 * Calculate reading time in minutes as a number
 *
 * @param content - The text content to analyze
 * @param wordsPerMinute - Reading speed (default: 225)
 * @returns Reading time in minutes
 */
export function getReadingTimeMinutes(
  content: string,
  wordsPerMinute: number = 225
): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
    .replace(/^>\s+/gm, "")
    .replace(/^[\s]*[-*+]\s+/gm, "")
    .replace(/^[\s]*\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText.split(" ").filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
