import GlowCard from "../ui/GlowCard";
import { Skeleton } from "../ui/skeleton";

/**
 * Loading skeleton for ProjectCard
 *
 * Displays a pulsing placeholder that matches the ProjectCard layout
 * while data is being fetched from GitHub.
 */
const ProjectCardSkeleton = () => {
  return (
    <div className="pointer-events-auto">
      <GlowCard className="h-full">
        <div className="flex flex-col h-full p-4">
          {/* Title row with external link icon */}
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-6 w-32 bg-[#666666]/20" />
            <Skeleton className="h-5 w-5 rounded-sm bg-[#666666]/20" />
          </div>

          {/* Description */}
          <Skeleton className="h-4 w-full mb-2 bg-[#666666]/20" />
          <Skeleton className="h-4 w-3/4 mb-4 bg-[#666666]/20" />

          {/* Language badge and stats */}
          <div className="mt-auto flex items-center mt-2">
            <Skeleton className="h-6 w-16 rounded-full bg-[#666666]/20" />
            <Skeleton className="h-4 w-12 ml-4 bg-[#666666]/20" />
            <Skeleton className="h-4 w-12 ml-4 bg-[#666666]/20" />
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

export default ProjectCardSkeleton;
