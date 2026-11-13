import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo-story-light.svg";
import Container from "./Container";
import { contactLinks } from "@/data/contact";
import { Grain } from "../shared/Storybook";

/* ────────────────────────────────────────────────
   Footer — dusk. The contact sky fades into night,
   a few stars come out; cream type and a handwritten
   sign-off.
   Social links come from data/contact.ts, so they
   always match the contact section.
   ──────────────────────────────────────────────── */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  // { label: "Blogs", href: "/blogs" },  — hidden for now
  { label: "Contact", href: "#contact" },
];

// Fixed star positions (percent of the footer) so server and client render the same.
const STARS = [
  { x: 6, y: 18, s: 2, d: 0 }, { x: 14, y: 42, s: 1.5, d: 1.2 }, { x: 23, y: 12, s: 1.5, d: 2.1 },
  { x: 31, y: 30, s: 2.5, d: 0.6 }, { x: 44, y: 16, s: 1.5, d: 1.8 }, { x: 52, y: 38, s: 2, d: 0.3 },
  { x: 61, y: 10, s: 1.5, d: 2.6 }, { x: 69, y: 26, s: 2, d: 1.4 }, { x: 78, y: 14, s: 1.5, d: 0.9 },
  { x: 86, y: 34, s: 2.5, d: 2.2 }, { x: 93, y: 20, s: 1.5, d: 0.4 }, { x: 38, y: 48, s: 1.5, d: 1.6 },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden text-cream"
      // picks up exactly where the contact sky ends (#3C7FAA) and settles into night
      style={{ backgroundImage: "linear-gradient(180deg, #3C7FAA 0%, #23507A 22%, #183A5A 50%, #13283A 100%)" }}
    >
      <Grain tone="sky" opacity={0.45} />

      {/* stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STARS.map((st, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-cream"
            style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }}
          />
        ))}
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-10 pb-14 pt-24 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Link href="/" aria-label="Abel Adane — home" className="w-fit">
              <Image src={Logo} alt="Abel Adane" className="h-8 w-auto" />
            </Link>
            <p className="font-script text-2xl leading-snug text-cream/85 -rotate-1">
              thanks for stopping by. the robot says bye too.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/75 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex items-center gap-2">
              {contactLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target={link.platform === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-cream hover:bg-cream/10"
                  >
                    <Image src={link.icon} alt="" width={16} height={16} className="invert opacity-80" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/15 py-5 font-type text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Abel Adane</p>
          <p>built with Next.js, Tailwind CSS, and a tiny robot</p>
        </div>
      </Container>
    </footer>
  );
}
