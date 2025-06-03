import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts } from "@/lib/blogLoader";
import type { Blog as BlogType } from "@/types/blog";
import { Search } from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Load blog posts from markdown files
  const blogPosts = getAllBlogPosts();

  // Extract all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  // Filter posts based on search query and selected tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  // Sort posts by date (most recent first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-tokyo-blue">Blog</h1>
        <p className="mb-8 text-tokyo-fg/90">
          Thoughts, tutorials, and insights about programming, web development,
          and technology. <br />
          <br />I try to keep my blog posts as short as possible since I am
          someone that doesn't like reading, so why should I subject my viewers
          to more reading ;)
        </p>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tokyo-comment"
              size={18}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-tokyo-bg border border-tokyo-selection rounded-md focus:outline-none focus:border-tokyo-accent transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === null
                  ? "bg-tokyo-accent text-tokyo-bg"
                  : "bg-tokyo-selection/40 text-tokyo-fg hover:bg-tokyo-selection"
              }`}
            >
              All
            </button>

            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  tag === selectedTag
                    ? "bg-tokyo-accent text-tokyo-bg"
                    : "bg-tokyo-selection/40 text-tokyo-fg hover:bg-tokyo-selection"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {sortedPosts.length === 0 ? (
          <div className="tokyo-card bg-tokyo-selection/10 text-center py-8">
            <p className="text-tokyo-comment mb-4">
              No blog posts found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="tokyo-button"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post: BlogType) => (
              <BlogCard key={post.slug} blog={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
