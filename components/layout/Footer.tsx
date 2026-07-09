import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import Container from "./Container";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "http://github.com/AbeloByte", icon: "/Icons/github.svg" },
  { label: "LinkedIn", href: "http://linkedin.com/in/abel-adane-268938350/", icon: "/Icons/linkedin.svg" },
  { label: "X / Twitter", href: "https://x.com/Hebel07", icon: "/Icons/x.svg" },
  { label: "Email", href: "mailto:defaultpath19@gmail.com", icon: "/Icons/gmail.svg" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white font-space-grotesk">
      <Container>
        <div className="py-12 flex flex-col md:flex-row gap-10 justify-between items-start -mt-12">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/">
              <Image src={Logo} alt="Abel Adane Logo" width={120} height={34} className="h-8 w-auto" />
            </Link>
            <p className="text-bodyTextColor text-sm leading-relaxed">
              Full Stack Web Developer & Junior UI/UX Designer building clean, user-centered digital experiences.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-bodyTextColor text-sm hover:text-primaryColor transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">Connect</p>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-bodyTextColor text-sm hover:text-primaryColor transition-colors"
              >
                <Image src={link.icon} alt={link.label} width={16} height={16} className="w-4 h-4 invert opacity-60" />
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-white/40">
          <p>© {year} Abel Adane. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  );
}
