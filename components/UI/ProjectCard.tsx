import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group relative px-5 py-6 w-full max-w-sm h-full bg-black border border-white/10 flex flex-col gap-4 transition-all duration-300 hover:border-transparent">

      {/* ── Corner bracket borders (appear on hover) ── */}
      {/* Top-left */}
      <span className="pointer-events-none absolute top-0 left-0 w-0 h-0
        border-t-2 border-l-2 border-primaryColor
        transition-all duration-300
        group-hover:w-8 group-hover:h-8" />
      {/* Top-right */}
      <span className="pointer-events-none absolute top-0 right-0 w-0 h-0
        border-t-2 border-r-2 border-primaryColor
        transition-all duration-300
        group-hover:w-8 group-hover:h-8" />
      {/* Bottom-left */}
      <span className="pointer-events-none absolute bottom-0 left-0 w-0 h-0
        border-b-2 border-l-2 border-primaryColor
        transition-all duration-300
        group-hover:w-8 group-hover:h-8" />
      {/* Bottom-right */}
      <span className="pointer-events-none absolute bottom-0 right-0 w-0 h-0
        border-b-2 border-r-2 border-primaryColor
        transition-all duration-300
        group-hover:w-8 group-hover:h-8" />

      {/* Project image */}
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Title + links */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-base font-bold font-space-grotesk text-white group-hover:text-primaryColor transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={project.github}
            target="_blank"
            aria-label="GitHub"
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <Image src="/Icons/github.svg" alt="GitHub" width={18} height={18} className="invert" />
          </Link>
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              aria-label="Live demo"
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image src="/Icons/external-link.svg" alt="Live Demo" width={18} height={18} className="invert" />
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed line-clamp-3 grow">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-white/60 border border-white/20 px-2.5 py-0.5 group-hover:border-white/40 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>



    </div>
  );
};

export default ProjectCard;
