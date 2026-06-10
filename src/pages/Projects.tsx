import { ChangeEvent, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectCardSkeleton from "@/components/project/ProjectCardSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import {
  KeyboardCheatSheet,
  KeyboardHelpButton,
} from "@/components/ui/KeyboardCheatSheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcut";
import { fetchLanguages, fetchRepositories } from "@/lib/github";
import { RepoFilter, Repository } from "@/types/repository";

const FILTERS: { value: RepoFilter; label: string }[] = [
  { value: "all", label: "all" },
  { value: "featured", label: "featured" },
  { value: "recent", label: "recent" },
  { value: "popular", label: "popular" },
];

const SKELETON_ROWS = 6;

const Projects = () => {
  const [filter, setFilter] = useState<RepoFilter>("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [search, setSearch] = useState("");
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts(
    {
      "/": () => searchInputRef.current?.focus(),
      "?": () => setShowKeyboardHelp(true),
      Escape: () => {
        if (showKeyboardHelp) {
          setShowKeyboardHelp(false);
        } else if (search) {
          setSearch("");
          setFilter("all");
          setSelectedLanguage("all");
        }
      },
    },
    true,
  );

  const { data: languages = [] } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
  });

  const {
    data: repos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["repositories", filter, selectedLanguage, search],
    queryFn: () => fetchRepositories(filter, selectedLanguage, search),
  });

  const handleFilterChange = (value: RepoFilter) => {
    setFilter(value);
    setSelectedLanguage("all");
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const resetFilters = () => {
    setFilter("all");
    setSelectedLanguage("all");
    setSearch("");
  };

  return (
    <SidebarLayout>
      <div className="space-y-10">
        <header>
          <h2 className="text-emerald-400 text-sm mb-6">
            <span className="text-night-faint">01.</span> projects
          </h2>
          <p className="text-sm text-night-muted leading-relaxed max-w-xl">
            open-source projects and personal work, fetched live from github.
          </p>
        </header>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 md:max-w-xs">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-night-faint"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={search}
                onChange={handleSearchInput}
                placeholder="search… (press /)"
                className="w-full pl-9 pr-3 py-2 text-sm font-mono bg-night border border-white/10 text-night-fg placeholder:text-night-faint focus:border-emerald-400 focus:outline-none transition-colors"
              />
            </div>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger
                aria-label="Filter by language"
                className="w-full md:w-48 rounded-none bg-night border border-white/10 text-night-fg text-sm font-mono focus:border-emerald-400 focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder="language" />
              </SelectTrigger>
              <SelectContent className="rounded-none bg-night border border-white/10 text-night-fg font-mono">
                <SelectItem value="all">all languages</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <nav
            aria-label="Repository filters"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
          >
            {FILTERS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                aria-pressed={filter === option.value}
                className={`transition-colors ${
                  filter === option.value
                    ? "text-emerald-400"
                    : "text-night-muted hover:text-emerald-400"
                }`}
              >
                {option.label}
              </button>
            ))}
          </nav>
        </div>

        <section aria-label="Repositories" className="pb-16">
          {isLoading ? (
            <ul className="space-y-px">
              {Array.from({ length: SKELETON_ROWS }, (_, index) => (
                <li key={index}>
                  <ProjectCardSkeleton />
                </li>
              ))}
            </ul>
          ) : error ? (
            <EmptyState
              type="error"
              message="Failed to load repositories from GitHub"
              actionLabel="retry"
              onAction={() => window.location.reload()}
            />
          ) : !repos || repos.length === 0 ? (
            <EmptyState
              type="search"
              message="No repositories match your filters"
              actionLabel="view all"
              onAction={resetFilters}
            />
          ) : (
            <>
              <p className="mb-4 text-xs text-night-faint">
                {repos.length} repositories
              </p>
              <ul className="space-y-px">
                {repos.map((repo: Repository) => (
                  <li key={repo.id}>
                    <ProjectCard repo={repo} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>

      <KeyboardHelpButton onClick={() => setShowKeyboardHelp(true)} />
      <KeyboardCheatSheet
        isOpen={showKeyboardHelp}
        onClose={() => setShowKeyboardHelp(false)}
      />
    </SidebarLayout>
  );
};

export default Projects;
