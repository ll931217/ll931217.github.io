import { Link, NavLink } from "react-router-dom";

export interface SidebarSection {
  id: string;
  label: string;
}

const PAGE_NAV = [
  { to: "/", label: "index" },
  { to: "/projects", label: "projects" },
  { to: "/blog", label: "writing" },
];

interface SiteSidebarProps {
  /**
   * In-page anchor sections (home page). When provided they replace the
   * router nav in the numbered slot.
   */
  sections?: SidebarSection[];
}

/**
 * Site-wide identity rail. Fixed on the left on desktop, stacks above the
 * content on mobile (where the numbered nav is hidden).
 */
const SiteSidebar = ({ sections }: SiteSidebarProps) => {
  return (
    <aside className="md:fixed md:inset-y-0 md:left-0 md:w-72 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between bg-night z-10">
      <div>
        <p className="text-emerald-400 text-xs mb-6">~/baoge.dev</p>
        <Link to="/" className="block group">
          <h1 className="text-2xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
            Liang-Shih
            <br />
            Lin
          </h1>
        </Link>
        <p className="mt-3 text-sm text-night-muted leading-relaxed">
          full-stack developer
          <br />
          systems that work
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          available — taiwan, utc+8
        </p>

        <nav
          aria-label={sections ? "Page sections" : "Site"}
          className="mt-10 hidden md:block"
        >
          <ul className="space-y-3 text-sm">
            {sections
              ? sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-baseline gap-3 text-night-muted hover:text-emerald-400 transition-colors"
                    >
                      <span className="text-xs text-night-faint group-hover:text-emerald-400/60">
                        0{i + 1}
                      </span>
                      {section.label}
                    </a>
                  </li>
                ))
              : PAGE_NAV.map((item, i) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `group flex items-baseline gap-3 transition-colors ${
                          isActive
                            ? "text-emerald-400"
                            : "text-night-muted hover:text-emerald-400"
                        }`
                      }
                    >
                      <span className="text-xs text-night-faint group-hover:text-emerald-400/60">
                        0{i + 1}
                      </span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
          </ul>
        </nav>
      </div>

      <div className="mt-8 md:mt-0 flex flex-wrap md:flex-col gap-4 md:gap-2 text-xs text-night-muted">
        <Link to="/projects" className="hover:text-emerald-400 transition-colors">
          all projects →
        </Link>
        <Link to="/blog" className="hover:text-emerald-400 transition-colors">
          all posts →
        </Link>
        <span className="flex gap-4 md:mt-3">
          <a
            href="https://github.com/ll931217"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            github ↗
          </a>
          <a
            href="https://www.linkedin.com/in/ll931217/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            linkedin ↗
          </a>
          <a
            href="mailto:liangshihlin@gmail.com"
            className="hover:text-emerald-400 transition-colors"
          >
            mail ↗
          </a>
        </span>
      </div>
    </aside>
  );
};

export default SiteSidebar;
