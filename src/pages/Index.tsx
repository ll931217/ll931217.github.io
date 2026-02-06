import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentPosts from "@/components/blog/RecentPosts";
import InteractiveGrid from "@/components/three/InteractiveGrid";
import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";

const Index = () => {
  const [scroll, setScroll] = useState(0);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLPreElement>(null);
  const [skillsRevealed, setSkillsRevealed] = useState(false);

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
    // Name character reveal
    const chars = gsap.utils.toArray('.name-char');
    gsap.from(chars, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out'
    });

    // Hero description fade in after name
    gsap.from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8,
      ease: 'power3.out'
    });

    // Scroll indicator pulse
    gsap.to('.scroll-indicator', {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Grid parallax
    gsap.to('.grid-lines', {
      y: 100,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    // Section reveals (skip first hero section)
    gsap.utils.toArray('section:not(:first-child)').forEach((section) => {
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
  }, []);

  const scrambleText = useCallback((element: HTMLElement, finalText: string) => {
    let iteration = 0;
    const maxIterations = finalText.length;
    
    const interval = setInterval(() => {
      element.innerText = finalText
        .split("")
        .map((char, index) => {
          if (index < iteration) return char;
          if (char === " " || char === "\n") return char;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");
      
      iteration += 3;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        element.innerText = finalText;
      }
    }, 15);
  }, []);

  useEffect(() => {
    if (skillsRef.current && !skillsRevealed) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !skillsRevealed) {
              setSkillsRevealed(true);
              const finalText = `├── frontend/
│   ├── react.tsx
│   ├── vue.ts
│   └── typescript.d.ts
├── backend/
│   ├── node.js
│   ├── python.py
│   └── fastapi.py
└── devops/
    ├── docker
    └── aws`;
              scrambleText(skillsRef.current!, finalText);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(skillsRef.current);
      return () => observer.disconnect();
    }
  }, [skillsRevealed, scrambleText]);

  const glitchEffect = () => {
    if (!nameRef.current) return;
    
    const tl = gsap.timeline();
    tl.to(nameRef.current, {
      x: -5,
      duration: 0.05,
      ease: 'power1.inOut'
    })
    .to(nameRef.current, {
      x: 5,
      textShadow: '3px 0 #ff3333, -3px 0 #00ff00',
      duration: 0.05,
      ease: 'power1.inOut'
    })
    .to(nameRef.current, {
      x: -3,
      textShadow: '-2px 0 #ff3333, 2px 0 #00ff00',
      duration: 0.05,
      ease: 'power1.inOut'
    })
    .to(nameRef.current, {
      x: 3,
      duration: 0.05,
      ease: 'power1.inOut'
    })
    .to(nameRef.current, {
      x: 0,
      textShadow: 'none',
      duration: 0.05,
      ease: 'power1.inOut'
    });
  };

  const name = "Liang-Shih Lin";
  const nameChars = name.split('').map((char, index) => (
    <span key={index} className="name-char" style={{ display: 'inline-block' }}>
      {char === ' ' ? ' ' : char}
    </span>
  ));

  return (
    <div className="bg-[#0a0a0a] text-white font-ibm-mono min-h-screen overflow-x-hidden">
      <div className="scanlines" />
      <div className="noise-overlay" />
      
      <InteractiveGrid />
      
      <div className="fixed top-4 right-4 text-[#ff3333] z-50 mix-blend-difference scroll-indicator">
        [SCROLL: {scroll}%]
      </div>
      
      <main className="relative z-10 pointer-events-none">
        <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden p-4 md:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              ref={nameRef}
              className="font-bold uppercase text-center mb-8 glitch-text pointer-events-auto"
              data-text="LIANG-SHIH LIN"
              style={{
                  fontSize: 'clamp(2rem, 8vw, 5rem)',
                  letterSpacing: 'clamp(0.2rem, 1vw, 0.8rem)',
                  lineHeight: '1',
              }}
              onMouseEnter={glitchEffect}
            >
              {nameChars}
            </h1>
            
            <div className="hero-description space-y-6 mt-8">
              <p className="text-xl md:text-2xl text-[#666666] leading-relaxed">
                <span className="text-[#ff3333]">&gt;</span> Full-stack developer building{' '}
                <span className="text-white">systems that work</span>
              </p>
              
              <p className="text-lg md:text-xl text-[#666666] leading-relaxed max-w-2xl mx-auto">
                8+ years turning complex problems into clean, efficient solutions. 
                From frontend interfaces to backend architectures, I build software 
                that is <span className="text-[#ff3333]">reliable</span>, <span className="text-[#ff3333]">scalable</span>, 
                and <span className="text-[#ff3333]">maintainable</span>.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm md:text-base">
                <span className="border border-[#666666] px-4 py-2 text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] transition-colors pointer-events-auto">
                  TAIWAN
                </span>
                <span className="border border-[#666666] px-4 py-2 text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] transition-colors pointer-events-auto">
                  REACT / VUE / TYPESCRIPT
                </span>
                <span className="border border-[#666666] px-4 py-2 text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] transition-colors pointer-events-auto">
                  NODE.JS / PYTHON
                </span>
                <span className="border border-[#666666] px-4 py-2 text-[#666666] hover:border-[#ff3333] hover:text-[#ff3333] transition-colors pointer-events-auto">
                  AWS / DOCKER
                </span>
              </div>
              
              <div className="mt-12 text-[#666666] animate-bounce">
                <span className="text-sm tracking-widest">SCROLL TO EXPLORE</span>
                <div className="mt-2">↓</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8 border-t-2 border-[#ff3333]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-1">
                 <pre className="text-lg md:text-xl leading-relaxed text-[#666666]">
{`> FULL-STACK DEVELOPER
> TAIWAN
> SYSTEMS THAT WORK`}
              </pre>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-[#ff3333] mb-4 text-xl cursor-blink">[SKILLS]</h2>
              <pre ref={skillsRef} className="text-sm md:text-base text-white">
                {skillsRevealed ? '' : '> Loading...'}
              </pre>
            </div>
          </div>
        </section>

        <FeaturedProjects />
        <RecentPosts />

        <footer className="py-12 px-4 md:px-8 border-t-4 border-white mt-20 text-center">
            <h2 className="text-[#ff3333] text-xl mb-4 cursor-blink">[CONTACT]</h2>
            <a href="https://github.com/ll931217" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff3333] transition-colors duration-75 text-lg pointer-events-auto">
                github.com/ll931217
            </a>
            <pre className="mt-12 text-[#666666]">END OF TRANSMISSION</pre>
        </footer>
      </main>
    </div>
  );
};

export default Index;