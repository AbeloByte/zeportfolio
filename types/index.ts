
export type TechStack = "Next.js" | "TypeScript" | "Tailwind" | "React" | "Node.js / Express" | "MongoDB" | "JavaScript" | "HTML" | "CSS" | "Git" | "GitHub" | "Figma" | "Convex";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: TechStack[];  // An array of our allowed skills
  github: string;
  demo?: string;      // Optional: not every project has a live link yet
}

export interface Experience {
  id: number;
  dateRange: string;
  role: string;
  company: string;
  location: string;
  workType: "Remote" | "On-site" | "Hybrid";
  description: string;
  technologies: string[];
}

export interface Blog {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  slug: string;
  content?: string;  // Raw MDX content for rendering
}

export interface ContactLink {
  id: number;
  platform: string;
  label: string;
  url: string;
  icon: string;
}
