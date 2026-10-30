import { ReactNode } from "react";
import { PROMPT } from "./prompt";

interface CommandBlockProps {
  command: string;
  children: ReactNode;
}

/** Output is always readable. Only the decorative cursor animates. */
const CommandBlock = ({ command, children }: CommandBlockProps) => (
  <section className="mt-12">
    <p className="text-sm">
      <span className="text-emerald-400">{PROMPT}</span>{" "}
      <span className="text-white">{command}</span>
      <span
        aria-hidden="true"
        className="command-cursor ml-1 inline-block h-3 w-1.5 bg-emerald-400 align-middle"
      />
    </p>
    <div className="mt-3 space-y-2 text-base leading-relaxed">{children}</div>
  </section>
);

export default CommandBlock;
