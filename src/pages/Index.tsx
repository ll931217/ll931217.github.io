import { Link } from "react-router-dom";
import BootSequence from "@/components/home/BootSequence";
import CommandBlock from "@/components/home/CommandBlock";
import CrtOverlay from "@/components/home/CrtOverlay";
import LivePrompt from "@/components/home/LivePrompt";
import ProjectsCommand from "@/components/home/ProjectsCommand";
import TerminalChrome from "@/components/home/TerminalChrome";
import WritingCommand from "@/components/home/WritingCommand";

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

/**
 * Home — the whole page is a terminal session: boot lines, then each section
 * is a command that types itself into view with its output.
 */
const Index = () => {
  return (
    <div
      className="min-h-screen bg-[#0a0e14] font-mono text-night-fg"
    >
      <CrtOverlay />
      <TerminalChrome />

      <main className="mx-auto max-w-3xl px-6 pb-40 pt-24">
        <BootSequence />

        <CommandBlock command="whoami">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            liang-shih lin
          </h1>
          <p className="text-lg text-white">full-stack developer — systems that work</p>
          <p>
            8+ years turning complex problems into clean, efficient solutions.
          </p>
          <p className="text-sm text-emerald-400">status: available — taiwan, utc+8</p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              to="/projects"
              className="inline-flex min-h-11 items-center rounded-sm border border-emerald-400/60 bg-emerald-400/10 px-4 text-sm text-emerald-400 transition-colors hover:bg-emerald-400/20"
            >
              view projects →
            </Link>
            <a
              href="mailto:liangshihlin@gmail.com"
              className="inline-flex min-h-11 items-center rounded-sm border border-white/20 px-4 text-sm text-white transition-colors hover:border-emerald-400 hover:text-emerald-400"
            >
              contact me ↗
            </a>
          </div>
        </CommandBlock>

        <CommandBlock command="tree skills/">
          {SKILL_TREE.map((line) => (
            <p key={line} className="whitespace-pre">
              {line}
            </p>
          ))}
        </CommandBlock>

        <ProjectsCommand />
        <WritingCommand />

        <CommandBlock command="echo $CONTACT">
          <p className="text-white">got an interesting problem?</p>
          <p className="flex flex-wrap gap-x-6 gap-y-1">
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

        <LivePrompt />
      </main>
    </div>
  );
};

export default Index;
