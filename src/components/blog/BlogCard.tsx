import { Link } from "react-router-dom";
import GlowCard from "../ui/GlowCard";
import { formatDate } from "@/lib/utils";
import type { Blog as BlogType } from "@/types/blog";
import LanguageBadge from "../ui/LanguageBadge";

interface BlogCardProps {
  blog: BlogType;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link to={`/blog/${blog.slug}`}>
      <GlowCard className="h-full">
        <article className="flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-[#ff3333] transition-colors mb-2">
              {blog.title}
            </h3>
            <time dateTime={blog.date} className="text-sm text-[#666666]">
              {formatDate(blog.date)}
            </time>
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
