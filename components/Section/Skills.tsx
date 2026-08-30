import Container from "../layout/Container";
import SectionTitle from "../shared/SectionTitle";
import { Stagger, StaggerItem, StaggerTag } from "../motion";

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

export default function Skills() {
  return (
    <section className="relative overflow-hidden bg-bgColor py-24 md:py-32" id="skills">
      <Container>
        <SectionTitle
          index="02"
          eyebrow="What I work with"
          title="Skills"
          className="mb-14 md:mb-16"
        />

        <div className="flex flex-col gap-10">
          {skillCategories.map((cat, catIndex) => (
            <Stagger
              key={cat.category}
              stagger={0.05}
              delay={catIndex * 0.1}
              className="flex flex-col gap-4"
            >
              {/* Category label */}
              <StaggerItem>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primaryColor">
                  {cat.category}
                </span>
              </StaggerItem>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <StaggerTag
                    key={skill}
                    whileHover={{ y: -4 }}
                    className="cursor-default border border-hairline bg-white/5 px-4 py-2 font-mono text-sm text-white
                      transition-colors duration-300 hover:border-primaryColor hover:bg-primaryColor/10 hover:text-primaryColor"
                  >
                    {skill}
                  </StaggerTag>
                ))}
              </div>
            </Stagger>
          ))}
        </div>
      </Container>
    </section>
  );
}
