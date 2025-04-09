import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-tokyo-selection sticky top-0 z-50 bg-tokyo-bg/90 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-tokyo-accent">
            Liang-Shih Lin
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link",
                  location.pathname === link.path && "active",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-tokyo-fg hover:text-tokyo-accent"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "nav-link py-3 text-center",
                    location.pathname === link.path && "active",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
