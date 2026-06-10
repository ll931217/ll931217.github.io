import { Link } from "react-router-dom";
import { getAllBlogPosts } from "@/lib/blogLoader";

const WritingSection = () => {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section id="writing">
      <h2 className="text-emerald-400 text-sm mb-6">
        <span className="text-night-faint">03.</span> writing
      </h2>
      <ul className="space-y-px">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block border-l-2 border-white/10 hover:border-emerald-400 pl-6 py-4 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-white group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </span>
                <span className="text-xs text-night-muted whitespace-nowrap">
                  {new Date(post.date).toISOString().slice(0, 10)}
                </span>
              </div>
              <p className="mt-1 text-sm text-night-muted leading-relaxed max-w-lg line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WritingSection;
