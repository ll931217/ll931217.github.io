// PROTOTYPE — throwaway redesign variant (A of 3). Home page redesign variants are
// switchable via ?variant= on the existing / route. Delete this folder once a winner
// is picked and folded into the real page. See src/pages/Index.tsx for the switcher.
//
// Variant A — "Editorial": warm paper, large serif type, magazine masthead,
// content as a numbered index. The anti-terminal.
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "@/lib/github";
import { getAllBlogPosts } from "@/lib/blogLoader";
import { Repository } from "@/types/repository";

const CAPABILITIES = [
  "React",
  "Vue",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "Docker",
  "AWS",
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const VariantEditorial = () => {
  const { data: repos, isLoading } = useQuery({
    queryKey: ["featured-repos"],
    queryFn: () => fetchRepositories("featuredOnly"),
  });
  const featured = (repos ?? []).slice(0, 3);
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1c1814] font-source-serif">
      {/* Masthead */}
      <header className="border-b border-[#1c1814] px-6 md:px-12">
        <div className="max-w-5xl mx-auto py-5 flex items-baseline justify-between gap-4">
          <span className="font-playfair font-bold text-lg tracking-tight">
            L.S. Lin
          </span>
          <nav className="flex gap-6 text-sm tracking-widest uppercase">
            <Link to="/projects" className="hover:text-[#b1432c] transition-colors">
              Projects
            </Link>
            <Link to="/blog" className="hover:text-[#b1432c] transition-colors">
              Journal
            </Link>
            <a
              href="https://github.com/ll931217"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#b1432c] transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto border-t border-[#1c1814]/20 py-2 flex justify-between text-xs tracking-widest uppercase text-[#1c1814]/60">
          <span>Portfolio &amp; Journal</span>
          <span>Taiwan — Est. 8+ years in software</span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto py-20 md:py-32">
          <p className="text-sm tracking-[0.3em] uppercase text-[#b1432c] mb-8">
            Liang-Shih Lin — Full-stack developer
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl leading-[1.05] tracking-tight">
            Building systems
            <br />
            that <em className="text-[#b1432c]">simply work.</em>
          </h1>
          <p className="mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-[#1c1814]/75">
            Eight years turning complex problems into clean, efficient
            solutions — from frontend interfaces to backend architectures,
            built to be reliable, scalable, and maintainable.
          </p>
          <div className="mt-12 flex flex-wrap gap-x-3 gap-y-2 text-sm tracking-wide text-[#1c1814]/60">
            {CAPABILITIES.map((cap, i) => (
              <span key={cap}>
                {cap}
                {i < CAPABILITIES.length - 1 && (
                  <span className="ml-3 text-[#b1432c]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Project index */}
      <section className="px-6 md:px-12 border-t border-[#1c1814]">
        <div className="max-w-5xl mx-auto py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-playfair text-3xl md:text-4xl">Selected Work</h2>
            <Link
              to="/projects"
              className="text-sm tracking-widest uppercase text-[#b1432c] hover:underline underline-offset-4"
            >
              Full index →
            </Link>
          </div>

          {isLoading ? (
            <p className="text-[#1c1814]/50 italic py-8">Loading the index…</p>
          ) : featured.length === 0 ? (
            <p className="text-[#1c1814]/50 italic py-8">
              The index is unavailable at the moment.
            </p>
          ) : (
            <ol>
              {featured.map((repo: Repository, i) => (
                <li key={repo.id} className="border-t border-[#1c1814]/20 group">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_auto] gap-4 py-8 items-baseline"
                  >
                    <span className="font-playfair text-2xl text-[#1c1814]/30 group-hover:text-[#b1432c] transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-playfair text-2xl md:text-3xl group-hover:italic transition-all">
                        {repo.name}
                      </span>
                      <span className="block mt-2 text-[#1c1814]/65 max-w-lg leading-relaxed">
                        {repo.description}
                      </span>
                    </span>
                    <span className="hidden md:block text-right text-sm text-[#1c1814]/50 tracking-wide">
                      {repo.language ?? "—"}
                      <span className="block mt-1">★ {repo.stargazers_count}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Journal */}
      <section className="px-6 md:px-12 border-t border-[#1c1814]">
        <div className="max-w-5xl mx-auto py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-playfair text-3xl md:text-4xl">Journal</h2>
            <Link
              to="/blog"
              className="text-sm tracking-widest uppercase text-[#b1432c] hover:underline underline-offset-4"
            >
              All entries →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#1c1814]/20 border border-[#1c1814]/20">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bg-[#f7f3ec] p-8 hover:bg-[#f1ebe0] transition-colors group"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-[#1c1814]/50">
                  {formatDate(post.date)}
                  {post.readingTime ? ` — ${post.readingTime}` : ""}
                </p>
                <h3 className="font-playfair text-xl mt-4 leading-snug group-hover:text-[#b1432c] transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1c1814]/65 line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Colophon */}
      <footer className="px-6 md:px-12 border-t border-[#1c1814]">
        <div className="max-w-5xl mx-auto py-12 flex flex-col md:flex-row justify-between gap-6 text-sm text-[#1c1814]/60">
          <p className="font-playfair text-lg text-[#1c1814]">
            Let’s build something that lasts.
          </p>
          <div className="flex gap-8 tracking-widest uppercase">
            <a
              href="https://github.com/ll931217"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#b1432c] transition-colors"
            >
              github.com/ll931217
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VariantEditorial;
