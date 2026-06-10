const SKILLS: Record<string, string[]> = {
  frontend: ["react", "vue", "typescript"],
  backend: ["node.js", "python", "fastapi"],
  devops: ["docker", "aws"],
};

const AboutSection = () => {
  return (
    <section id="about">
      <h2 className="text-emerald-400 text-sm mb-6">
        <span className="text-night-faint">01.</span> about
      </h2>
      <p className="text-lg md:text-xl leading-relaxed text-white max-w-xl">
        8+ years turning complex problems into clean, efficient solutions.
        From frontend interfaces to backend architectures — reliable,
        scalable, maintainable.
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group}>
            <p className="text-night-muted mb-2">{group}/</p>
            <ul className="space-y-1 text-night-fg">
              {items.map((item, i) => (
                <li key={item}>
                  <span className="text-night-faint">
                    {i === items.length - 1 ? "└── " : "├── "}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
