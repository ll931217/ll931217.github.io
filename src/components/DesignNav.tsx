
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const designs = [
  { id: 1, name: "Brutalist", path: "/1" },
  { id: 2, name: "Editorial", path: "/2" },
  { id: 3, name: "Terminal", path: "/3" },
  { id: 4, name: "Refined", path: "/4" },
  { id: 5, name: "Geometric", path: "/5" },
];

const DesignNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-6 right-6 flex items-center space-x-2">
      {designs.map((design) => (
        <div key={design.id} className="group relative">
          <Link
            to={design.path}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300"
          >
            <motion.div
              animate={{
                backgroundColor:
                  location.pathname === design.path ? "#FFFFFF" : "#000000",
                color:
                  location.pathname === design.path ? "#000000" : "#FFFFFF",
                scale: location.pathname === design.path ? 1.1 : 1,
              }}
              whileHover={{ scale: 1.2 }}
              className="flex h-full w-full items-center justify-center rounded-full bg-black/80"
            >
              {design.id}
            </motion.div>
          </Link>
          <div className="absolute bottom-full mb-2 hidden -translate-x-1/2 group-hover:block left-1/2">
            <div className="whitespace-nowrap rounded-md bg-black px-2 py-1 text-sm text-white">
              {design.name}
            </div>
            <div className="absolute left-1/2 h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black"></div>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default DesignNav;
