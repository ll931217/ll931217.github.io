
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import GlowCard from '../ui/GlowCard';
import LanguageBadge from '../ui/LanguageBadge';
import { Repository } from '@/types/repository';

interface ProjectCardProps {
  repo: Repository;
}

const ProjectCard = ({ repo }: ProjectCardProps) => {
  return (
    <GlowCard className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-tokyo-accent">{repo.name}</h3>
          <div className="flex space-x-3">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-tokyo-comment hover:text-tokyo-accent transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={18} />
            </a>
            {repo.homepage && (
              <a 
                href={repo.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-tokyo-comment hover:text-tokyo-accent transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-tokyo-fg/90 mb-4 flex-grow">
          {repo.description || "No description provided."}
        </p>
        
        <div className="mt-auto">
          {repo.language && (
            <div className="flex items-center mt-2">
              <LanguageBadge language={repo.language} />
              
              {repo.stargazers_count > 0 && (
                <span className="ml-4 flex items-center text-sm text-tokyo-comment">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {repo.stargazers_count}
                </span>
              )}
              
              {repo.forks_count > 0 && (
                <span className="ml-4 flex items-center text-sm text-tokyo-comment">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 mr-1"
                  >
                    <line x1="6" y1="3" x2="6" y2="15" />
                    <circle cx="18" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 9a9 9 0 0 1-9 9" />
                  </svg>
                  {repo.forks_count}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default ProjectCard;
