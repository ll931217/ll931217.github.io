import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto text-center py-16">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tokyo-magenta via-tokyo-purple to-tokyo-blue">
          404
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-tokyo-cyan">
            Page Not Found
          </h2>
          <p className="text-tokyo-comment">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link to="/" className="tokyo-button inline-flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
