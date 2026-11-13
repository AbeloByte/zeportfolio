import { experiences } from "@/data/experience";
import Container from "../layout/Container";
import { Reveal, Stagger, StaggerItem, StaggerTag, Grow, Pop } from "../motion";
import RobotStop from "../shared/RobotStop";

const workTypeBadge: Record<string, string> = {
  "Remote":  "bg-black-50 text-black border border-black-200",
  "On-site": "bg-black-50 text-black border border-black-200",
  "Hybrid":  "bg-black-50 text-black border border-black-200",
};

export default function ExperienceSection() {
  return (
    <section className="bg-white py-16" id="experience">
      <Container>
        <div className="hidden md:flex justify-end mb-6">
          <RobotStop id="experience" />
        </div>
        <Reveal>
          <h2 className="text-2xl md:text-4xl font-bold mb-12 text-bgColor font-space-grotesk">
            Experience
          </h2>
        </Reveal>

        {/* Timeline wrapper */}
        <div className="relative">

          {/* Vertical track line — right side */}
          <Grow className="absolute right-[19px] md:right-[23px] top-0 bottom-0 w-0.5 bg-gray-200" duration={1.4} />

          <div className="flex flex-col">
            {[...experiences].reverse().map((exp, index) => (
              <div key={exp.id} className="relative flex flex-row-reverse gap-8 md:gap-12 pb-12 last:pb-0">

                {/* Node */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <Pop
                    delay={0.15}
                    className="w-10 h-10 rounded-full bg-bgColor border-4 border-primaryColor flex items-center justify-center shrink-0"
                  >
                    <span className="text-xs font-mono font-bold text-primaryColor leading-none">
                      {String(experiences.length - index).padStart(2, "0")}
                    </span>
                  </Pop>
                </div>

                {/* Content */}
                <Stagger stagger={0.09} className="flex-1 border-b border-gray-200 last:border-b-0 pb-12 last:pb-0 -mt-1">

                  {/* Role + date */}
                  <StaggerItem direction="left" className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                    <h3 className="text-lg md:text-xl font-semibold font-space-grotesk text-bgColor">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono text-gray-400 shrink-0">
                      {exp.dateRange}
                    </span>
                  </StaggerItem>

                  {/* Company + location + work type */}
                  <StaggerItem direction="left" className="flex flex-wrap items-center gap-3 mb-5">
                    {/* Company */}
                    <span className="flex items-center gap-1.5 text-sm font-medium text-bgColor">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                      </svg>
                      {exp.company}
                    </span>

                    <span className="text-gray-300">·</span>

                    {/* Location */}
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {exp.location}
                    </span>

                    <span className="text-gray-300">·</span>

                    {/* Work type badge */}
                    <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 ${workTypeBadge[exp.workType]}`}>
                      {exp.workType}
                    </span>
                  </StaggerItem>

                  {/* Description */}
                  <StaggerItem>
                    <p className="text-sm sm:text-base text-experiencebodyText leading-[1.8] mb-6">
                      {exp.description}
                    </p>
                  </StaggerItem>

                  {/* Tech tags */}
                  <Stagger stagger={0.05} className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech) => (
                      <StaggerTag
                        key={tech}
                        whileHover={{ y: -3 }}
                        className="bg-black text-white px-4 py-1 text-sm font-mono border-b-4 border-[#DFFF00]"
                      >
                        {tech}
                      </StaggerTag>
                    ))}
                  </Stagger>

                </Stagger>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
