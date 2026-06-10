import { useRef, useState } from "react";
import { Search } from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts } from "@/lib/blogLoader";
import type { Blog as BlogType } from "@/types/blog";
import {
  KeyboardCheatSheet,
  KeyboardHelpButton,
} from "@/components/ui/KeyboardCheatSheet";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcut";
import EmptyState from "@/components/ui/EmptyState";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts(
    {
      "/": () => searchInputRef.current?.focus(),
      "?": () => setShowKeyboardHelp(true),
      Escape: () => {
        if (showKeyboardHelp) {
          setShowKeyboardHelp(false);
        } else if (searchQuery || selectedTag) {
          setSearchQuery("");
          setSelectedTag(null);
        }
      },
    },
    true,
  );

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
    <SidebarLayout>
      <section>
        <h2 className="text-emerald-400 text-sm mb-6">
          <span className="text-night-faint">01.</span> writing
        </h2>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-sm text-night-muted leading-relaxed max-w-md">
            Thoughts, tutorials, and insights about programming and tech.
          </p>

          <div className="relative w-full md:w-72 shrink-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-night-faint"
              size={14}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="search… (press /)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 h-10 bg-transparent border border-white/10 text-night-fg placeholder:text-night-faint focus:outline-none focus:border-emerald-400 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-xs border transition-colors ${
              selectedTag === null
                ? "border-emerald-400/60 text-emerald-400 bg-emerald-400/10"
                : "border-white/10 text-night-muted hover:border-emerald-400/60 hover:text-emerald-400"
            }`}
          >
            all
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 text-xs border transition-colors ${
                tag === selectedTag
                  ? "border-emerald-400/60 text-emerald-400 bg-emerald-400/10"
                  : "border-white/10 text-night-muted hover:border-emerald-400/60 hover:text-emerald-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {sortedPosts.length === 0 ? (
            <EmptyState
              type="search"
              actionLabel="clear filters"
              onAction={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
            />
          ) : (
            <ul className="space-y-px">
              {sortedPosts.map((post: BlogType) => (
                <li key={post.slug}>
                  <BlogCard blog={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <KeyboardHelpButton onClick={() => setShowKeyboardHelp(true)} />
      <KeyboardCheatSheet
        isOpen={showKeyboardHelp}
        onClose={() => setShowKeyboardHelp(false)}
      />
    </SidebarLayout>
  );
};

export default Blog;
