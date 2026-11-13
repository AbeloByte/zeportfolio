"use client";

import { Project } from "@/types";
import { robotHint } from "@/data/robotGuide";
import { TapedPhoto } from "../shared/Storybook";
import ProjectLinks from "./ProjectLinks";

/** Grid view: a paper card with the screenshot taped on top. */
const ProjectCard = ({ project, index = 0 }: { project: Project; index?: number }) => {
  return (
    <article
      data-robot-say={robotHint.project(project)}
      className="group flex h-full flex-col gap-4 rounded-md border border-creamLine bg-[#FBF6EA] p-5 pt-7"
    >
      <TapedPhoto
        src={project.image}
        alt={`${project.title} screenshot`}
        tilt={index % 2 === 0 ? -1.5 : 1.5}
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
      />

      <div className="mt-2 flex flex-1 flex-col gap-3">
        <h3 className="font-display text-3xl font-semibold leading-none text-dusk">{project.title}</h3>
        <p className="grow font-general-sans text-[15px] leading-relaxed text-dusk/75 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-dusk/25 px-2.5 py-0.5 font-type text-xs text-dusk/80">
              {tag}
            </span>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
};

export default ProjectCard;
