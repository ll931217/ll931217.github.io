import DesignNav from "@/components/DesignNav";
import { useEffect, useState } from "react";

const Design1 = () => {
  const [scroll, setScroll] = useState(0);

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

  return (
    <div className="bg-[#0a0a0a] text-white font-ibm-mono min-h-screen overflow-x-hidden">
      <DesignNav />
      <div className="fixed top-4 right-4 text-[#ff3333] z-50 mix-blend-difference">
        [SCROLL: {scroll}%]
      </div>

      {}
      <div className="fixed top-0 left-0 w-full h-full grid grid-cols-6 md:grid-cols-12 gap-0 pointer-events-none z-0">
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
            className="font-bold uppercase whitespace-nowrap text-center"
            style={{
                fontSize: 'clamp(3rem, 25vw, 20rem)',
                letterSpacing: 'clamp(0.5rem, 4vw, 2rem)',
                lineHeight: '0.8',
                transform: 'scale(1.2)',
                marginLeft: 'clamp(0.5rem, 4vw, 2rem)',
            }}
          >
            LIANG-SHIH LIN
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

        <section className="py-20 px-4 md:px-8 border-t-2 border-dashed border-[#666666]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[#ff3333] text-xl mb-8">[PROJECTS]</h2>
            <pre className="text-sm md:text-base whitespace-pre-wrap">
{`-rw-r--r-- 2024 project-llm-code-gen
-rw-r--r-- 2023 project-realtime-chat
-rw-r--r-- 2022 project-ecommerce-api
-rw-r--r-- 2021 project-portfolio-v1`}
            </pre>
          </div>
        </section>

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

export default Design1;
