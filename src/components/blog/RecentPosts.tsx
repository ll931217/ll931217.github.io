import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";
import { getAllBlogPosts } from "@/lib/blogLoader";

const RecentPosts = () => {
  const blogPosts = getAllBlogPosts();
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 px-4 md:px-8 border-t-2 border-dashed border-[#666666]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#ff3333] text-xl font-bold">
            [BLOG]
          </h2>

          <Link
            to="/blog"
            className="text-[#666666] hover:text-[#ff3333] flex items-center transition-colors text-sm"
          >
            VIEW ALL
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
