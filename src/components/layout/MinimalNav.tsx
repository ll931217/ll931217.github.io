import { Link, useLocation } from "react-router-dom";
import { Home, FolderOpen, FileText } from "lucide-react";

const MinimalNav = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/blog", label: "Blog", icon: FileText },
  ];

  // Don't show on homepage
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="fixed top-4 left-4 z-50 flex flex-col gap-2">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.path ||
          (link.path !== "/" && location.pathname.startsWith(link.path));

        return (
          <Link
            key={link.path}
            to={link.path}
            className={`
              w-10 h-10 flex items-center justify-center
              border transition-all duration-200
              ${isActive
                ? "border-[#ff3333] text-[#ff3333] bg-[#ff3333]/10"
                : "border-[#666666] text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333]"
              }
            `}
            title={link.label}
          >
            <Icon size={18} />
          </Link>
        );
      })}
    </nav>
  );
};

export default MinimalNav;
