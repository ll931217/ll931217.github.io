
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getBlogPostBySlug } from "@/lib/blogLoader";
import { parseMarkdown, formatDate } from "@/lib/utils";
import LanguageBadge from "@/components/ui/LanguageBadge";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Get the blog post from markdown files
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // If post doesn't exist, redirect to blog page
    if (!post && slug) {
      navigate("/blog");
    }
  }, [post, slug, navigate]);

  if (!post) {
    return null; // Will redirect in useEffect
  }

  const htmlContent = parseMarkdown(post.content);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center text-tokyo-accent hover:text-tokyo-blue mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-tokyo-purple">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-tokyo-comment">
              <time dateTime={post.date}>{formatDate(post.date)}</time>

              <span>By {post.author}</span>

              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                {post.tags.map((tag) => (
                  <LanguageBadge key={tag} language={tag} />
                ))}
              </div>
            </div>
          </header>

          <div
            className="markdown prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default BlogPost;
