import { Link, useLocation } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <SidebarLayout>
      <section className="flex min-h-[50vh] flex-col justify-center">
        <p className="text-emerald-400 text-sm mb-6">
          <span className="text-night-faint">??.</span> not found
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          404 — page not found
        </h1>

        <p className="text-sm text-night-muted mb-2">
          <span className="text-night-faint">$</span> cd {pathname}
        </p>
        <p className="text-sm text-night-muted mb-10">
          → no such file or directory
        </p>

        <Link
          to="/"
          className="inline-block w-fit border border-emerald-400/40 text-emerald-400 px-6 py-3 text-sm hover:bg-emerald-400/10 transition-colors"
        >
          $ cd ~
        </Link>
      </section>
    </SidebarLayout>
  );
};

export default NotFound;
