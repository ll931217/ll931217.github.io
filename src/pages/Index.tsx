import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentPosts from "@/components/blog/RecentPosts";
import { useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [scroll, setScroll] = useState(0);
  const nameRef = useRef(null);

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
    const chars = gsap.utils.toArray('.name-char');
    gsap.from(chars, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out'
    });

    gsap.to('.scroll-indicator', {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.grid-lines', {
      y: 100,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });

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
  }, []);

  const glitchEffect = () => {
    gsap.to(nameRef.current, {
      x: '+=5',
      duration: 0.05,
      yoyo: true,
      repeat: 3
    });
    gsap.to(nameRef.current, {
      textShadow: '2px 2px #ff3333, -2px -2px #00ff00',
      duration: 0.1,
      yoyo: true,
      repeat: 1
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
      <div className="fixed top-4 right-4 text-[#ff3333] z-50 mix-blend-difference scroll-indicator">
        [SCROLL: {scroll}%]
      </div>

      <div className="fixed top-0 left-0 w-full h-full grid grid-cols-6 md:grid-cols-12 gap-0 pointer-events-none z-0 grid-lines">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-[#666666] border-opacity-20 h-full"></div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full grid grid-rows-6 gap-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="border-b border-[#666666] border-opacity-20 w-full"></div>
            ))}
        </div>
      </div>
      
      <main className="relative z-10">
        <section className="h-screen flex items-center justify-center overflow-hidden p-4">
          <h1 
            ref={nameRef}
            className="font-bold uppercase whitespace-nowrap text-center"
            style={{
                fontSize: 'clamp(2rem, 8vw, 6rem)',
                letterSpacing: 'clamp(0.5rem, 4vw, 2rem)',
                lineHeight: '0.8',
                marginLeft: 'clamp(0.5rem, 4vw, 2rem)',
            }}
            onMouseEnter={glitchEffect}
          >
            {nameChars}
          </h1>
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
              <h2 className="text-[#ff3333] mb-4 text-xl">[SKILLS]</h2>
              <pre className="text-sm md:text-base text-white">
{`├── frontend/
│   ├── react.tsx
│   ├── vue.ts
│   └── typescript.d.ts
├── backend/
│   ├── node.js
│   ├── python.py
│   └── fastapi.py
└── devops/
    ├── docker
    └── aws`}
              </pre>
            </div>
          </div>
        </section>

        <FeaturedProjects />
        <RecentPosts />

        <footer className="py-12 px-4 md:px-8 border-t-4 border-white mt-20 text-center">
            <h2 className="text-[#ff3333] text-xl mb-4">[CONTACT]</h2>
            <a href="https://github.com/ll931217" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff3333] transition-colors duration-75 text-lg">
                github.com/ll931217
            </a>
            <pre className="mt-12 text-[#666666]">END OF TRANSMISSION</pre>
        </footer>
      </main>
    </div>
  );
};

export default Index;