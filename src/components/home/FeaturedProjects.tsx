
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '../project/ProjectCard';
import { fetchRepositories } from '@/lib/github';
import { Repository } from '@/types/repository';

const FeaturedProjects = () => {
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['featured-repos'],
    queryFn: () => fetchRepositories('featuredOnly'),
  });

  const featuredRepos = repos?.slice(0, 3) || [];

  return (
    <section className="py-16 border-t border-tokyo-selection">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-tokyo-cyan">
            Featured Projects
          </h2>
          
          <Link 
            to="/projects" 
            className="text-tokyo-accent hover:text-tokyo-cyan flex items-center transition-colors"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 animate-pulse">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="h-48 bg-tokyo-selection/20 rounded-lg"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="tokyo-card bg-tokyo-selection/10 text-center py-8">
            <p className="text-tokyo-magenta mb-4">
              Unable to load projects
            </p>
            <Link 
              to="/projects" 
              className="tokyo-button"
            >
              Try Again
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
