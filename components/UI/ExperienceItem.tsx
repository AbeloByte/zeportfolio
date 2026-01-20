import { Experience } from "@/types";

export default function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    // Added selection colors to match your brand
    <div className="mb-12 border-b border-gray-200 pb-8 selection:bg-[#DFFF00] selection:text-black">

      {/* IMPROVEMENT: Responsive layout (stacks on mobile, spreads on desktop) */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 font-general-sans gap-1">

        {/* IMPROVEMENT: Smaller, grayer text for dates makes the Role stand out more */}
        <span className="text-gray-500 md:text-black font-medium text-sm md:text-base order-2 md:order-1">
          {exp.dateRange}
        </span>

        {/* IMPROVEMENT: Responsive text size */}
        <h3 className="text-lg md:text-xl font-semibold order-1 md:order-2">
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
            // Using your specific Lemon color #DFFF00
            className="bg-black text-white px-4 py-1 text-sm font-mono border-b-4 border-[#DFFF00] hover:translate-y-0.5 transition-transform"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
