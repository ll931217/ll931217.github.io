
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogCard from './BlogCard';
import { getAllBlogPosts } from '@/lib/blogLoader';

const RecentPosts = () => {
  const blogPosts = getAllBlogPosts();
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 border-t border-tokyo-selection">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-tokyo-blue">
            Recent Blog Posts
          </h2>
          
          <Link 
            to="/blog" 
            className="text-tokyo-accent hover:text-tokyo-blue flex items-center transition-colors"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
