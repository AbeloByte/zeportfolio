import { Experience } from "@/types";

export default function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <div className="mb-12 border-b border-gray-200 pb-8 selection:bg-[#DFFF00] selection:text-black">
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 font-general-sans gap-1">
        <span className="text-gray-500 font-medium text-sm md:text-base order-2 md:order-1">
          {exp.dateRange}
        </span>
        <h3 className="text-lg md:text-xl font-semibold order-1 md:order-2 text-bgColor">
          {exp.role}
        </h3>
      </div>

      <p className="leading-relaxed mb-6 text-experiencebodyText text-base">
        {exp.description}
      </p>

      <div className="flex flex-wrap gap-3">
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="bg-black text-white px-4 py-1 text-sm font-mono border-b-4 border-[#DFFF00] hover:translate-y-0.5 transition-transform"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
