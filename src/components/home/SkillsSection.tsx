import React from "react";

const SkillsSection = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Vue", "TypeScript", "Nuxt.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Python",
        "Express",
        "FastAPI",
        "GraphQL",
        "RESTful APIs",
      ],
    },
    {
      category: "Database",
      items: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "TypeORM"],
    },
    {
      category: "DevOps",
      items: ["Docker", "GitHub Actions", "AWS", "Terraform", "GCP"],
    },
  ];

  return (
    <section className="py-16 border-t border-tokyo-selection">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-tokyo-purple">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <div key={index} className="tokyo-card">
              <h3 className="text-xl font-semibold mb-4 text-tokyo-accent">
                {skillGroup.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-tokyo-selection/30 text-tokyo-fg px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
