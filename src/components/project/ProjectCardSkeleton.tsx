/**
 * Loading skeleton for ProjectCard.
 *
 * Mirrors the calm left-border row layout with pulsing placeholders
 * while repositories are fetched from GitHub.
 */
const ProjectCardSkeleton = () => {
  return (
    <div
      className="border-l-2 border-white/10 pl-6 py-4 animate-pulse"
      aria-hidden="true"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="h-4 w-40 bg-white/5 rounded" />
        <div className="h-3 w-16 bg-white/5 rounded" />
      </div>

      <div className="mt-3 h-3 w-full max-w-lg bg-white/5 rounded" />
      <div className="mt-2 h-3 w-2/3 max-w-md bg-white/5 rounded" />

      <div className="mt-4 flex items-center gap-3">
        <div className="h-5 w-20 bg-white/5 rounded" />
        <div className="h-3 w-28 bg-white/5 rounded" />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
