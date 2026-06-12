import { Link } from "react-router-dom";
import { getAllBlogPosts } from "@/lib/blogLoader";
import CommandBlock from "./CommandBlock";

/**
 * `tail -n 3 writing.log` — latest blog posts as log lines.
 */
const WritingCommand = () => {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <CommandBlock command={`tail -n ${posts.length} writing.log`}>
      {posts.map((post) => (
        <p key={post.slug}>
          <span className="text-night-faint">
            [{new Date(post.date).toISOString().slice(0, 10)}]
          </span>{" "}
          <Link
            to={`/blog/${post.slug}`}
            className="text-white transition-colors hover:text-emerald-400"
          >
            {post.title}
          </Link>
        </p>
      ))}
      <p>
        <Link
          to="/blog"
          className="text-night-muted transition-colors hover:text-emerald-400"
        >
          less writing.log →
        </Link>
      </p>
    </CommandBlock>
  );
};

export default WritingCommand;
