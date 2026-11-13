import { experiences } from "@/data/experience";
import Container from "../layout/Container";
import { Reveal, Stagger, StaggerItem, Grow, Pop } from "../motion";
import RobotStop from "../shared/RobotStop";
import { Grain } from "../shared/Storybook";

/* ────────────────────────────────────────────────
   Experience — storybook vibe, kept simple.
   A dashed ink timeline with numbered markers;
   each role is written straight onto the paper,
   separated by a thin rule.
   ──────────────────────────────────────────────── */

export default function ExperienceSection() {
  const items = [...experiences].reverse(); // newest first

  return (
    <section id="experience" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <Grain tone="paper" opacity={0.6} />

      <Container className="relative">
        <div className="hidden md:flex justify-end mb-6">
          <RobotStop id="experience" />
        </div>

        <Reveal className="mb-14">
          <p className="font-script text-2xl text-dusk/75 -rotate-1">where i&apos;ve been</p>
          <h2
            className="mt-1 font-display font-semibold lowercase leading-[0.88] text-dusk"
            style={{ fontSize: "clamp(3.25rem, 7vw, 5.75rem)" }}
          >
            experience.
          </h2>
        </Reveal>

        <div className="relative">
          {/* dashed ink timeline */}
          <Grow className="absolute left-[19px] top-2 bottom-2 w-0 border-l-2 border-dashed border-dusk/30" duration={1.6} />

          <ol>
            {items.map((exp, index) => (
              <li key={exp.id} className="relative flex gap-6 md:gap-10">
                {/* numbered marker */}
                <Pop
                  delay={0.1}
                  className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dusk bg-cream"
                >
                  <span className="font-display text-lg font-semibold leading-none text-dusk">
                    {String(items.length - index).padStart(2, "0")}
                  </span>
                </Pop>

                {/* entry, written straight on the paper */}
                <Stagger
                  stagger={0.07}
                  className={`flex-1 ${index < items.length - 1 ? "mb-10 border-b border-dusk/15 pb-10" : ""}`}
                >
                  <StaggerItem className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                    <h3 className="font-display text-3xl font-semibold leading-tight text-dusk md:text-4xl">{exp.role}</h3>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="font-type text-sm text-dusk/70">{exp.dateRange}</span>
                      <span className="rounded-full border border-dusk/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-dusk/80">
                        {exp.workType}
                      </span>
                    </span>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-dusk/70">
                      {exp.company} · {exp.location}
                    </p>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="mt-4 max-w-3xl font-general-sans text-[15px] leading-[1.8] text-dusk/75">{exp.description}</p>
                  </StaggerItem>

                  <StaggerItem className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-dusk/25 px-2.5 py-0.5 font-type text-xs text-dusk/80">
                        {tech}
                      </span>
                    ))}
                  </StaggerItem>
                </Stagger>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
