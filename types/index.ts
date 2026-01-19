// Define a Union Type for your skills to prevent typos
export type TechStack = "Next.js" | "TypeScript" | "Tailwind" | "React" | "Node.js";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;      // Path to image in your /public folder
  tags: TechStack[];  // An array of our allowed skills
  github: string;
  demo?: string;      // Optional: not every project has a live link yet
}
