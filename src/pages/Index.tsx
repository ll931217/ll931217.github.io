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
      style={{ textShadow: "0 0 10px rgba(52,211,153,0.18)" }}
    >
      <CrtOverlay />
      <TerminalChrome />

      <main className="mx-auto max-w-3xl px-6 pb-40 pt-24">
        <BootSequence />

        <CommandBlock command="whoami">
          <h1 className="text-lg text-white">liang-shih lin</h1>
          <p>full-stack developer — systems that work</p>
          <p>
            8+ years turning complex problems into clean, efficient solutions.
          </p>
          <p className="text-emerald-400">status: available — taiwan, utc+8</p>
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

        <LivePrompt />
      </main>
    </div>
  );
};

export default Index;
