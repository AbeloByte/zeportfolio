"use client";

import { Project } from "@/types";
import { motion } from "framer-motion";
import { robotHint } from "@/data/robotGuide";
import { TapedPhoto } from "../shared/Storybook";
import ProjectLinks from "./ProjectLinks";

interface Props {
  project: Project;
  index: number;
}

/** A project as a sketchbook page: number, title, note, tags, and a taped-in screenshot. */
const ProjectRow = ({ project, index }: Props) => {
  return (
    <motion.article
      data-robot-say={robotHint.project(project)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-5 rounded-md border border-creamLine bg-[#FBF6EA] p-5 shadow-[0_14px_30px_-22px_rgba(19,40,58,0.5)] sm:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-8 md:p-7"
    >
      {/* Number */}
      <span aria-hidden className="self-start font-display text-5xl font-semibold leading-none text-dusk/25 md:text-6xl">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex min-w-0 flex-col gap-3">
        <h3 className="font-display text-3xl font-semibold leading-none text-dusk md:text-4xl">{project.title}</h3>
        <p className="max-w-xl font-general-sans text-[15px] leading-relaxed text-dusk/75 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-dusk/25 px-2.5 py-0.5 font-type text-xs text-dusk/80">
              {tag}
            </span>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>

      {/* Taped-in screenshot */}
      <TapedPhoto
        src={project.image}
        alt={`${project.title} screenshot`}
        tilt={index % 2 === 0 ? 2 : -2}
        sizes="240px"
        className="col-span-2 mx-auto w-full max-w-[280px] sm:col-span-1 sm:w-48 md:w-60"
      />
    </motion.article>
  );
};

export default ProjectRow;
