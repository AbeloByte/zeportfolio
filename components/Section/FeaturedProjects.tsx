"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "../UI/ProjectCard";
import ProjectRow from "../UI/ProjectRow";
import { projects } from "@/data/projects";
import Container from "../layout/Container";
import { Reveal, Stagger, StaggerItem } from "../motion";
import RobotStop from "../shared/RobotStop";
import { Grain } from "../shared/Storybook";
import projectsRobot from "@/public/images/projects-robot.png";

/* ────────────────────────────────────────────────
   Projects — storybook vibe.
   Pale sky paper, the robot inspecting the work
   with a magnifying glass, and each project as a
   sketchbook page with a taped-in screenshot.
   ──────────────────────────────────────────────── */

const views = [
  { id: "row", label: "List" },
  { id: "grid", label: "Grid" },
] as const;

const FeaturedProjects = () => {
  const [view, setView] = useState<"grid" | "row">("row");

  return (
    <section id="projects" className="relative overflow-hidden bg-[#E3EDF2] py-20 md:py-28">
      <Grain tone="sky" opacity={0.28} />

      <Container className="relative">
        <div className="hidden md:flex justify-start mb-6">
          <RobotStop id="projects" />
        </div>

        {/* Header: words on the left, the inspecting robot on the right */}
        <div className="mb-12 grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <Reveal>
            <p className="font-script text-2xl text-dusk/75 -rotate-1">things i&apos;ve made</p>
            <h2
              className="mt-1 font-display font-semibold lowercase leading-[0.88] text-dusk"
              style={{ fontSize: "clamp(3.25rem, 7vw, 5.75rem)" }}
            >
              selected work.
            </h2>
            <p className="mt-5 max-w-md font-general-sans text-base leading-relaxed text-dusk/75">
              Landing pages, dashboards and full-stack apps. Each one taught me something new.
            </p>

            {/* View toggle — small caps with a hand-drawn underline */}
            <div className="mt-8 flex items-center gap-6" role="group" aria-label="Project layout">
              {views.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  aria-pressed={view === v.id}
                  className={`relative py-1 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors ${
                    view === v.id ? "text-dusk" : "text-dusk/55 hover:text-dusk"
                  }`}
                >
                  {v.label}
                  {view === v.id && (
                    <motion.svg
                      layoutId="view-squiggle"
                      viewBox="0 0 60 8"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute -bottom-2 left-0 h-2 w-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden
                    >
                      <path d="M1 5.5 C 10 2, 18 7, 28 4.2 S 47 2.2, 59 4.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </motion.svg>
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" distance={40} className="relative mx-auto w-full max-w-[420px]">
            <Image
              src={projectsRobot}
              alt="Abel's tiny robot inspecting floating browser windows through a big magnifying glass"
              sizes="(min-width: 768px) 420px, 85vw"
              className="h-auto w-full select-none"
            />
            <p aria-hidden className="absolute -bottom-3 right-2 font-script text-lg text-dusk/70 rotate-[-4deg]">
              quality check in progress…
            </p>
          </Reveal>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {view === "grid" ? (
            <Stagger
              key="grid"
              stagger={0.08}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((item, index) => (
                <StaggerItem key={item.id} className="h-full">
                  <ProjectCard project={item} index={index} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <Stagger
              key="row"
              stagger={0.06}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className="flex flex-col gap-5"
            >
              {projects.map((item, index) => (
                <StaggerItem key={item.id} direction="up" distance={24}>
                  <ProjectRow project={item} index={index} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
