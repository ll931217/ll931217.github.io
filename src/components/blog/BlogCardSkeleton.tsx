import GlowCard from "../ui/GlowCard";
import { Skeleton } from "../ui/skeleton";

/**
 * Loading skeleton for BlogCard
 *
 * Displays a pulsing placeholder that matches the BlogCard layout
 * while blog posts are being loaded.
 */
const BlogCardSkeleton = () => {
  return (
    <div className="pointer-events-auto">
      <GlowCard className="h-full">
        <article className="flex flex-col h-full p-4">
          {/* Title and date row */}
          <div className="mb-4">
            <Skeleton className="h-6 w-full mb-2 bg-[#666666]/20" />
            <Skeleton className="h-4 w-24 bg-[#666666]/20" />
          </div>

          {/* Excerpt */}
          <Skeleton className="h-4 w-full mb-2 bg-[#666666]/20" />
          <Skeleton className="h-4 w-full mb-2 bg-[#666666]/20" />
          <Skeleton className="h-4 w-2/3 mb-4 bg-[#666666]/20" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            <Skeleton className="h-6 w-16 rounded-full bg-[#666666]/20" />
            <Skeleton className="h-6 w-20 rounded-full bg-[#666666]/20" />
            <Skeleton className="h-6 w-14 rounded-full bg-[#666666]/20" />
          </div>
        </article>
      </GlowCard>
    </div>
  );
};

export default BlogCardSkeleton;
