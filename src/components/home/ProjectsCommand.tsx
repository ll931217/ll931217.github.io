import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "@/lib/github";
import CommandBlock from "./CommandBlock";

/**
 * `ls -la projects/` — featured repositories as a directory listing.
 */
const ProjectsCommand = () => {
  const { data: repos, isLoading } = useQuery({
    queryKey: ["featured-repos"],
    queryFn: () => fetchRepositories("featuredOnly"),
  });
  const featured = (repos ?? []).slice(0, 5);

  return (
    <CommandBlock command="ls -la projects/" animKey={featured.length}>
      {isLoading ? (
        <p className="text-night-muted">fetching repositories…</p>
      ) : featured.length === 0 ? (
        <p className="text-night-muted">
          ls: cannot access 'projects/': github api unavailable —{" "}
          <Link to="/projects" className="text-emerald-400 hover:underline">
            see all projects
          </Link>
        </p>
      ) : (
        <>
          {featured.map((repo) => (
            <p key={repo.id}>
              <span className="text-night-faint">drwxr-xr-x</span>{" "}
              <span className="inline-block w-14 text-night-muted">
                ★{repo.stargazers_count}
              </span>{" "}
              <span className="inline-block w-28 text-night-muted">
                {(repo.language ?? "—").toLowerCase()}
              </span>{" "}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white transition-colors hover:text-emerald-400"
              >
                {repo.name}/
              </a>
              {repo.description && (
                <span className="text-night-muted">
                  {"  "}# {repo.description}
                </span>
              )}
            </p>
          ))}
          <p>
            <Link
              to="/projects"
              className="text-night-muted transition-colors hover:text-emerald-400"
            >
              cd projects/ →
            </Link>
          </p>
        </>
      )}
    </CommandBlock>
  );
};

export default ProjectsCommand;
