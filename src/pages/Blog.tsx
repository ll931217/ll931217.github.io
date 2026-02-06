import { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts } from "@/lib/blogLoader";
import type { Blog as BlogType } from "@/types/blog";
import { Search } from "lucide-react";
import InteractiveGrid from "@/components/three/InteractiveGrid";
import MinimalNav from "@/components/layout/MinimalNav";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const [scroll, setScroll] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
    <div className="bg-[#0a0a0a] text-white font-ibm-mono min-h-screen overflow-x-hidden">
      <div className="scanlines" />
      <div className="noise-overlay" />

      <InteractiveGrid />

      <MinimalNav />

      <div className="fixed top-4 right-4 text-[#ff3333] z-50 mix-blend-difference text-sm md:text-base">
        [{scroll}%]
      </div>

      <main className="relative z-10">
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
                  BLOG
                </h1>
                <p className="mt-4 text-sm md:text-base text-[#666666] max-w-xl">
                  <span className="text-[#ff3333]">&gt;</span> Thoughts, tutorials, and insights about programming and tech.
                </p>
              </div>

              {/* Compact Search */}
              <div className="relative w-full md:w-64 shrink-0">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 h-10 bg-[#0a0a0a]/50 border border-[#666666] text-white placeholder:text-[#666666] focus:outline-none focus:border-[#ff3333] transition-colors text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 text-sm border transition-colors ${
                  selectedTag === null
                    ? "border-[#ff3333] text-[#ff3333] bg-[#ff3333]/10"
                    : "border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333]"
                }`}
              >
                All
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1.5 text-sm border transition-colors ${
                    tag === selectedTag
                      ? "border-[#ff3333] text-[#ff3333] bg-[#ff3333]/10"
                      : "border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            {sortedPosts.length === 0 ? (
              <div className="bg-[#666666]/10 border border-[#666666] text-center py-12">
                <p className="text-[#666666] mb-4">
                  No blog posts found
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="px-4 py-2 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333]/10 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {sortedPosts.map((post: BlogType) => (
                  <BlogCard key={post.slug} blog={post} />
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

export default Blog;
