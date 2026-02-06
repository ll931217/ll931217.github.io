import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogPostBySlug } from "@/lib/blogLoader";
import { parseMarkdown, formatDate } from "@/lib/utils";
import { ArrowLeft, Clock } from "lucide-react";
import InteractiveGrid from "@/components/three/InteractiveGrid";
import MinimalNav from "@/components/layout/MinimalNav";
import { generateArticleSchema, injectJsonLd } from "@/lib/structuredData";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(0);

  // Get the blog post from markdown files
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight > 0) {
        const scrollPercent = (window.scrollY / scrollableHeight) * 100;
        setScroll(Math.round(scrollPercent));
      } else {
        setScroll(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // If post doesn't exist, redirect to blog page
    if (!post && slug) {
      navigate("/blog");
    }

    // Section reveals
    gsap.utils.toArray('section').forEach((section) => {
      gsap.from(section as any, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section as any,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
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
    <div className="bg-[#0a0a0a] text-white font-ibm-mono min-h-screen overflow-x-hidden">
      <div className="scanlines" />
      <div className="noise-overlay" />

      <InteractiveGrid />

      <MinimalNav />

      <div className="fixed top-4 right-4 text-[#ff3333] z-50 mix-blend-difference text-sm md:text-base">
        [{scroll}%]
      </div>

      <main className="relative z-10">
        {/* Compact Header */}
        <section className="pt-20 pb-8 md:pt-24 md:pb-12 px-4 md:px-8 border-t-4 border-white">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-[#ff3333] hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <h1
              className="font-bold uppercase"
              style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  letterSpacing: '0.15rem',
                  lineHeight: '1.2',
              }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[#666666] mt-6">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.author}</span>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 border border-[#666666] text-[#666666] text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <article>
              <div
                className="markdown prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#cccccc] prose-a:text-[#ff3333] hover:prose-a:text-white prose-strong:text-white prose-code:text-[#ff3333] prose-pre:bg-[#111] prose-pre:border prose-pre:border-[#666666] prose-img:border prose-img:border-[#666666]"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </article>
          </div>
        </section>

        <footer className="py-12 px-4 md:px-8 border-t-4 border-white text-center">
            <pre className="text-xs md:text-sm text-[#666666]">END OF TRANSMISSION</pre>
        </footer>
      </main>
    </div>
  );
};

export default BlogPost;
