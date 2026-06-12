// PROTOTYPE — variant C "terminal takeover". The whole page is a terminal
// session: boot lines, then each section is a command that types itself as
// it scrolls into view (GSAP TextPlugin) followed by its output, under a CRT
// scanline overlay. Throwaway code; do not promote as-is.
import { ReactNode, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { HomeVariantProps } from "./types";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

const SKILL_TREE = [
  "skills/",
  "├── frontend",
  "│   ├── react",
  "│   ├── vue",
  "│   └── typescript",
  "├── backend",
  "│   ├── node.js",
  "│   ├── python",
  "│   └── fastapi",
  "└── devops",
  "    ├── docker",
  "    └── aws",
];

const PROMPT = "liangshih@baoge.dev:~$";

const CommandBlock = ({
  command,
  children,
}: {
  command: string;
  children: ReactNode;
}) => (
  <section data-block className="mt-12">
    <p className="text-sm">
      <span className="text-emerald-400">{PROMPT}</span>{" "}
      <span data-cmd data-command={command} className="text-white" />
    </p>
    <div data-out className="mt-3 space-y-1 text-sm leading-relaxed">
      {children}
    </div>
  </section>
);

const VariantTerminal = ({ repos, reposLoading, posts }: HomeVariantProps) => {
  const container = useRef<HTMLDivElement>(null);
  const featured = repos.slice(0, 5);
  const writing = posts.slice(0, 3);

  useGSAP(
    () => {
      gsap.set("[data-out] > *", { autoAlpha: 0 });

      gsap.fromTo(
        "[data-boot] > *",
        { autoAlpha: 0 },
        { autoAlpha: 1, stagger: 0.25, duration: 0.05, delay: 0.3 },
      );

      gsap.utils.toArray<HTMLElement>("[data-block]").forEach((block) => {
        const cmd = block.querySelector<HTMLElement>("[data-cmd]");
        const outs = block.querySelectorAll<HTMLElement>("[data-out] > *");
        const command = cmd?.dataset.command ?? "";
        const tl = gsap.timeline({
          scrollTrigger: { trigger: block, start: "top 80%" },
        });
        if (cmd) {
          tl.to(cmd, {
            text: command,
            duration: Math.min(1.2, command.length * 0.05),
            ease: "none",
          });
        }
        tl.to(
          outs,
          { autoAlpha: 1, duration: 0.25, stagger: 0.08, ease: "power1.out" },
          "+=0.15",
        );
      });

      gsap.to("[data-cursor]", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.55,
        ease: "steps(1)",
      });
    },
    { scope: container, dependencies: [featured.length], revertOnUpdate: true },
  );

  return (
    <div
      ref={container}
      className="min-h-screen bg-[#0a0e14] font-mono text-night-fg"
      style={{ textShadow: "0 0 10px rgba(52,211,153,0.18)" }}
    >
      {/* CRT overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px), radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* window chrome */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-[#0a0e14]/95 px-4 py-3 text-xs text-night-muted">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        </span>
        <span className="mx-auto">{PROMPT.replace("$", "")} — session</span>
        <nav className="flex gap-4">
          <Link to="/projects" className="hover:text-emerald-400">
            /projects
          </Link>
          <Link to="/blog" className="hover:text-emerald-400">
            /blog
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-40 pt-24">
        {/* boot sequence */}
        <div data-boot className="space-y-1 text-sm text-night-muted">
          <p>
            <span className="text-emerald-400">[ ok ]</span> mounting
            /dev/portfolio
          </p>
          <p>
            <span className="text-emerald-400">[ ok ]</span> baoge.dev
            v2.0.0-prototype
          </p>
          <p>last login: just now from 127.0.0.1</p>
        </div>

        <CommandBlock command="whoami">
          <p className="text-lg text-white">liang-shih lin</p>
          <p>full-stack developer — systems that work</p>
          <p>
            8+ years turning complex problems into clean, efficient solutions.
          </p>
          <p className="text-emerald-400">
            status: available — taiwan, utc+8
          </p>
        </CommandBlock>

        <CommandBlock command="tree skills/">
          {SKILL_TREE.map((line) => (
            <p key={line} className="whitespace-pre">
              {line}
            </p>
          ))}
        </CommandBlock>

        <CommandBlock command="ls -la projects/">
          {reposLoading ? (
            <p className="text-night-muted">fetching repositories…</p>
          ) : featured.length === 0 ? (
            <p className="text-night-muted">
              ls: cannot access 'projects/': github api unavailable —{" "}
              <Link to="/projects" className="text-emerald-400 hover:underline">
                see all projects
              </Link>
            </p>
          ) : (
            featured.map((repo) => (
              <p key={repo.id}>
                <span className="text-night-faint">drwxr-xr-x</span>{" "}
                <span className="inline-block w-14 text-night-muted">
                  ★{repo.stargazers_count}
                </span>{" "}
                <span className="inline-block w-28 text-night-muted">
                  {(repo.language ?? "—").toLowerCase()}
                </span>{" "}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-emerald-400"
                >
                  {repo.name}/
                </a>
                {repo.description && (
                  <span className="text-night-muted">
                    {"  "}# {repo.description}
                  </span>
                )}
              </p>
            ))
          )}
        </CommandBlock>

        <CommandBlock command="tail -n 3 writing.log">
          {writing.map((post) => (
            <p key={post.slug}>
              <span className="text-night-faint">
                [{new Date(post.date).toISOString().slice(0, 10)}]
              </span>{" "}
              <Link
                to={`/blog/${post.slug}`}
                className="text-white hover:text-emerald-400"
              >
                {post.title}
              </Link>
            </p>
          ))}
        </CommandBlock>

        <CommandBlock command="echo $CONTACT">
          <p className="text-white">got an interesting problem?</p>
          <p className="space-x-6">
            <a
              href="https://github.com/ll931217"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              github.com/ll931217
            </a>
            <a
              href="https://www.linkedin.com/in/ll931217/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              linkedin/ll931217
            </a>
            <a
              href="mailto:liangshihlin@gmail.com"
              className="text-emerald-400 hover:underline"
            >
              liangshihlin@gmail.com
            </a>
          </p>
        </CommandBlock>

        {/* live prompt */}
        <p className="mt-16 text-sm">
          <span className="text-emerald-400">{PROMPT}</span>{" "}
          <span
            data-cursor
            className="inline-block h-4 w-2 translate-y-0.5 bg-emerald-400"
          />
        </p>
        <p className="mt-2 text-xs text-night-faint">
          psst — try ↑ ↑ ↓ ↓ ← → ← → b a
        </p>
      </main>
    </div>
  );
};

export default VariantTerminal;
