import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "@/lib/github";
import { Repository } from "@/types/repository";

const ProjectsSection = () => {
  const { data: repos, isLoading } = useQuery({
    queryKey: ["featured-repos"],
    queryFn: () => fetchRepositories("featuredOnly"),
  });
  const featured = (repos ?? []).slice(0, 3);

  return (
    <section id="projects">
      <h2 className="text-emerald-400 text-sm mb-6">
        <span className="text-night-faint">02.</span> projects
      </h2>
      {isLoading ? (
        <p className="text-night-muted text-sm">fetching repositories…</p>
      ) : featured.length === 0 ? (
        <p className="text-night-muted text-sm">
          github api unavailable —{" "}
          <Link to="/projects" className="text-emerald-400 hover:underline">
            see all projects
          </Link>
        </p>
      ) : (
        <ul className="space-y-px">
          {featured.map((repo: Repository) => (
            <li key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-l-2 border-white/10 hover:border-emerald-400 pl-6 py-4 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-white group-hover:text-emerald-400 transition-colors font-bold">
                    {repo.name}
                  </span>
                  <span className="text-xs text-night-muted whitespace-nowrap">
                    {repo.language ?? ""} ★{repo.stargazers_count}
                  </span>
                </div>
                <p className="mt-1 text-sm text-night-muted leading-relaxed max-w-lg">
                  {repo.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectsSection;
