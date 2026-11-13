import type { ContactLink, Project } from "@/types";

/* ────────────────────────────────────────────────
   Script for the tiny tour-guide robot.
   Edit the lines here — the component just reads
   them. Keep each line short: it's a speech bubble.
   ──────────────────────────────────────────────── */

export type Pose = "wave" | "point" | "think";

export interface GuideAction {
  label: string;
  href: string;
}

export interface GuideStop {
  /** Shown in the bubble header, e.g. "Tiny Robot · About". */
  label: string;
  /** Background of the section — the card takes the opposite colour. */
  surface: "dark" | "light";
  pose: Pose;
  /** Clicking the robot steps through these. */
  lines: string[];
  /** Said when the visitor has been still for a while. */
  idle: string;
  actions: GuideAction[];
}

/** Keys must match the section `id`s on the page. */
export const guideScript = {
  home: {
    label: "Hello",
    surface: "light",
    pose: "wave",
    lines: [
      "Hey there! Welcome. I'm Abel's tiny robot.",
      "Scroll down and I'll fly ahead and show you around.",
      "Build things. Break things. Learn always.",
    ],
    idle: "Psst, scroll down. I'll lead the way!",
    actions: [{ label: "Start the tour ↓", href: "#about" }],
  },
  about: {
    label: "About",
    surface: "light",
    pose: "think",
    lines: [
      "This is Abel. He builds both the front and the back of things.",
      "He got hooked on tech as a kid and never really stopped.",
      "Hiring? His CV is one click away, right there.",
    ],
    idle: "Still reading? Take your time. Click me when you want the next stop.",
    actions: [{ label: "His work →", href: "#projects" }],
  },
  projects: {
    surface: "light",
    label: "Projects",
    pose: "point",
    lines: [
      "Here's the good stuff: real things Abel built and shipped.",
      "Hover any project and I'll tell you what's under the hood.",
      "Prefer cards? The toggle in the top-right switches to grid view.",
    ],
    idle: "Pick one that looks fun. The GitHub icon opens the code.",
    actions: [
      { label: "Experience →", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
  },
  experience: {
    surface: "light",
    label: "Experience",
    pose: "think",
    lines: [
      "Where Abel has worked, newest at the top.",
      "The tags under each role are the tools he used every day.",
    ],
    idle: "That's his journey so far. Want to be the next chapter?",
    actions: [{ label: "Say hi →", href: "#contact" }],
  },
  blogs: {
    surface: "light",
    label: "Blogs",
    pose: "point",
    lines: [
      "Abel writes about what he learns while building.",
      "Short reads. Good for a coffee break.",
    ],
    idle: "Any title catch your eye?",
    actions: [{ label: "Contact", href: "#contact" }],
  },
  contact: {
    surface: "light",
    label: "Contact",
    pose: "wave",
    lines: [
      "That's the tour! Abel reads every message, so say hi.",
      "Email is fastest. GitHub if you'd rather see the code first.",
    ],
    idle: "Thanks for visiting! I'll be right here.",
    actions: [{ label: "Back to top ↑", href: "#" }],
  },
} satisfies Record<string, GuideStop>;

export type SectionId = keyof typeof guideScript;

/* ── Hover hints: put on any element as data-robot-say ── */

export const robotHint = {
  project: (p: Project) =>
    `${p.title}! Built with ${p.tags.slice(0, 3).join(", ")}.${p.demo ? " There's a live demo too." : ""}`,

  contact: (link: ContactLink) =>
    ({
      Email: "Email goes straight to Abel's inbox. Fastest reply.",
      Github: "All his source code lives here.",
      Linkedin: "The professional side of Abel.",
      Twitter: "Where he shares small wins and work in progress.",
    })[link.platform] ?? `Find Abel on ${link.platform}.`,

  cv: "Hiring? This is Abel on one page.",
};
