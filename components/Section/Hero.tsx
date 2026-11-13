"use client";

import React from "react";
import Image from "next/image";
import heroHill from "@/public/images/hero-hill.png";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../layout/Container";
import RobotStop from "../shared/RobotStop";
import { EASE } from "../motion";

/* ────────────────────────────────────────────────
   Hero — storybook vibe.
   Painted sky, a tall cream headline, a handwritten
   note, an illustration of Abel and the tiny robot
   on a hill, and a row of paper index cards that the
   grass sits on.
   ──────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.12 0 0 0 0 0.15 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Hand-drawn style line icons (ink on cream) */
const iconProps = {
  width: 34,
  height: 34,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const IconWindow = () => (
  <svg {...iconProps}>
    <path d="M6 9.5c9-.6 19-.7 28 .2l-.4 20.6c-9 .5-18.4.4-27.4-.3z" />
    <path d="M6.3 14.5c9.2-.4 18.4-.3 27.5.1" />
    <circle cx="9.6" cy="12" r=".7" />
    <circle cx="12.4" cy="12" r=".7" />
    <path d="M13 21.5l-3 2.6 3 2.4M27 21.3l3 2.7-3 2.3M22 19.5l-4 9" />
  </svg>
);

const IconSprout = () => (
  <svg {...iconProps}>
    <path d="M20 34c.3-6 .1-11-.6-16" />
    <path d="M19.6 20c-3.8.6-8-1.6-9.4-6.4 4.6-.8 8.4 1.6 9.4 6.4z" />
    <path d="M19.8 16.5c1.2-4.6 5.4-7.4 10.2-6.6-1 4.8-5.4 7.6-10.2 6.6z" />
    <path d="M12 34.2c5.2-.5 10.8-.6 16.2-.1" />
  </svg>
);

const IconPeaks = () => (
  <svg {...iconProps}>
    <path d="M4 31.5l10.5-16 5.6 8.2 4.4-5.7L36 31.6" />
    <path d="M11.6 20l2.6 1.8 2.3-1.6" />
    <path d="M24.4 17.9V9.5l5 1.6-5 1.8" />
    <path d="M3.5 31.8c11-.4 22-.4 33 0" />
  </svg>
);

const cards = [
  { label: "Projects", text: "Things I designed, built, and shipped.", cta: "Explore", href: "#projects", Icon: IconWindow },
  { label: "About", text: "Who I am and how I like to work.", cta: "Read", href: "#about", Icon: IconSprout },
  { label: "Experience", text: "Teams, internships, lessons learned.", cta: "Browse", href: "#experience", Icon: IconPeaks },
];

const Hero = () => {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section
      id="home"
      className="relative -mt-[84px] overflow-hidden bg-sky"
      style={{ backgroundImage: "linear-gradient(180deg, #3C7FAA 0%, #4A8DB5 55%, #6CA6C6 100%)" }}
    >
      {/* paper grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: GRAIN }} />

      <Container className="relative z-10 flex min-h-[100svh] flex-col pt-[84px]">
        {/* The tour robot starts here (rendered by <RobotGuide />) */}
        <RobotStop id="home" className="absolute right-0 top-[120px]" />

        <div className="flex flex-1 flex-col justify-center py-16">
          <h1
            className="font-display font-semibold lowercase text-cream leading-[0.84] tracking-[-0.01em]"
            style={{ fontSize: "clamp(4.25rem, 12vw, 10rem)" }}
          >
            <motion.span className="block" {...rise(0.15)}>dream it up.</motion.span>
            <motion.span className="block" {...rise(0.3)}>build it right.</motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-md font-script text-2xl sm:text-[1.7rem] leading-snug text-dusk/85 -rotate-1"
            {...rise(0.55)}
          >
            notes from Abel, a developer who designs: clean interfaces, solid code, and a tiny robot friend.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-8" {...rise(0.7)}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 border-b border-dusk/50 pb-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-dusk transition-colors hover:border-dusk"
            >
              See my work
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1X_q8e8kGmlyqDlZULYyJ8a5bZIotcmRj/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.28em] text-dusk/80 transition-colors hover:text-dusk"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Illustration sitting on the index cards (the cards act as the ground) */}
        <div className="relative mb-6">
          <motion.div
            className="pointer-events-none relative z-0 -mb-5 ml-auto w-full max-w-[560px] lg:absolute lg:bottom-full lg:right-0 lg:mb-0 lg:w-[64%] lg:max-w-none lg:translate-y-5"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
          >
            <Image
              src={heroHill}
              alt="Illustration of Abel and his tiny robot sitting on a grassy hill, looking up at the sky"
              priority
              sizes="(min-width: 1024px) 780px, 100vw"
              className="h-auto w-full select-none"
            />
          </motion.div>

        {/* Paper index cards */}
        <motion.div
          className="relative z-10 grid grid-cols-1 overflow-hidden rounded-md border border-creamLine bg-cream shadow-[0_18px_40px_-20px_rgba(19,40,58,0.55)] sm:grid-cols-2 lg:grid-cols-4"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
        >
          {cards.map(({ label, text, cta, href, Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex items-start gap-4 border-b border-creamLine p-5 text-dusk transition-colors hover:bg-[#EFE3C8] sm:border-r lg:border-b-0"
            >
              <span className="mt-0.5 shrink-0 text-dusk/80 transition-transform group-hover:-rotate-6">
                <Icon />
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em]">{label}</span>
                <span className="font-type text-[13px] leading-snug text-dusk/80">{text}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-dusk/70 group-hover:text-dusk">
                  {cta} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </span>
            </a>
          ))}

          {/* Quote card */}
          <div className="flex gap-3 p-5 text-dusk">
            <span aria-hidden className="font-display text-4xl leading-none text-dusk/70">&ldquo;</span>
            <div className="flex flex-col gap-1">
              <p className="font-type text-[13px] leading-snug text-dusk/85">
                Build things. Break things. Learn always.
              </p>
              <p className="self-end font-script text-xl text-dusk/80 -rotate-2">keep building.</p>
            </div>
          </div>
        </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
