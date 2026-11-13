import React from "react";
import Image from "next/image";
import Container from "../layout/Container";
import { Reveal, Stagger, StaggerItem, StaggerTag } from "../motion";
import { robotHint } from "@/data/robotGuide";
import RobotStop from "../shared/RobotStop";
import aboutRobot from "@/public/images/about-robot.png";
import aboutMe from "@/public/images/about-me.png";

/* ────────────────────────────────────────────────
   About — storybook vibe.
   Cream paper; Abel's cut-out photo standing on the
   paper with the illustrated robot at his side
   (mixed media), a tall lowercase headline, and paper
   index-card stats like the hero.
   ──────────────────────────────────────────────── */

const CV_URL = "https://drive.google.com/file/d/1X_q8e8kGmlyqDlZULYyJ8a5bZIotcmRj/view?usp=sharing";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E\")";

const stats = [
  { value: "4+", label: "years in tech" },
  { value: "10+", label: "projects built" },
  { value: "∞", label: "cups of coffee" },
];

const roles = ["Software Developer", "Full-Stack Developer", "UI/UX Designer"];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-20 md:py-28">
      {/* paper grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply" style={{ backgroundImage: GRAIN }} />

      <Container className="relative">
        <div className="hidden md:flex justify-end mb-6">
          <RobotStop id="about" />
        </div>

        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* ── Portrait: cut-out photo on the paper, robot sidekick at his side ── */}
          <Reveal direction="right" distance={40} className="relative mx-auto w-full max-w-[440px]">
            <div className="relative aspect-[4/5]">
              {/* Abel — the cut-off waist fades softly into the paper */}
              <Image
                src={aboutMe}
                alt="Abel Adane, arms crossed, smiling slightly"
                sizes="(min-width: 768px) 420px, 85vw"
                className="absolute bottom-0 left-1/2 h-auto w-[92%] -translate-x-1/2 select-none"
                style={{
                  maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                }}
              />

              {/* robot sidekick with the sketchbook */}
              <Image
                src={aboutRobot}
                alt="Abel's tiny robot showing a sketchbook full of app wireframes"
                sizes="200px"
                className="absolute -bottom-6 -left-6 h-auto w-[44%] select-none sm:-left-10"
              />

              {/* handwritten note */}
              <p aria-hidden className="absolute right-0 top-[6%] flex items-start gap-1 font-script text-2xl text-dusk/80 rotate-[5deg] sm:-right-6">
                <svg width="34" height="28" viewBox="0 0 38 30" fill="none" className="mt-4 shrink-0 -scale-x-100">
                  <path d="M2 4c10 1 22 6 30 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M26 20.5l6.2 2.3.4-6.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                that&apos;s me.
              </p>
            </div>
          </Reveal>

          {/* ── Text ── */}
          <div className="flex flex-col gap-7">
            <Reveal>
              <p className="font-script text-2xl text-dusk/75 -rotate-1">a little about me</p>
              <h2
                className="mt-1 font-display font-semibold lowercase leading-[0.88] text-dusk"
                style={{ fontSize: "clamp(3.25rem, 7vw, 5.75rem)" }}
              >
                hi, i&apos;m abel.
              </h2>
            </Reveal>

            <Stagger stagger={0.07} className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <StaggerTag
                  key={role}
                  whileHover={{ y: -2, rotate: -1 }}
                  className="rounded-full border border-dusk/30 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-dusk"
                >
                  {role}
                </StaggerTag>
              ))}
            </Stagger>

            <Stagger stagger={0.1} className="flex flex-col gap-5 font-general-sans">
              <StaggerItem>
                <p className="text-lg leading-relaxed text-dusk">
                  I build products that combine clean engineering with thoughtful design.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base leading-[1.8] text-dusk/75">
                  I&apos;m a software developer focused on full-stack development, and I enjoy turning ideas into intuitive digital experiences. My work pairs thoughtful interface design with scalable backend architecture, so what I build looks good and holds up technically.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base leading-[1.8] text-dusk/75">
                  Beyond clean, maintainable code, I care about understanding people and solving real problems. Lately I&apos;ve been growing my UI/UX skills to make products that don&apos;t just work, but feel effortless to use.
                </p>
              </StaggerItem>
            </Stagger>

            {/* Stats — paper index cards, like the hero */}
            <Stagger
              stagger={0.08}
              className="grid grid-cols-3 overflow-hidden rounded-md border border-creamLine bg-[#FBF6EA] shadow-[0_14px_30px_-20px_rgba(19,40,58,0.45)]"
            >
              {stats.map((s, i) => (
                <StaggerItem
                  key={s.label}
                  className={`flex flex-col gap-1 px-4 py-4 ${i < stats.length - 1 ? "border-r border-creamLine" : ""}`}
                >
                  {/* the display font has no ∞ glyph, so draw that one in the body font */}
                  <span
                    className={`font-semibold leading-none text-dusk ${
                      s.value === "∞" ? "font-general-sans text-[2.15rem]" : "font-display text-4xl"
                    }`}
                  >
                    {s.value}
                  </span>
                  <span className="font-type text-xs text-dusk/75">{s.label}</span>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Actions */}
            <Reveal className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-robot-say={robotHint.cv}
                className="inline-flex items-center gap-2 rounded-full bg-dusk px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cream transition-transform hover:-translate-y-0.5"
              >
                Download CV
                <span aria-hidden>↓</span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border-b border-dusk/50 pb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-dusk transition-colors hover:border-dusk"
              >
                Say hello
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
