// PROTOTYPE — throwaway redesign variant (B of 3). Home page redesign variants are
// switchable via ?variant= on the existing / route. Delete this folder once a winner
// is picked and folded into the real page. See src/pages/Index.tsx for the switcher.
//
// Variant B — "Bento": refined dark, everything on one screen as a tile grid.
// Hierarchy comes from tile size, not scroll order.
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "@/lib/github";
import { getAllBlogPosts } from "@/lib/blogLoader";
import { Repository } from "@/types/repository";

const SKILLS = [
  "React",
  "Vue",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "Docker",
  "AWS",
];

const tile =
  "rounded-3xl border border-white/[0.07] bg-[#12151d] p-6 transition-colors duration-300 hover:border-white/[0.16]";

const VariantBento = () => {
  const { data: repos, isLoading } = useQuery({
    queryKey: ["featured-repos"],
    queryFn: () => fetchRepositories("featuredOnly"),
  });
  const featured = (repos ?? []).slice(0, 3);
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 font-dm-sans px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 auto-rows-auto gap-4">
        {/* Intro — the anchor tile */}
        <div className={`${tile} md:col-span-4 md:row-span-2 flex flex-col justify-between bg-gradient-to-br from-[#141926] to-[#0e1117]`}>
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to interesting problems
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Liang-Shih Lin
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-md leading-relaxed">
              Full-stack developer building systems that work. 8+ years of
              reliable, scalable, maintainable software.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-full bg-white text-[#0a0c10] px-5 py-2.5 text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              View projects
            </Link>
            <Link
              to="/blog"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:border-white/40 transition-colors"
            >
              Read the blog
            </Link>
          </div>
        </div>

        {/* Location */}
        <div className={`${tile} md:col-span-2 flex flex-col justify-between`}>
          <MapPin className="h-5 w-5 text-sky-400" />
          <div className="mt-6">
            <p className="text-2xl font-bold text-white">Taiwan</p>
            <p className="text-sm text-slate-500 mt-1">UTC+8 — remote friendly</p>
          </div>
        </div>

        {/* Skills */}
        <div className={`${tile} md:col-span-2`}>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Featured projects — one tile each */}
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className={`${tile} md:col-span-2 h-44 animate-pulse bg-[#10131a]`}
              />
            ))
          : featured.map((repo: Repository) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${tile} md:col-span-2 group flex flex-col justify-between min-h-44`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {repo.name}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {repo.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stargazers_count}
                  </span>
                </div>
              </a>
            ))}

        {/* Recent writing — vertical list tile */}
        <div className={`${tile} md:col-span-4`}>
          <div className="flex items-baseline justify-between mb-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Recent writing
            </p>
            <Link
              to="/blog"
              className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
            >
              All posts →
            </Link>
          </div>
          <ul className="divide-y divide-white/[0.06]">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex items-baseline justify-between gap-4 py-3 group"
                >
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                    {post.title}
                  </span>
                  <span className="text-xs text-slate-600 whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <a
          href="https://github.com/ll931217"
          target="_blank"
          rel="noopener noreferrer"
          className={`${tile} md:col-span-2 group flex flex-col justify-between bg-gradient-to-br from-sky-500/15 to-indigo-500/10`}
        >
          <ArrowUpRight className="h-5 w-5 text-sky-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          <div className="mt-6">
            <p className="text-lg font-bold text-white">Let’s talk</p>
            <p className="text-sm text-slate-400 mt-1">github.com/ll931217</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default VariantBento;
