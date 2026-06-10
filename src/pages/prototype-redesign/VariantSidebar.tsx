// PROTOTYPE — throwaway redesign variant (C of 3). Home page redesign variants are
// switchable via ?variant= on the existing / route. Delete this folder once a winner
// is picked and folded into the real page. See src/pages/Index.tsx for the switcher.
//
// Variant C — "Sidebar": fixed identity rail on the left, content scrolls on the
// right. Keeps the developer-mono voice but calm — no glitch, green accent.
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "@/lib/github";
import { getAllBlogPosts } from "@/lib/blogLoader";
import { Repository } from "@/types/repository";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "writing", label: "writing" },
  { id: "contact", label: "contact" },
];

const SKILLS = {
  frontend: ["react", "vue", "typescript"],
  backend: ["node.js", "python", "fastapi"],
  devops: ["docker", "aws"],
};

const VariantSidebar = () => {
  const { data: repos, isLoading } = useQuery({
    queryKey: ["featured-repos"],
    queryFn: () => fetchRepositories("featuredOnly"),
  });
  const featured = (repos ?? []).slice(0, 3);
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono md:flex">
      {/* Identity rail */}
      <aside className="md:fixed md:inset-y-0 md:left-0 md:w-72 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between bg-[#0d1117] z-10">
        <div>
          <p className="text-emerald-400 text-xs mb-6">~/baoge.dev</p>
          <h1 className="text-2xl font-bold text-white leading-tight">
            Liang-Shih
            <br />
            Lin
          </h1>
          <p className="mt-3 text-sm text-[#8b949e] leading-relaxed">
            full-stack developer
            <br />
            systems that work
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            available — taiwan, utc+8
          </p>

          <nav className="mt-10 hidden md:block">
            <ul className="space-y-3 text-sm">
              {SECTIONS.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-3 text-[#8b949e] hover:text-emerald-400 transition-colors"
                  >
                    <span className="text-xs text-[#484f58] group-hover:text-emerald-400/60">
                      0{i + 1}
                    </span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 md:mt-0 flex md:flex-col gap-4 md:gap-2 text-xs text-[#8b949e]">
          <a
            href="https://github.com/ll931217"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            github ↗
          </a>
          <Link to="/projects" className="hover:text-emerald-400 transition-colors">
            all projects →
          </Link>
          <Link to="/blog" className="hover:text-emerald-400 transition-colors">
            all posts →
          </Link>
        </div>
      </aside>

      {/* Content pane */}
      <main className="md:ml-72 flex-1 px-8 md:px-16 py-16 space-y-24 max-w-4xl">
        <section id="about">
          <h2 className="text-emerald-400 text-sm mb-6">
            <span className="text-[#484f58]">01.</span> about
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-white max-w-xl">
            8+ years turning complex problems into clean, efficient solutions.
            From frontend interfaces to backend architectures — reliable,
            scalable, maintainable.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group}>
                <p className="text-[#8b949e] mb-2">{group}/</p>
                <ul className="space-y-1 text-[#c9d1d9]">
                  {items.map((item, i) => (
                    <li key={item}>
                      <span className="text-[#484f58]">
                        {i === items.length - 1 ? "└── " : "├── "}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-emerald-400 text-sm mb-6">
            <span className="text-[#484f58]">02.</span> projects
          </h2>
          {isLoading ? (
            <p className="text-[#8b949e] text-sm">fetching repositories…</p>
          ) : featured.length === 0 ? (
            <p className="text-[#8b949e] text-sm">
              github api unavailable —{" "}
              <Link to="/projects" className="text-emerald-400 hover:underline">
                see all projects
              </Link>
            </p>
          ) : (
            <ul className="space-y-px">
              {featured.map((repo: Repository) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-l-2 border-white/10 hover:border-emerald-400 pl-6 py-4 transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-white group-hover:text-emerald-400 transition-colors font-bold">
                        {repo.name}
                      </span>
                      <span className="text-xs text-[#8b949e] whitespace-nowrap">
                        {repo.language ?? ""} ★{repo.stargazers_count}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#8b949e] leading-relaxed max-w-lg">
                      {repo.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="writing">
          <h2 className="text-emerald-400 text-sm mb-6">
            <span className="text-[#484f58]">03.</span> writing
          </h2>
          <ul className="space-y-px">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block border-l-2 border-white/10 hover:border-emerald-400 pl-6 py-4 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-white group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </span>
                    <span className="text-xs text-[#8b949e] whitespace-nowrap">
                      {new Date(post.date).toISOString().slice(0, 10)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#8b949e] leading-relaxed max-w-lg line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="pb-16">
          <h2 className="text-emerald-400 text-sm mb-6">
            <span className="text-[#484f58]">04.</span> contact
          </h2>
          <p className="text-lg text-white">
            Got an interesting problem?
          </p>
          <a
            href="https://github.com/ll931217"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block border border-emerald-400/40 text-emerald-400 px-6 py-3 text-sm hover:bg-emerald-400/10 transition-colors"
          >
            $ open github.com/ll931217
          </a>
        </section>
      </main>
    </div>
  );
};

export default VariantSidebar;
