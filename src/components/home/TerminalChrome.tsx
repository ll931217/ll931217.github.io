import SiteNavigation from "@/components/layout/SiteNavigation";

/** Fixed terminal header with the same navigation used on mobile inner pages. */
const TerminalChrome = () => (
  <header className="fixed inset-x-0 top-0 z-30 flex flex-wrap items-center justify-center gap-x-3 border-b border-white/10 bg-[#0a0e14]/95 px-3 py-2 text-xs text-night-muted sm:justify-between sm:px-4">
    <span className="hidden items-center gap-3 sm:flex">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
      </span>
      <span>~/baoge.dev</span>
    </span>
    <SiteNavigation />
  </header>
);

export default TerminalChrome;
