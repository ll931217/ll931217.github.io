import DesignNav from "@/components/DesignNav";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Project One",
    description: "An exploration of form and function.",
    image: "/placeholder.svg",
  },
  {
    title: "Project Two",
    description: "A study in digital craftsmanship.",
    image: "/placeholder.svg",
  },
  {
    title: "Project Three",
    description: "Building systems for the future.",
    image: "/placeholder.svg",
  },
];

const expertise = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "Cloud Infra", level: 75 },
];

const useFadeIn = () => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const animationProps = {
    ref,
    style: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDelay: "0.2s",
    },
  };

  return animationProps;
};

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const props = useFadeIn();
  return (
    <motion.section {...props} className={cn("py-24 sm:py-32 md:py-48 lg:py-56", className)}>
      {children}
    </motion.section>
  );
};


const Design4 = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={cn("bg-[#f8f7f4] text-[#2d2d2d] font-jost")}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#8b7355] origin-[0%] z-50"
        style={{ scaleX }}
      />
      <DesignNav />

      <main className="max-w-3xl mx-auto px-6">
        <section className="min-h-screen flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "text-6xl md:text-8xl font-thin font-cormorant"
            )}
          >
            Liang-Shih Lin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 text-lg text-[#a8a29e] tracking-widest font-light"
          >
            Developer &nbsp;&nbsp;·&nbsp;&nbsp; Builder &nbsp;&nbsp;·&nbsp;&nbsp; Taiwan
          </motion.p>
        </section>

        <Section>
          <div className="text-center space-y-8">
            <p className="text-4xl md:text-5xl leading-tight font-light text-[#8b7355]">
              I create systems that work.
            </p>
            <p className="text-4xl md:text-5xl leading-tight font-light text-[#8b7355]">
              Simplicity over complexity.
            </p>
            <p className="text-4xl md:text-5xl leading-tight font-light text-[#8b7355]">
              Always.
            </p>
          </div>
        </Section>

        <Section>
          <div className="text-center">
            <h2 className="text-3xl font-light text-[#2d2d2d] inline-block relative after:content-[''] after:absolute after:w-2/3 after:left-1/2 after:-translate-x-1/2 after:bottom-[-8px] after:h-[1px] after:bg-[#e7e5e4]">
              Expertise
            </h2>
            <div className="mt-20 space-y-10">
              {expertise.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="w-32 text-right text-base text-[#a8a29e] font-light">
                    {skill.name}
                  </span>
                  <div className="flex-1 bg-[#e7e5e4] h-[2px]">
                    <motion.div
                      className="h-full bg-[#8b7355]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                      viewport={{ once: true, amount: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="bg-white/50 p-12 md:p-16 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] transition-shadow duration-600">
                  <h3 className="text-3xl font-light text-[#2d2d2d]">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base text-[#a8a29e] font-normal">
                    {project.description}
                  </p>
                  <div className="mt-8 h-48 bg-[#e7e5e4] flex items-center justify-center">
                    <span className="text-[#a8a29e]">Image Placeholder</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <footer className="text-center py-24 text-[#a8a29e] font-light">
          <p>&copy; {new Date().getFullYear()} Liang-Shih Lin. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Design4;
