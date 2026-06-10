import { Link } from "react-router-dom";
import type { Blog as BlogType } from "@/types/blog";
import LanguageBadge from "../ui/LanguageBadge";

interface BlogCardProps {
  blog: BlogType;
}

/**
 * Blog list row — left-border list item linking to the full post.
 */
const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group block border-l-2 border-white/10 hover:border-emerald-400 pl-6 py-4 transition-colors"
    >
      <article>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-white group-hover:text-emerald-400 transition-colors">
            {blog.title}
          </h3>
          <time
            dateTime={blog.date}
            className="text-xs text-night-muted whitespace-nowrap"
          >
            {new Date(blog.date).toISOString().slice(0, 10)}
          </time>
        </div>

        <p className="mt-1 text-sm text-night-muted leading-relaxed max-w-lg line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {blog.readingTime && (
            <span className="text-xs text-night-faint whitespace-nowrap">
              {blog.readingTime}
            </span>
          )}
          {blog.tags.map((tag) => (
            <LanguageBadge key={tag} language={tag} />
          ))}
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
