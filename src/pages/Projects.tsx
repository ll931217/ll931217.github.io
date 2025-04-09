
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/project/ProjectCard';
import { fetchRepositories, fetchLanguages } from '@/lib/github';
import { RepoFilter, Repository } from '@/types/repository';
import { AlertTriangle, Filter } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Projects = () => {
  const [filter, setFilter] = useState<RepoFilter>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Fetch all languages for the filter
  const { data: languages = [] } = useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
  });
  
  // Fetch repositories with filter and language
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['repositories', filter, selectedLanguage],
    queryFn: () => fetchRepositories(filter, selectedLanguage),
  });

  const filters: { value: RepoFilter; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'featured', label: 'Featured' },
    { value: 'recent', label: 'Recent' },
    { value: 'popular', label: 'Popular' },
  ];

  // Reset language filter when changing main filter
  useEffect(() => {
    setSelectedLanguage('all');
  }, [filter]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-tokyo-purple">Projects</h1>
        <p className="mb-8 text-tokyo-fg/90">
          Explore my open-source projects and personal work. Each project represents my journey as a developer and my passion for creating innovative solutions.
        </p>
        
        {/* Main Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {filters.map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === filterOption.value
                  ? 'bg-tokyo-accent text-tokyo-bg'
                  : 'bg-tokyo-selection/40 text-tokyo-fg hover:bg-tokyo-selection'
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
            <CollapsibleTrigger 
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-tokyo-comment hover:text-tokyo-fg rounded-md bg-tokyo-selection/20 hover:bg-tokyo-selection/40 transition-colors"
            >
              <Filter size={16} />
              {isFiltersOpen ? "Hide Filters" : "Show Filters"}
              {selectedLanguage !== 'all' && (
                <Badge className="ml-2 bg-tokyo-accent/20 text-tokyo-accent">
                  {selectedLanguage}
                </Badge>
              )}
            </CollapsibleTrigger>
            
            {selectedLanguage !== 'all' && (
              <button 
                onClick={() => setSelectedLanguage('all')}
                className="text-sm text-tokyo-comment hover:text-tokyo-fg"
              >
                Clear filters
              </button>
            )}
          </div>
          
          <CollapsibleContent className="pt-2 pb-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-tokyo-fg mb-2 block">
                  Programming Language
                </label>
                <Select 
                  value={selectedLanguage} 
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-full md:w-[180px] bg-tokyo-selection/20 border-tokyo-selection">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map(language => (
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
              pressed={selectedLanguage === 'all'} 
              onClick={() => setSelectedLanguage('all')}
              variant="outline"
              size="sm"
              className="text-sm bg-tokyo-selection/20 border-tokyo-selection hover:bg-tokyo-selection/40 data-[state=on]:bg-tokyo-accent/20 data-[state=on]:text-tokyo-accent"
            >
              All
            </Toggle>
            {languages.slice(0, 5).map(language => (
              <Toggle 
                key={language}
                pressed={selectedLanguage === language} 
                onClick={() => setSelectedLanguage(language)}
                variant="outline"
                size="sm"
                className="text-sm bg-tokyo-selection/20 border-tokyo-selection hover:bg-tokyo-selection/40 data-[state=on]:bg-tokyo-accent/20 data-[state=on]:text-tokyo-accent"
              >
                {language}
              </Toggle>
            ))}
            {languages.length > 5 && (
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="text-sm underline text-tokyo-comment hover:text-tokyo-accent"
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
                className="h-48 bg-tokyo-selection/20 rounded-lg"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="tokyo-card bg-tokyo-selection/10 text-center py-8">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-tokyo-magenta" />
            <p className="text-tokyo-magenta mb-4">
              Failed to load projects. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="tokyo-button"
            >
              Try Again
            </button>
          </div>
        ) : repos?.length === 0 ? (
          <div className="tokyo-card bg-tokyo-selection/10 text-center py-8">
            <p className="text-tokyo-comment mb-4">
              No repositories found matching your criteria.
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSelectedLanguage('all');
              }}
              className="tokyo-button"
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
    </Layout>
  );
};

export default Projects;
