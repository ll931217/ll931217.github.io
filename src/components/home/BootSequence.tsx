import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Boot lines that pop in one by one on mount (instant under
 * prefers-reduced-motion).
 */
const BootSequence = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current?.children ?? [],
          { autoAlpha: 0 },
          { autoAlpha: 1, stagger: 0.25, duration: 0.05, delay: 0.3 },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="space-y-1 text-sm text-night-muted">
      <p>
        <span className="text-emerald-400">[ ok ]</span> mounting /dev/portfolio
      </p>
      <p>
        <span className="text-emerald-400">[ ok ]</span> baoge.dev v2.0.0
      </p>
      <p>last login: just now from 127.0.0.1</p>
    </div>
  );
};

export default BootSequence;
