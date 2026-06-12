import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { PROMPT } from "./prompt";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

interface CommandBlockProps {
  command: string;
  children: ReactNode;
  /**
   * Replays the block's animation when it changes — pass it whatever the
   * output depends on (e.g. fetched row count) so async content re-types
   * like a re-run command.
   */
  animKey?: string | number;
}

/**
 * One terminal exchange: the command types itself when scrolled into view,
 * then its output reveals line by line. Under prefers-reduced-motion
 * everything renders immediately.
 */
const CommandBlock = ({ command, children, animKey }: CommandBlockProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cmd = ref.current?.querySelector("[data-cmd]");
      const outs = ref.current?.querySelectorAll("[data-out] > *");
      if (!cmd || !outs) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cmd, { text: command });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(outs, { autoAlpha: 0 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
        tl.to(cmd, {
          text: command,
          duration: Math.min(1.2, command.length * 0.05),
          ease: "none",
        });
        tl.to(
          outs,
          { autoAlpha: 1, duration: 0.25, stagger: 0.08, ease: "power1.out" },
          "+=0.15",
        );
      });
    },
    { scope: ref, dependencies: [command, animKey], revertOnUpdate: true },
  );

  return (
    <section ref={ref} className="mt-12">
      <p className="text-sm">
        <span className="text-emerald-400">{PROMPT}</span>{" "}
        <span data-cmd aria-label={command} className="text-white" />
      </p>
      <div data-out className="mt-3 space-y-1 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default CommandBlock;
