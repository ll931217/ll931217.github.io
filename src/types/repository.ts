
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  visibility: string;
  default_branch: string;
  pushed_at: string;
  featured?: boolean;
}

export interface Commit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
}

export type RepoFilter = 'all' | 'featured' | 'recent' | 'popular' | 'featuredOnly';
