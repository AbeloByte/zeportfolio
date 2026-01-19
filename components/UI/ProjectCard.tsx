import { Project } from "@/types";
import Image from "next/image";



const ProjectCard = ({ project }: { project: Project }) => {
    return <div className="px-2.5 py-5 w-95 h-full  bg-white  shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none flex flex-col gap-2.5  ">

        <Image src={project.image} alt={project.title} width={363} height={167}
          className="object-cover"/>
        <div className="grow gap-2.5 flex flex-col">
        <h3 className="text-xl font-space-grotesk">{project.title}</h3>
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
