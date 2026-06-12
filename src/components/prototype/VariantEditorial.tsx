// PROTOTYPE — variant A "kinetic editorial". Full-bleed typographic layout:
// massive mono display type, GSAP line reveals, skills marquee, pinned
// horizontal-scroll projects, oversized contact. No sidebar — the type is
// the interface. Throwaway code; do not promote as-is.
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HomeVariantProps } from "./types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SKILLS = [
  "react",
  "vue",
  "typescript",
  "node.js",
  "python",
  "fastapi",
  "docker",
  "aws",
];

const HERO_LINES = ["LIANG-", "SHIH", "LIN"];

const VariantEditorial = ({ repos, reposLoading, posts }: HomeVariantProps) => {
  const container = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const featured = repos.slice(0, 4);
  const writing = posts.slice(0, 3);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-line-inner",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.15,
        },
      );
      gsap.fromTo(
        ".hero-meta",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 },
      );

      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      const track = trackRef.current;
      if (track && featured.length > 0) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    },
    { scope: container, dependencies: [featured.length], revertOnUpdate: true },
  );

  return (
    <div
      ref={container}
      className="min-h-screen overflow-x-clip bg-night font-mono text-night-fg"
    >
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-night/80 px-6 py-4 text-xs backdrop-blur md:px-12">
        <span className="text-emerald-400">~/baoge.dev</span>
        <nav className="flex items-center gap-6 text-night-muted">
          <Link to="/projects" className="transition-colors hover:text-emerald-400">
            projects
          </Link>
          <Link to="/blog" className="transition-colors hover:text-emerald-400">
            writing
          </Link>
          <a href="#contact" className="transition-colors hover:text-emerald-400">
            contact
          </a>
          <span className="hidden items-center gap-2 text-emerald-400 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            available
          </span>
        </nav>
      </header>

      {/* hero */}
      <section className="relative flex min-h-screen flex-col justify-end px-6 pb-16 pt-32 md:px-12">
        <p className="hero-meta mb-6 text-sm text-emerald-400">
          $ whoami — full-stack developer, taiwan utc+8
        </p>
        <h1 className="text-[16vw] font-bold leading-[0.85] tracking-tighter md:text-[13vw]">
          {HERO_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className={`hero-line-inner block ${
                  i === 1
                    ? "text-transparent"
                    : "text-white"
                }`}
                style={
                  i === 1
                    ? { WebkitTextStroke: "2px rgb(52 211 153)" }
                    : undefined
                }
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="hero-meta mt-10 flex flex-wrap items-end justify-between gap-6 text-sm text-night-muted">
          <p className="max-w-md leading-relaxed">
            8+ years turning complex problems into clean, efficient solutions —
            reliable, scalable, maintainable.
          </p>
          <p className="text-night-faint">scroll ↓</p>
        </div>
      </section>

      {/* skills marquee */}
      <section
        aria-label="skills"
        className="overflow-hidden border-y border-white/10 py-5"
      >
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap text-lg text-night-muted">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {SKILLS.map((skill) => (
                <span key={skill} className="flex items-center gap-8">
                  <span className="text-emerald-400/60">▪</span>
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* projects — pinned horizontal scroll */}
      <section ref={pinRef} className="relative">
        <div className="flex h-screen flex-col justify-center overflow-hidden">
          <p data-reveal className="px-6 text-sm text-emerald-400 md:px-12">
            <span className="text-night-faint">01.</span> projects — scroll to
            pan →
          </p>
          {reposLoading ? (
            <p className="mt-12 px-6 text-sm text-night-muted md:px-12">
              fetching repositories…
            </p>
          ) : featured.length === 0 ? (
            <p className="mt-12 px-6 text-sm text-night-muted md:px-12">
              github api unavailable —{" "}
              <Link to="/projects" className="text-emerald-400 hover:underline">
                see all projects
              </Link>
            </p>
          ) : (
            <div
              ref={trackRef}
              className="mt-10 flex w-max items-stretch gap-8 px-6 md:px-12"
            >
              {featured.map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-[82vw] flex-col justify-between border border-white/10 p-8 transition-colors hover:border-emerald-400/60 md:w-[55vw] md:p-12"
                >
                  <span className="text-7xl font-bold text-white/5 md:text-9xl">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-3xl font-bold text-white transition-colors group-hover:text-emerald-400 md:text-5xl">
                      {repo.name}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-night-muted">
                      {repo.description}
                    </p>
                    <p className="mt-6 text-xs text-night-faint">
                      {repo.language ?? "—"} ★{repo.stargazers_count}{" "}
                      <span className="ml-4 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                        open ↗
                      </span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* writing */}
      <section className="px-6 py-32 md:px-12">
        <p data-reveal className="text-sm text-emerald-400">
          <span className="text-night-faint">02.</span> writing
        </p>
        <ul className="mt-10">
          {writing.map((post) => (
            <li key={post.slug} data-reveal className="border-t border-white/10">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className="text-2xl font-bold text-white transition-all group-hover:translate-x-3 group-hover:text-emerald-400 md:text-4xl">
                  {post.title}
                </span>
                <span className="shrink-0 text-xs text-night-muted">
                  {new Date(post.date).toISOString().slice(0, 10)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/blog"
          data-reveal
          className="mt-6 inline-block text-sm text-night-muted transition-colors hover:text-emerald-400"
        >
          all posts →
        </Link>
      </section>

      {/* contact */}
      <section id="contact" className="border-t border-white/10 px-6 py-32 md:px-12">
        <p data-reveal className="text-sm text-emerald-400">
          <span className="text-night-faint">03.</span> contact
        </p>
        <p data-reveal className="mt-10 text-3xl text-white md:text-5xl">
          got an interesting problem?
        </p>
        <a
          data-reveal
          href="mailto:liangshihlin@gmail.com"
          className="mt-6 block w-fit text-[8vw] font-bold leading-none text-transparent transition-colors hover:text-emerald-400 md:text-[5vw]"
          style={{ WebkitTextStroke: "1.5px rgb(52 211 153)" }}
        >
          say→hello
        </a>
        <footer className="mt-24 flex flex-wrap gap-6 text-xs text-night-muted">
          <a
            href="https://github.com/ll931217"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-emerald-400"
          >
            github ↗
          </a>
          <a
            href="https://www.linkedin.com/in/ll931217/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-emerald-400"
          >
            linkedin ↗
          </a>
          <a
            href="mailto:liangshihlin@gmail.com"
            className="transition-colors hover:text-emerald-400"
          >
            mail ↗
          </a>
        </footer>
      </section>
    </div>
  );
};

export default VariantEditorial;
