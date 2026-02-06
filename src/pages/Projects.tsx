import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/project/ProjectCard";
import { fetchRepositories, fetchLanguages } from "@/lib/github";
import { RepoFilter, Repository } from "@/types/repository";
import { AlertTriangle, Filter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import InteractiveGrid from "@/components/three/InteractiveGrid";
import MinimalNav from "@/components/layout/MinimalNav";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [scroll, setScroll] = useState(0);
  const [filter, setFilter] = useState<RepoFilter>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight > 0) {
        const scrollPercent = (window.scrollY / scrollableHeight) * 100;
        setScroll(Math.round(scrollPercent));
      } else {
        setScroll(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Section reveals
    gsap.utils.toArray('section').forEach((section) => {
      gsap.from(section as any, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section as any,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }, []);

  // Fetch all languages for the filter
  const { data: languages = [] } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
  });

  // Fetch repositories with filter and language
  const {
    data: repos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["repositories", filter, selectedLanguage, search],
    queryFn: () => fetchRepositories(filter, selectedLanguage, search),
  });

  const filters: { value: RepoFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "featured", label: "Featured" },
    { value: "recent", label: "Recent" },
    { value: "popular", label: "Popular" },
  ];

  // Reset language filter when changing main filter
  useEffect(() => {
    setSelectedLanguage("all");
  }, [filter]);

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="bg-[#0a0a0a] text-white font-ibm-mono min-h-screen overflow-x-hidden">
      <div className="scanlines" />
      <div className="noise-overlay" />

      <InteractiveGrid />

      <MinimalNav />

      <div className="fixed top-4 right-4 text-[#ff3333] z-50 mix-blend-difference text-sm md:text-base">
        [{scroll}%]
      </div>

      <main className="relative z-10 pointer-events-none">
        {/* Compact Header */}
        <section className="pt-20 pb-8 md:pt-24 md:pb-12 px-4 md:px-8 border-t-4 border-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1
                  className="font-bold uppercase"
                  style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      letterSpacing: '0.2rem',
                      lineHeight: '1',
                  }}
                >
                  PROJECTS
                </h1>
                <p className="mt-4 text-sm md:text-base text-[#666666] max-w-xl">
                  <span className="text-[#ff3333]">&gt;</span> Explore my open-source projects and personal work.
                </p>
              </div>

              {/* Compact Search */}
              <div className="relative w-full md:w-64 shrink-0">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
                  size={16}
                />
                <Input
                  className="pl-9 h-10 bg-[#0a0a0a]/50 border border-[#666666] text-white placeholder:text-[#666666] focus:border-[#ff3333] focus:outline-none transition-colors text-sm pointer-events-auto"
                  type="search"
                  value={search}
                  onChange={handleSearchInput}
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Content */}
        <section className="pb-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main Filters - Compact */}
            <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`px-3 py-1.5 text-sm border transition-colors ${
                    filter === filterOption.value
                      ? "border-[#ff3333] text-[#ff3333] bg-[#ff3333]/10"
                      : "border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333]"
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}

              {/* Language Filter Toggle */}
              <Collapsible
                open={isFiltersOpen}
                onOpenChange={setIsFiltersOpen}
              >
                <CollapsibleTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#666666] hover:text-white border border-[#666666] hover:border-[#ff3333] transition-colors pointer-events-auto">
                  <Filter size={14} />
                  {isFiltersOpen ? "Less" : "More"}
                  {selectedLanguage !== "all" && (
                    <Badge className="ml-1 bg-[#ff3333]/20 text-[#ff3333] border border-[#ff3333] text-xs px-1.5 py-0">
                      {selectedLanguage}
                    </Badge>
                  )}
                </CollapsibleTrigger>

                {selectedLanguage !== "all" && (
                  <button
                    onClick={() => setSelectedLanguage("all")}
                    className="ml-2 text-sm text-[#666666] hover:text-[#ff3333] underline pointer-events-auto"
                  >
                    Clear
                  </button>
                )}
              </Collapsible>
            </div>

            {/* Advanced Filters */}
            <Collapsible
              open={isFiltersOpen}
              onOpenChange={setIsFiltersOpen}
              className="mb-6 pointer-events-auto"
            >
              <CollapsibleContent className="pt-2 pb-4">
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-full md:w-[180px] bg-[#0a0a0a]/50 border border-[#666666] text-white focus:border-[#ff3333] h-10 pointer-events-auto">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border border-[#666666]">
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CollapsibleContent>
            </Collapsible>

            {/* Language Tags - Show top 5 */}
            {languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
                <Toggle
                  pressed={selectedLanguage === "all"}
                  onClick={() => setSelectedLanguage("all")}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs bg-[#0a0a0a]/50 border border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] data-[state=on]:bg-[#ff3333]/10 data-[state=on]:border-[#ff3333] data-[state=on]:text-[#ff3333]"
                >
                  All
                </Toggle>
                {languages.slice(0, 5).map((language) => (
                  <Toggle
                    key={language}
                    pressed={selectedLanguage === language}
                    onClick={() => setSelectedLanguage(language)}
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs bg-[#0a0a0a]/50 border border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] data-[state=on]:bg-[#ff3333]/10 data-[state=on]:border-[#ff3333] data-[state=on]:text-[#ff3333]"
                  >
                    {language}
                  </Toggle>
                ))}
                {languages.length > 5 && (
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="h-8 px-3 text-xs underline text-[#666666] hover:text-[#ff3333]"
                  >
                    +{languages.length - 5}
                  </button>
                )}
              </div>
            )}

            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-48 bg-[#666666]/10 border border-[#666666]"
                  ></div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-[#666666]/10 border border-[#ff3333] text-center py-12 pointer-events-auto">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-[#ff3333]" />
                <p className="text-[#ff3333] mb-4">
                  Failed to load projects
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333]/10 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : repos?.length === 0 ? (
              <div className="bg-[#666666]/10 border border-[#666666] text-center py-12 pointer-events-auto">
                <p className="text-[#666666] mb-4">
                  No repositories found
                </p>
                <button
                  onClick={() => {
                    setFilter("all");
                    setSelectedLanguage("all");
                    setSearch("");
                  }}
                  className="px-4 py-2 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333]/10 transition-colors"
                >
                  View All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {repos?.map((repo: Repository) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="py-12 px-4 md:px-8 border-t-4 border-white text-center">
            <pre className="text-xs md:text-sm text-[#666666]">END OF TRANSMISSION</pre>
        </footer>
      </main>
    </div>
  );
};

export default Projects;
