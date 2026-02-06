import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import InteractiveGrid from "@/components/three/InteractiveGrid";
import MinimalNav from "@/components/layout/MinimalNav";

const NotFound = () => {
  return (
    <div className="bg-[#0a0a0a] text-white font-ibm-mono min-h-screen overflow-x-hidden">
      <div className="scanlines" />
      <div className="noise-overlay" />

      <InteractiveGrid />

      <MinimalNav />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 border-t-4 border-white pointer-events-none">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-[#ff3333]">
            404
          </h1>

          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white uppercase tracking-widest">
              Page Not Found
            </h2>
            <p className="text-[#666666]">
              <span className="text-[#ff3333]">&gt;</span> The page you're looking for doesn't exist.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333]/10 transition-colors pointer-events-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <footer className="mt-auto py-12 text-center">
          <pre className="text-xs md:text-sm text-[#666666]">END OF TRANSMISSION</pre>
        </footer>
      </main>
    </div>
  );
};

export default NotFound;
