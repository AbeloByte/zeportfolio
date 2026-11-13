import Link from "next/link";
import Image from "next/image";
import Logo from "../shared/Logo";
import Container from "./Container";
import { contactLinks } from "@/data/contact";

/* ────────────────────────────────────────────────
   Footer — the Contact sky carries on into it
   (solid skyDeep = the end of Contact's gradient),
   cream type and a handwritten sign-off.
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cream/20 bg-skyDeep text-cream">
      <Container className="relative">
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Link href="/" aria-label="Abel Adane — home" className="w-fit">
              <Logo size={48} />
            </Link>
            <p className="font-script text-2xl leading-snug text-cream -rotate-1">
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
                      className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/90 underline-offset-4 transition-colors hover:text-cream hover:underline"
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 transition-colors hover:border-cream hover:bg-cream/10"
                  >
                    <Image src={link.icon} alt="" width={16} height={16} className="invert" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/25 py-5 font-type text-xs text-cream/90 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Abel Adane</p>
          <p>built with Next.js, Tailwind CSS, and a tiny robot</p>
        </div>
      </Container>
    </footer>
  );
}
