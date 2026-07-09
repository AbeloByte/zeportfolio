"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../layout/Container";

const skillCategories = [
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Convex"],
  },
  {
    category: "Design & Tools",
    skills: ["Figma", "UI/UX Design", "Git", "GitHub", "VS Code"],
  },
];

// Flatten with category info for staggered animation
const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((skill) => ({ skill, category: cat.category }))
);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bgColor py-16" id="skills">
      <Container>
        <h2 className="text-2xl md:text-4xl font-bold mb-12 text-white font-space-grotesk">
          Skills
        </h2>

        <div className="flex flex-col gap-10">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="flex flex-col gap-4">

              {/* Category label */}
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primaryColor">
                {cat.category}
              </span>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, i) => {
                  // Global index for stagger delay across all categories
                  const globalIndex = allSkills.findIndex(
                    (s) => s.skill === skill && s.category === cat.category
                  );
                  return (
                    <span
                      key={skill}
                      className="bg-white/5 border border-white/10 text-white text-sm font-mono px-4 py-2
                        hover:border-primaryColor hover:text-primaryColor hover:bg-primaryColor/10
                        transition-all duration-200 cursor-default
                        opacity-0 translate-y-3"
                      style={{
                        animation: visible
                          ? `skillFadeIn 0.4s ease forwards ${globalIndex * 60}ms`
                          : "none",
                      }}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </Container>

      <style>{`
        @keyframes skillFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
