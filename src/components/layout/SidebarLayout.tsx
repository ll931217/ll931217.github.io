import { ReactNode } from "react";
import SiteSidebar, { SidebarSection } from "./SiteSidebar";

interface SidebarLayoutProps {
  sections?: SidebarSection[];
  children: ReactNode;
}

const SidebarLayout = ({ sections, children }: SidebarLayoutProps) => {
  return (
    <div className="min-h-screen bg-night text-night-fg font-mono md:flex">
      <SiteSidebar sections={sections} />
      <main className="md:ml-72 flex-1 px-8 md:px-16 py-16 max-w-4xl">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
