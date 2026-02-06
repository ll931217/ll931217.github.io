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
    { value: "all", label: "All Projects" },
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

      <div className="fixed top-4 right-4 text-[#ff3333] z-50 mix-blend-difference">
        [SCROLL: {scroll}%]
      </div>

      <main className="relative z-10">
        <section className="min-h-[60vh] flex flex-col items-center justify-center overflow-hidden p-4 md:p-8 border-t-4 border-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="font-bold uppercase text-center mb-8"
              style={{
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  letterSpacing: 'clamp(0.2rem, 1vw, 0.8rem)',
                  lineHeight: '1',
              }}
            >
              PROJECTS
            </h1>

            <div className="space-y-6 mt-8">
              <p className="text-lg md:text-xl text-[#666666] leading-relaxed max-w-2xl mx-auto">
                <span className="text-[#ff3333]">&gt;</span> Explore my open-source projects and personal work.
                Each project represents my journey as a developer and my passion for creating{' '}
                <span className="text-white">innovative solutions</span>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Search */}
            <div className="mb-8 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
                size={18}
              />
              <Input
                className="pl-10 bg-[#0a0a0a]/50 border border-[#666666] text-white placeholder:text-[#666666] focus:border-[#ff3333] focus:outline-none transition-colors"
                type="search"
                value={search}
                onChange={handleSearchInput}
                placeholder="Search repositories..."
              />
            </div>

            {/* Main Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`px-4 py-2 border transition-colors ${
                    filter === filterOption.value
                      ? "border-[#ff3333] text-[#ff3333] bg-[#ff3333]/10"
                      : "border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333]"
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>

            {/* Advanced Filters */}
            <Collapsible
              open={isFiltersOpen}
              onOpenChange={setIsFiltersOpen}
              className="mb-6 space-y-2"
            >
              <div className="flex items-center gap-2">
                <CollapsibleTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#666666] hover:text-white rounded-md border border-[#666666] hover:border-[#ff3333] transition-colors">
                  <Filter size={16} />
                  {isFiltersOpen ? "Hide Filters" : "Show Filters"}
                  {selectedLanguage !== "all" && (
                    <Badge className="ml-2 bg-[#ff3333]/20 text-[#ff3333] border border-[#ff3333]">
                      {selectedLanguage}
                    </Badge>
                  )}
                </CollapsibleTrigger>

                {selectedLanguage !== "all" && (
                  <button
                    onClick={() => setSelectedLanguage("all")}
                    className="text-sm text-[#666666] hover:text-[#ff3333]"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <CollapsibleContent className="pt-2 pb-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#666666] mb-2 block">
                      Programming Language
                    </label>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-full md:w-[180px] bg-[#0a0a0a]/50 border border-[#666666] text-white focus:border-[#ff3333]">
                        <SelectValue placeholder="Select language" />
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
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Language Tags */}
            {languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <Toggle
                  pressed={selectedLanguage === "all"}
                  onClick={() => setSelectedLanguage("all")}
                  variant="outline"
                  size="sm"
                  className="text-sm bg-[#0a0a0a]/50 border border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] data-[state=on]:bg-[#ff3333]/10 data-[state=on]:border-[#ff3333] data-[state=on]:text-[#ff3333]"
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
                    className="text-sm bg-[#0a0a0a]/50 border border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] data-[state=on]:bg-[#ff3333]/10 data-[state=on]:border-[#ff3333] data-[state=on]:text-[#ff3333]"
                  >
                    {language}
                  </Toggle>
                ))}
                {languages.length > 5 && (
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="text-sm underline text-[#666666] hover:text-[#ff3333]"
                  >
                    {languages.length - 5} more...
                  </button>
                )}
              </div>
            )}

            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-48 bg-[#666666]/10 border border-[#666666]"
                  ></div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-[#666666]/10 border border-[#ff3333] text-center py-8">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-[#ff3333]" />
                <p className="text-[#ff3333] mb-4">
                  Failed to load projects. Please try again later.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333]/10 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : repos?.length === 0 ? (
              <div className="bg-[#666666]/10 border border-[#666666] text-center py-8">
                <p className="text-[#666666] mb-4">
                  No repositories found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setFilter("all");
                    setSelectedLanguage("all");
                  }}
                  className="px-4 py-2 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333]/10 transition-colors"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos?.map((repo: Repository) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="py-12 px-4 md:px-8 border-t-4 border-white text-center">
            <pre className="text-[#666666]">END OF TRANSMISSION</pre>
        </footer>
      </main>
    </div>
  );
};

export default Projects;
