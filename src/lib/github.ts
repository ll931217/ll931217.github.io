import { Repository, RepoFilter, Commit } from "@/types/repository";
import { featuredRepos } from "@/data/featuredRepos";

const GITHUB_USERNAME = "ll931217";

export async function fetchRepositories(
  filter: RepoFilter = "all",
  language?: string,
  search?: string,
): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    let repositories: Repository[] = await response.json();

    // First filter by language if specified
    if (language && language !== "all") {
      repositories = repositories.filter(
        (repo) => repo.language?.toLowerCase() === language.toLowerCase(),
      );
    }

    // Then apply the other filters
    switch (filter) {
      case "featured":
        repositories = repositories.filter((repo) =>
          featuredRepos.some((featured) => featured.name === repo.name),
        );
        break;
      case "featuredOnly":
        repositories = repositories.filter((repo) =>
          featuredRepos.some((featured) => featured.name === repo.name),
        );
        repositories = repositories.slice(0, 6);
        break;
      case "recent":
        // Sort by update date and take the first 6
        repositories = repositories
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          )
          .slice(0, 6);
        break;
      case "popular":
        // Sort by stars and take the first 6
        repositories = repositories
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        break;
      default:
        // Get all non-forked repositories
        repositories = repositories.filter((repo) => !repo.fork);
    }

    // Mark featured repositories
    repositories = repositories
      .map((repo) => ({
        ...repo,
        featured: featuredRepos.some((featured) => featured.name === repo.name),
      }))
      .filter((repo) => {
        const escapedInput = (search || "").replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        const dynamicRegex = new RegExp(escapedInput, "i");
        return dynamicRegex.test(repo.name);
      });

    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

// Function to fetch the latest commit for a repository
export async function fetchLatestCommit(
  repoName: string,
): Promise<Commit | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=1`,
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits: Commit[] = await response.json();
    return commits.length > 0 ? commits[0] : null;
  } catch (error) {
    console.error(`Error fetching commit for ${repoName}:`, error);
    return null;
  }
}

// Function to get all unique languages from repositories
export async function fetchLanguages(): Promise<string[]> {
  try {
    const repos = await fetchRepositories();
    const languages = repos
      .filter((repo) => repo.language)
      .map((repo) => repo.language as string);

    // Create a unique list of languages
    return Array.from(new Set(languages)).sort();
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
}
