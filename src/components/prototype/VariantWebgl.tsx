// PROTOTYPE — variant B "webgl depth". A fixed Three.js canvas renders an
// emerald particle-wave grid behind a centered column of glass panels; the
// camera descends toward the grid as you scroll and parallaxes with the
// pointer. Throwaway code; do not promote as-is.
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HomeVariantProps } from "./types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SKILLS: Record<string, string[]> = {
  frontend: ["react", "vue", "typescript"],
  backend: ["node.js", "python", "fastapi"],
  devops: ["docker", "aws"],
};

const VariantWebgl = ({ repos, reposLoading, posts }: HomeVariantProps) => {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const featured = repos.slice(0, 3);
  const writing = posts.slice(0, 3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGLRenderer throws where no GL context is available (headless,
    // remote desktops) — degrade to the static content instead of crashing
    // the whole React tree.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    } catch (error) {
      console.error("webgl variant: no GL context, skipping background", error);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d1117, 0.05);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 4, 12);

    // particle-wave grid in the XZ plane, displaced on Y each frame
    const COLS = 140;
    const ROWS = 80;
    const SPACING = 0.45;
    const positions = new Float32Array(COLS * ROWS * 3);
    let p = 0;
    for (let ix = 0; ix < COLS; ix++) {
      for (let iz = 0; iz < ROWS; iz++) {
        positions[p++] = (ix - COLS / 2) * SPACING;
        positions[p++] = 0;
        positions[p++] = (iz - ROWS / 2) * SPACING;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    points.position.y = -2.5;
    scene.add(points);

    const pointer = { x: 0, y: 0 };
    let scrollT = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollT = max > 0 ? window.scrollY / max : 0;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        pos.setY(
          i,
          Math.sin(x * 0.5 + t * 0.9) * 0.5 +
            Math.cos(z * 0.45 + t * 0.6) * 0.5,
        );
      }
      pos.needsUpdate = true;

      // descend toward the grid as the page scrolls, parallax with pointer
      camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04;
      camera.position.y +=
        (4 - scrollT * 4.5 - pointer.y * 0.6 - camera.position.y) * 0.05;
      camera.lookAt(0, -1.5, 0);
      points.rotation.y = scrollT * 0.5;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-item",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    },
    { scope: container, dependencies: [featured.length], revertOnUpdate: true },
  );

  return (
    <div
      ref={container}
      className="relative min-h-screen bg-night font-mono text-night-fg"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-0 h-full w-full"
        aria-hidden
      />

      <div className="relative z-10">
        {/* hero — dead centre over the grid */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="hero-item text-xs text-emerald-400">~/baoge.dev</p>
          <h1
            className="hero-item mt-6 text-5xl font-bold text-white md:text-7xl"
            style={{ textShadow: "0 0 48px rgba(52,211,153,0.35)" }}
          >
            Liang-Shih Lin
          </h1>
          <p className="hero-item mt-4 text-sm text-night-muted md:text-base">
            full-stack developer — systems that work
          </p>
          <p className="hero-item mt-8 flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            available — taiwan, utc+8
          </p>
          <p className="hero-item mt-20 text-xs text-night-faint">
            scroll to descend ↓
          </p>
        </section>

        {/* about */}
        <section className="mx-auto max-w-2xl px-6 pb-40">
          <div
            data-panel
            className="border border-white/10 bg-night/70 p-8 backdrop-blur-md md:p-10"
          >
            <h2 className="text-sm text-emerald-400">
              <span className="text-night-faint">01.</span> about
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white">
              8+ years turning complex problems into clean, efficient
              solutions. From frontend interfaces to backend architectures —
              reliable, scalable, maintainable.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
              {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group}>
                  <p className="mb-2 text-night-muted">{group}/</p>
                  <ul className="space-y-1">
                    {items.map((item, i) => (
                      <li key={item}>
                        <span className="text-night-faint">
                          {i === items.length - 1 ? "└── " : "├── "}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* projects */}
        <section className="mx-auto max-w-2xl space-y-8 px-6 pb-40">
          <h2 data-panel className="text-sm text-emerald-400">
            <span className="text-night-faint">02.</span> projects
          </h2>
          {reposLoading ? (
            <p className="text-sm text-night-muted">fetching repositories…</p>
          ) : featured.length === 0 ? (
            <p data-panel className="text-sm text-night-muted">
              github api unavailable —{" "}
              <Link to="/projects" className="text-emerald-400 hover:underline">
                see all projects
              </Link>
            </p>
          ) : (
            featured.map((repo) => (
              <a
                key={repo.id}
                data-panel
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-white/10 bg-night/70 p-8 backdrop-blur-md transition-colors hover:border-emerald-400/60"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xl font-bold text-white transition-colors group-hover:text-emerald-400">
                    {repo.name}
                  </span>
                  <span className="whitespace-nowrap text-xs text-night-muted">
                    {repo.language ?? ""} ★{repo.stargazers_count}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-night-muted">
                  {repo.description}
                </p>
              </a>
            ))
          )}
        </section>

        {/* writing */}
        <section className="mx-auto max-w-2xl space-y-8 px-6 pb-40">
          <h2 data-panel className="text-sm text-emerald-400">
            <span className="text-night-faint">03.</span> writing
          </h2>
          {writing.map((post) => (
            <Link
              key={post.slug}
              data-panel
              to={`/blog/${post.slug}`}
              className="group block border border-white/10 bg-night/70 p-8 backdrop-blur-md transition-colors hover:border-emerald-400/60"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-lg text-white transition-colors group-hover:text-emerald-400">
                  {post.title}
                </span>
                <span className="whitespace-nowrap text-xs text-night-muted">
                  {new Date(post.date).toISOString().slice(0, 10)}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-night-muted">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </section>

        {/* contact */}
        <section className="mx-auto max-w-2xl px-6 pb-32 text-center">
          <div
            data-panel
            className="border border-emerald-400/30 bg-night/70 p-10 backdrop-blur-md"
          >
            <h2 className="text-sm text-emerald-400">
              <span className="text-night-faint">04.</span> contact
            </h2>
            <p className="mt-6 text-2xl text-white">
              got an interesting problem?
            </p>
            <a
              href="mailto:liangshihlin@gmail.com"
              className="mt-6 inline-block border border-emerald-400/40 px-6 py-3 text-sm text-emerald-400 transition-colors hover:bg-emerald-400/10"
            >
              $ mail liangshihlin@gmail.com
            </a>
            <div className="mt-8 flex justify-center gap-6 text-xs text-night-muted">
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VariantWebgl;
