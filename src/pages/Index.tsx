import SidebarLayout from "@/components/layout/SidebarLayout";
import { SidebarSection } from "@/components/layout/SiteSidebar";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import WritingSection from "@/components/home/WritingSection";

// Keep in sync with the numbered headings each section renders.
const SECTIONS: SidebarSection[] = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "writing", label: "writing" },
  { id: "contact", label: "contact" },
];

const Index = () => {
  return (
    <SidebarLayout sections={SECTIONS}>
      <div className="space-y-24">
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
      </div>
    </SidebarLayout>
  );
};

export default Index;
