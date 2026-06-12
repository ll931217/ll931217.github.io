import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROMPT } from "./prompt";

gsap.registerPlugin(useGSAP);

/**
 * The idle prompt at the end of the session, with a blinking block cursor
 * (solid under prefers-reduced-motion) and a konami easter-egg hint.
 */
const LivePrompt = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-cursor]", {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.55,
          ease: "steps(1)",
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <p className="mt-16 text-sm">
        <span className="text-emerald-400">{PROMPT}</span>{" "}
        <span
          data-cursor
          className="inline-block h-4 w-2 translate-y-0.5 bg-emerald-400"
          aria-hidden
        />
      </p>
      <p className="mt-2 text-xs text-night-faint">
        psst — try ↑ ↑ ↓ ↓ ← → ← → b a
      </p>
    </div>
  );
};

export default LivePrompt;
