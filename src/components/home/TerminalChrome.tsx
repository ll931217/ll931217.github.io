import { Link } from "react-router-dom";

/**
 * Fixed terminal window header: traffic lights, session title, page nav.
 */
const TerminalChrome = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-[#0a0e14]/95 px-4 py-3 text-xs text-night-muted">
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
      </span>
      <span className="mx-auto">liangshih@baoge.dev:~ — session</span>
      <nav className="flex gap-4" aria-label="Site">
        <Link to="/projects" className="transition-colors hover:text-emerald-400">
          /projects
        </Link>
        <Link to="/blog" className="transition-colors hover:text-emerald-400">
          /blog
        </Link>
      </nav>
    </header>
  );
};

export default TerminalChrome;
