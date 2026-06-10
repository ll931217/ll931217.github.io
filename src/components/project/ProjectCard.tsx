import { GitFork, Star } from "lucide-react";
import LanguageBadge from "@/components/ui/LanguageBadge";
import { Repository } from "@/types/repository";

interface ProjectCardProps {
  repo: Repository;
}

const formatDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);

/**
 * Calm list row for a GitHub repository. The repo name is a stretched link
 * covering the whole row; the homepage link (when present) sits above it.
 */
const ProjectCard = ({ repo }: ProjectCardProps) => {
  const topics = repo.topics ?? [];

  return (
    <article className="relative group border-l-2 border-white/10 hover:border-emerald-400 pl-6 py-4 transition-colors">
      <div className="flex items-baseline justify-between gap-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-white group-hover:text-emerald-400 transition-colors after:absolute after:inset-0"
        >
          {repo.name}
        </a>

        <span className="flex items-center gap-3 text-xs text-night-muted whitespace-nowrap">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star size={12} aria-hidden="true" />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={12} aria-hidden="true" />
              {repo.forks_count}
            </span>
          )}
        </span>
      </div>

      <p className="mt-1 text-sm text-night-muted leading-relaxed max-w-lg">
        {repo.description ?? "No description provided."}
      </p>

      {(repo.language || topics.length > 0) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          {repo.language && <LanguageBadge language={repo.language} />}
          {topics.map((topic) => (
            <span key={topic} className="text-night-faint">
              #{topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2 flex items-center gap-4 text-xs text-night-faint">
        <span>updated {formatDate(repo.updated_at)}</span>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 text-emerald-400/80 hover:text-emerald-400 transition-colors"
          >
            live ↗
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
