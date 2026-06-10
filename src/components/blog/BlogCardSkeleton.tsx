/**
 * Loading skeleton for BlogCard
 *
 * Displays a pulsing placeholder that matches the BlogCard row layout
 * while blog posts are being loaded.
 */
const BlogCardSkeleton = () => {
  return (
    <div className="border-l-2 border-white/10 pl-6 py-4 animate-pulse">
      {/* Title and date row */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="h-5 w-2/3 bg-white/5" />
        <div className="h-3 w-20 bg-white/5" />
      </div>

      {/* Excerpt */}
      <div className="mt-3 space-y-2 max-w-lg">
        <div className="h-3 w-full bg-white/5" />
        <div className="h-3 w-5/6 bg-white/5" />
      </div>

      {/* Reading time and tags */}
      <div className="mt-4 flex items-center gap-2">
        <div className="h-3 w-14 bg-white/5" />
        <div className="h-6 w-16 bg-white/5" />
        <div className="h-6 w-12 bg-white/5" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
