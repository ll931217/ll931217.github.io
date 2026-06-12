import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import { SidebarSection } from "@/components/layout/SiteSidebar";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import WritingSection from "@/components/home/WritingSection";
import PrototypeSwitcher from "@/components/prototype/PrototypeSwitcher";
import { HOME_VARIANTS } from "@/components/prototype/variants";
import { fetchRepositories } from "@/lib/github";
import { getAllBlogPosts } from "@/lib/blogLoader";

// PROTOTYPE — awwwards-redesign exploration: variants of this page are
// switchable via `?variant=` (dev only; prod always renders `current`).
// Cycle with the floating bar or ←/→ keys. The current design is untouched
// below. Delete src/components/prototype/ and this wiring once a variant wins.

// Keep in sync with the numbered headings each section renders.
const SECTIONS: SidebarSection[] = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "writing", label: "writing" },
  { id: "contact", label: "contact" },
];

const CurrentHome = () => {
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

const Index = () => {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("variant") ?? "current";
  const active = import.meta.env.PROD
    ? HOME_VARIANTS[0]
    : (HOME_VARIANTS.find((v) => v.key === requested) ?? HOME_VARIANTS[0]);

  // Fetched once here and handed to every variant so flipping never refetches.
  // Same query key as ProjectsSection, so `current` shares the cache too.
  const { data: repos, isLoading: reposLoading } = useQuery({
    queryKey: ["featured-repos"],
    queryFn: () => fetchRepositories("featuredOnly"),
  });
  const posts = getAllBlogPosts();

  const Variant = active.Component;

  return (
    <>
      {Variant ? (
        <Suspense fallback={<div className="min-h-screen bg-night" />}>
          <Variant
            repos={repos ?? []}
            reposLoading={reposLoading}
            posts={posts}
          />
        </Suspense>
      ) : (
        <CurrentHome />
      )}
      <PrototypeSwitcher variants={HOME_VARIANTS} current={active.key} />
    </>
  );
};

export default Index;
