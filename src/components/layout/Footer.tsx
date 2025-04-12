import { Linkedin, Mail } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const Footer = () => {
  return (
    <footer className="border-t border-tokyo-selection py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-tokyo-comment">
              &copy; {new Date().getFullYear()} Liang-Shih Lin | Built with
              React
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/ll931217"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tokyo-comment hover:text-tokyo-accent transition-colors"
            >
              <SiGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ll931217/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tokyo-comment hover:text-tokyo-accent transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:liangshihlin@gmail.com"
              className="text-tokyo-comment hover:text-tokyo-accent transition-colors"
            >
              <Mail size={20} />
            </a>

            <button
              className="rounded border p-2"
              onClick={() => {
                throw new Error("This is your first error!");
              }}
            >
              Break the world
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
