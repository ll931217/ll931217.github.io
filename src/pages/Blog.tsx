import { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts } from "@/lib/blogLoader";
import type { Blog as BlogType } from "@/types/blog";
import { Search } from "lucide-react";
import InteractiveGrid from "@/components/three/InteractiveGrid";
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
              BLOG
            </h1>

            <div className="space-y-6 mt-8">
              <p className="text-lg md:text-xl text-[#666666] leading-relaxed max-w-2xl mx-auto">
                <span className="text-[#ff3333]">&gt;</span> Thoughts, tutorials, and insights about programming, web development, and technology.
              </p>
              <p className="text-sm md:text-base text-[#666666] leading-relaxed max-w-2xl mx-auto">
                I try to keep my blog posts as short as possible since I am someone that doesn't like reading, so why should I subject my viewers to more reading ;)
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a]/50 border border-[#666666] text-white placeholder:text-[#666666] rounded-none focus:outline-none focus:border-[#ff3333] transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 border text-sm transition-colors ${
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
                    className={`px-3 py-1 border text-sm transition-colors ${
                      tag === selectedTag
                        ? "border-[#ff3333] text-[#ff3333] bg-[#ff3333]/10"
                        : "border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {sortedPosts.length === 0 ? (
              <div className="bg-[#666666]/10 border border-[#666666] text-center py-8">
                <p className="text-[#666666] mb-4">
                  No blog posts found matching your criteria.
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPosts.map((post: BlogType) => (
                  <BlogCard key={post.slug} blog={post} />
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

export default Blog;
