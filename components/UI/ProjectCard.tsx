import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";



const ProjectCard = ({ project }: { project: Project }) => {
    return <div className="px-2.5 py-5 w-95 h-full  bg-white  shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none flex flex-col gap-2.5  ">

        <Image src={project.image} alt={project.title} width={363} height={167}
          className="object-cover"/>
        <div className="grow gap-2.5 flex flex-col">
            <div className="flex justify-between items-center mb-2.5">
        <h3 className="text-xl font-space-grotesk">{project.title}</h3>
                  <div className="flex items-center gap-2">
  {/* GitHub Link */}
  <Link
    href={project.github}
    target="_blank"
    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-all duration-200"
  >
    <Image
      src="/icons/github.svg"
      alt="GitHub"
      width={20}
      height={20}
    />
  </Link>

  {/* Live Demo Link */}
  {project.demo && (
    <Link
      href={project.demo}
      target="_blank"
      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-all duration-200"
    >
      <Image
        src="/icons/external-link.svg"
        alt="Live Demo"
        width={20}
        height={20}
      />
    </Link>
  )}
                    </div>
            </div>
        <p className="text-sm text-[#333333]  line-clamp-3">
            {project.description}
        </p>
        </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span key={tag} className="text-sm bg-black text-white px-2.5 py-1">
            {tag}
          </span>
        ))}
      </div>
    </div>;
};

export default ProjectCard;
