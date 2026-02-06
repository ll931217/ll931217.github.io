
import DesignNav from "@/components/DesignNav";
import React from "react";

const Design2 = () => {
  return (
    <div className="bg-[#faf9f6] min-h-screen font-source-serif text-[#1a1a1a] scroll-smooth">
      <DesignNav />
      <header className="fixed top-0 right-0 p-8 md:p-12 z-10">
        <p className="font-archivo uppercase text-xs tracking-widest text-[#767676]">
          № 01 — 2026
        </p>
      </header>

      <main className="w-full max-w-7xl mx-auto px-8 md:px-12 py-32">
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <h1 className="font-playfair font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter text-center md:text-left leading-none">
              <span className="block -indent-[0.5em]">L I A N G - S H I H</span>
              <span className="block">L I N</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-8 my-32 md:my-48">
          <div className="col-span-12 md:col-span-6 md:col-start-6">
            <blockquote className="font-playfair italic font-semibold text-5xl md:text-6xl text-[#c9a227] leading-tight">
              “Simplicity is best”
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-8 gap-y-16 items-start">
            <div className="col-span-12 md:col-span-3">
                <p className="font-archivo uppercase text-sm tracking-widest text-[#767676]">
                About
                </p>
            </div>
            <div className="col-span-12 md:col-span-9">
                <p className="md:columns-2 gap-x-8 text-lg leading-relaxed text-[#3a3a3a] first-letter:text-7xl first-letter:font-bold first-letter:font-playfair first-letter:text-[#1a1a1a] first-letter:mr-4 first-letter:float-left">
                Full-stack developer with a passion for building systems that work. Based in Taiwan, crafting digital experiences that combine technical precision with elegant simplicity. Eight years of turning complex problems into clean, efficient, and scalable solutions. My work is a blend of thoughtful architecture, clean code, and user-centric design.
                </p>
            </div>
        </div>


        <section className="my-32 md:my-48">
            <div className="grid grid-cols-12 gap-x-8 gap-y-16">
                <div className="col-span-12 md:col-span-3">
                    <h2 className="font-archivo uppercase text-sm tracking-widest text-[#767676] sticky top-8">
                        The Craft
                    </h2>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-12">
                    <div className="pb-4 border-b border-[#e0e0e0]">
                        <h3 className="font-playfair text-3xl font-semibold mb-2">Frontend</h3>
                        <p className="font-source-serif text-lg text-[#767676]">React • Vue • TypeScript • Nuxt.js • Tailwind CSS</p>
                    </div>
                    <div className="pb-4 border-b border-[#e0e0e0]">
                        <h3 className="font-playfair text-3xl font-semibold mb-2">Backend</h3>
                        <p className="font-source-serif text-lg text-[#767676]">Node.js • Python • Express • FastAPI • GraphQL • RESTful APIs</p>
                    </div>
                    <div className="pb-4 border-b border-[#e0e0e0]">
                        <h3 className="font-playfair text-3xl font-semibold mb-2">Database</h3>
                        <p className="font-source-serif text-lg text-[#767676]">MongoDB • PostgreSQL • Redis • Firebase • TypeORM</p>
                    </div>
                    <div className="pb-4 border-b border-[#e0e0e0]">
                        <h3 className="font-playfair text-3xl font-semibold mb-2">DevOps</h3>
                        <p className="font-source-serif text-lg text-[#767676]">Docker • GitHub Actions • AWS • Terraform • GCP</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="my-32 md:my-48">
          <div className="grid grid-cols-12 gap-x-8 gap-y-16">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-archivo uppercase text-sm tracking-widest text-[#767676] sticky top-8">
                Selected Works
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9 space-y-24">
              <div className="group">
                <h3 className="font-playfair text-5xl md:text-6xl font-bold leading-none">Project One</h3>
                <p className="font-source-serif text-lg text-[#767676] mt-4 max-w-xl">A sophisticated platform for something very important, built with care and precision.</p>
                <div className="h-px bg-[#e0e0e0] w-full mt-8 group-hover:bg-[#c9a227] transition-colors duration-300"></div>
              </div>
              <div className="group">
                <h3 className="font-playfair text-5xl md:text-6xl font-bold leading-none">Project Two</h3>
                <p className="font-source-serif text-lg text-[#767676] mt-4 max-w-xl">A minimalist application that solves a complex problem with an elegant user interface.</p>
                <div className="h-px bg-[#e0e0e0] w-full mt-8 group-hover:bg-[#c9a227] transition-colors duration-300"></div>
              </div>
               <div className="group">
                <h3 className="font-playfair text-5xl md:text-6xl font-bold leading-none">Project Three</h3>
                <p className="font-source-serif text-lg text-[#767676] mt-4 max-w-xl">An experimental data visualization exploring the intersection of art and technology.</p>
                <div className="h-px bg-[#e0e0e0] w-full mt-8 group-hover:bg-[#c9a227] transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-8 md:px-12 py-16 mt-16 border-t border-[#e0e0e0]">
        <div className="grid grid-cols-12 gap-x-8 gap-y-8">
            <div className="col-span-12 md:col-span-4">
                <h4 className="font-archivo uppercase text-sm tracking-widest">Liang-Shih Lin</h4>
                <p className="font-source-serif text-sm text-[#767676]">Full-stack Developer</p>
            </div>
            <div className="col-span-6 md:col-span-2">
                 <h4 className="font-archivo uppercase text-sm tracking-widest">Contact</h4>
                 <a href="#" className="font-source-serif text-sm text-[#767676] hover:text-[#c9a227] block">Email</a>
                 <a href="#" className="font-source-serif text-sm text-[#767676] hover:text-[#c9a227] block">LinkedIn</a>
            </div>
             <div className="col-span-6 md:col-span-2">
                 <h4 className="font-archivo uppercase text-sm tracking-widest">Location</h4>
                 <p className="font-source-serif text-sm text-[#767676]">Taiwan</p>
            </div>
            <div className="col-span-12 md:col-span-4 text-right">
                <p className="font-source-serif text-sm text-[#767676]">&copy; 2026. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Design2;
