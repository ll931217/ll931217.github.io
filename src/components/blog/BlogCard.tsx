import { Link } from "react-router-dom";
import GlowCard from "../ui/GlowCard";
import { formatDate } from "@/lib/utils";
import type { Blog as BlogType } from "@/types/blog";
import LanguageBadge from "../ui/LanguageBadge";
import { Clock } from "lucide-react";

interface BlogCardProps {
  blog: BlogType;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link to={`/blog/${blog.slug}`} className="pointer-events-auto block">
      <GlowCard className="h-full">
        <article className="flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-[#ff3333] transition-colors mb-2">
              {blog.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-[#666666]">
              <time dateTime={blog.date}>
                {formatDate(blog.date)}
              </time>
              {blog.readingTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {blog.readingTime}
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-[#999999] mb-4 flex-grow text-sm">{blog.excerpt}</p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {blog.tags.map((tag) => (
              <LanguageBadge key={tag} language={tag} />
            ))}
          </div>
        </article>
      </GlowCard>
    </Link>
  );
};

export default BlogCard;
