import { NavLink } from "react-router-dom";

/** Compact navigation shared by the terminal header and mobile sidebar. */
const SiteNavigation = () => (
  <nav aria-label="Site" className="flex flex-wrap items-center gap-1 text-sm">
    {[
      { to: "/", label: "/home" },
      { to: "/projects", label: "/projects" },
      { to: "/blog", label: "/writing" },
    ].map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `inline-flex min-h-11 items-center rounded-sm px-3 transition-colors ${
            isActive
              ? "bg-emerald-400/10 text-emerald-400 underline underline-offset-4"
              : "text-night-muted hover:bg-white/5 hover:text-white"
          }`
        }
      >
        {label}
      </NavLink>
    ))}
  </nav>
);

export default SiteNavigation;
