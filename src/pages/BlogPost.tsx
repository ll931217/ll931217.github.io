import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SidebarLayout from "@/components/layout/SidebarLayout";
import LanguageBadge from "@/components/ui/LanguageBadge";
import { getBlogPostBySlug } from "@/lib/blogLoader";
import { parseMarkdown } from "@/lib/utils";
import { generateArticleSchema, injectJsonLd } from "@/lib/structuredData";

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

  // Inject structured data for SEO
  useEffect(() => {
    if (post) {
      const schema = generateArticleSchema({
        title: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: post.author,
        url: `${window.location.origin}/blog/${post.slug}`,
      });

      const cleanup = injectJsonLd(schema);
      return cleanup;
    }
  }, [post]);

  if (!post) {
    return null; // Will redirect in useEffect
  }

  const htmlContent = parseMarkdown(post.content);

  return (
    <SidebarLayout>
      <article>
        <Link
          to="/blog"
          className="inline-block text-sm text-night-muted hover:text-emerald-400 transition-colors"
        >
          ← cd ../writing
        </Link>

        <header className="mt-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-night-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toISOString().slice(0, 10)}
            </time>
            <span className="text-night-faint">·</span>
            <span>{post.author}</span>
            {post.readingTime && (
              <>
                <span className="text-night-faint">·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <LanguageBadge key={tag} language={tag} />
            ))}
          </div>
        </header>

        <div
          className="markdown mt-12"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </SidebarLayout>
  );
};

export default BlogPost;
