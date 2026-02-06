
import React from "react";
import DesignNav from "@/components/DesignNav";

const Design5 = () => {
  return (
    <div className="bg-[#f5f5f0] min-h-screen font-dm-sans text-[#1d1d1d]">
      <DesignNav />
      <main className="p-8">
        <header className="relative grid grid-cols-12 gap-4 items-center mb-24 h-96">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f4a261] rounded-full z-0 opacity-50"></div>
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-[#264653]"></div>
          <div className="col-start-3 col-span-8 z-10 text-center">
            <div className="border-8 border-[#1d1d1d] p-8 bg-[#f5f5f0]">
              <h1 className="font-bebas text-7xl tracking-widest">LIANG-SHIH</h1>
              <h1 className="font-bebas text-7xl tracking-widest">LIN</h1>
            </div>
          </div>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
            <div
              className="w-0 h-0
              border-l-[50px] border-l-transparent
              border-b-[100px] border-b-[#e63946]
              border-r-[50px] border-r-transparent"
            ></div>
          </div>
        </header>

        <section className="my-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="border-8 border-[#1d1d1d] bg-[#e63946] text-white p-12 text-center hover:scale-105 transition-transform">
              <span className="font-bebas text-3xl">REACT</span>
            </div>
            <div className="border-8 border-[#1d1d1d] bg-[#f4a261] p-12 text-center hover:scale-105 transition-transform">
              <span className="font-bebas text-3xl">NODE.JS</span>
            </div>
            <div className="border-8 border-[#1d1d1d] bg-[#2a9d8f] text-white p-12 text-center hover:scale-105 transition-transform">
              <span className="font-bebas text-3xl">PYTHON</span>
            </div>
            <div className="border-8 border-[#1d1d1d] bg-[#264653] text-white p-12 text-center hover:scale-105 transition-transform">
              <span className="font-bebas text-3xl">DOCKER</span>
            </div>
          </div>
        </section>

        <section className="my-32 max-w-4xl mx-auto text-center">
            <div className="h-2 bg-[#1d1d1d] w-1/4 mx-auto mb-12"></div>
            <p className="text-xl leading-relaxed">
                A software engineer with a passion for building beautiful, functional, and user-centric applications. I believe in design as a form of engineering – precise, balanced, and confident. My goal is to create digital experiences that are not only aesthetically pleasing but also robust and scalable.
            </p>
            <div className="h-2 bg-[#1d1d1d] w-1/4 mx-auto mt-12"></div>
        </section>


        <section className="my-48 relative h-96 flex justify-center items-center">
            <div className="absolute w-full max-w-xl border-8 border-[#2a9d8f] bg-white p-8 transform -rotate-3 transition-transform hover:rotate-0 hover:scale-105 z-10">
                <h3 className="font-bebas text-4xl">Project One</h3>
                <p>A description of the first project, highlighting the technologies and design principles used.</p>
            </div>
            <div className="absolute w-full max-w-xl border-8 border-[#e63946] bg-white p-8 transform rotate-3 transition-transform hover:rotate-0 hover:scale-105">
                <h3 className="font-bebas text-4xl">Project Two</h3>
                <p>A description of the second project, focusing on its unique challenges and solutions.</p>
            </div>
        </section>

        <footer className="mt-48 text-center pb-12">
            <div className="flex justify-center space-x-6">
                <div className="w-6 h-6 bg-[#1d1d1d] rounded-full hover:bg-[#e63946] transition-colors cursor-pointer"></div>
                <div className="w-6 h-6 bg-[#1d1d1d] rounded-full hover:bg-[#f4a261] transition-colors cursor-pointer"></div>
                <div className="w-6 h-6 bg-[#1d1d1d] rounded-full hover:bg-[#2a9d8f] transition-colors cursor-pointer"></div>
                <div className="w-6 h-6 bg-[#1d1d1d] rounded-full hover:bg-[#264653] transition-colors cursor-pointer"></div>
                 <div className="w-6 h-6 bg-[#1d1d1d] rounded-full hover:bg-black transition-colors cursor-pointer"></div>
            </div>
        </footer>

      </main>
    </div>
  );
};

export default Design5;
