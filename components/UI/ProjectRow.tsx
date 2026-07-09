import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  project: Project;
  index: number;
}

const ProjectRow = ({ project, index }: Props) => {
  return (
    <div className="group flex items-center gap-6 md:gap-10 border-b border-white/10 py-8 hover:bg-white/5 transition-colors px-2 -mx-2">

      {/* Number */}
      <span className="text-3xl md:text-4xl font-bold font-mono text-primaryColor shrink-0 w-10 md:w-14 leading-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg md:text-xl font-semibold font-space-grotesk text-white group-hover:text-primaryColor transition-colors">
            {project.title}
          </h3>
          {/* Links */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              href={project.github}
              target="_blank"
              className="text-white/60 hover:text-primaryColor transition-colors"
              aria-label="GitHub"
            >
              <Image src="/Icons/github.svg" alt="GitHub" width={16} height={16} className="invert opacity-60 hover:opacity-100 transition-opacity" />
            </Link>
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                className="text-white/60 hover:text-primaryColor transition-colors"
                aria-label="Live demo"
              >
                <Image src="/Icons/external-link.svg" alt="Live Demo" width={16} height={16} className="invert opacity-60 hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed line-clamp-2 max-w-xl">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-white/60 border border-white/20 px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Thumbnail — right side */}
      <div className="hidden sm:block shrink-0 w-28 md:w-40 h-20 md:h-28 relative overflow-hidden border border-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>

    </div>
  );
};

export default ProjectRow;
