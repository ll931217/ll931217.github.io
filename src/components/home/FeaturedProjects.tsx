import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "../project/ProjectCard";
import { fetchRepositories } from "@/lib/github";
import { Repository } from "@/types/repository";

const FeaturedProjects = () => {
  const {
    data: repos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-repos"],
    queryFn: () => fetchRepositories("featuredOnly"),
  });

  const featuredRepos = repos?.slice(0, 3) || [];

  return (
    <section className="py-16 px-4 md:px-8 border-t-2 border-dashed border-[#666666]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#ff3333] text-xl font-bold">
            [PROJECTS]
          </h2>

          <Link
            to="/projects"
            className="text-[#666666] hover:text-[#ff3333] flex items-center transition-colors text-sm"
          >
            VIEW ALL
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 animate-pulse">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 bg-[#1a1a1a] border border-[#333333]"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="border-2 border-[#ff3333] bg-[#1a1a1a] text-center py-8">
            <p className="text-[#ff3333] mb-4">ERROR: Unable to load projects</p>
            <Link to="/projects" className="border border-[#666666] px-4 py-2 text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] transition-colors">
              RETRY
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRepos.map((repo: Repository) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
