import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tokyo-cyan via-tokyo-accent to-tokyo-purple">
          <span className="block md:inline">Hi, I'm </span>
          <span className="block md:inline">Liang-Shih Lin</span>
        </h1>

        <div className="space-y-6 mb-8">
          <p className="text-xl md:text-2xl text-tokyo-fg/90">
            A passionate full-stack developer specializing in modern web
            technologies and creative solutions based in Taiwan.
          </p>

          <p className="text-lg text-tokyo-comment">
            I build responsive, accessible, and performant web applications with
            modern technologies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/projects"
            className="tokyo-button inline-flex items-center"
          >
            View My Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            to="/blog"
            className="bg-transparent hover:bg-tokyo-selection text-tokyo-accent border border-tokyo-accent hover:text-tokyo-fg px-4 py-2 rounded-md transition-colors duration-300 inline-flex items-center"
          >
            Read My Blog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
