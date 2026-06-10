import IdentitySidebar, { HomeSection } from "@/components/home/IdentitySidebar";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import WritingSection from "@/components/home/WritingSection";

// Keep in sync with the numbered headings each section renders.
const SECTIONS: HomeSection[] = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "writing", label: "writing" },
  { id: "contact", label: "contact" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-night text-night-fg font-mono md:flex">
      <IdentitySidebar sections={SECTIONS} />

      <main className="md:ml-72 flex-1 px-8 md:px-16 py-16 space-y-24 max-w-4xl">
        <AboutSection />
        <ProjectsSection />
        <WritingSection />

        <section id="contact" className="pb-16">
          <h2 className="text-emerald-400 text-sm mb-6">
            <span className="text-night-faint">04.</span> contact
          </h2>
          <p className="text-lg text-white">Got an interesting problem?</p>
          <a
            href="https://github.com/ll931217"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block border border-emerald-400/40 text-emerald-400 px-6 py-3 text-sm hover:bg-emerald-400/10 transition-colors"
          >
            $ open github.com/ll931217
          </a>
        </section>
      </main>
    </div>
  );
};

export default Index;
