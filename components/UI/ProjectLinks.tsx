import { Project } from "@/types";

const linkClass =
  "inline-flex items-center gap-1 border-b border-dusk/30 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-dusk/80 transition-colors hover:border-dusk hover:text-dusk";

/* Drawn arrow: the ↗ character renders as a blue emoji on Windows. */
const Arrow = () => (
  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** "Code / Live" small-caps links under a project. */
export default function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-1 flex items-center gap-5">
      <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${project.title} source code on GitHub`}>
        Code <Arrow />
      </a>
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${project.title} live demo`}>
          Live <Arrow />
        </a>
      )}
    </div>
  );
}
