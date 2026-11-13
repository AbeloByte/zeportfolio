'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Logo from "../shared/Logo";
import Container from "./Container";
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";

/* ────────────────────────────────────────────────
   Header — storybook nav.
   Logo on the left, small letter-spaced capitals on the
   right. Transparent over the sky; a cream paper bar
   once you scroll. The active link gets a hand-drawn
   underline that slides between items.
   Height stays 84px at the top: the hero tucks under it
   with -mt-[84px].
   ──────────────────────────────────────────────── */

interface NavItem {
  label: string;
  href: string;
  id: string;
}

// Blogs is hidden for now — add { label: 'Blogs', href: '/blogs', id: 'blogs' } back to show it.
const navItems: NavItem[] = [
  { label: 'About',      href: '#about',      id: 'about'      },
  { label: 'Projects',   href: '#projects',   id: 'projects'   },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact',    href: '#contact',    id: 'contact'    },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hand-drawn underline under the active link. */
function Squiggle() {
  return (
    <motion.svg
      layoutId="nav-squiggle"
      viewBox="0 0 60 8"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-2 left-0 h-2 w-full text-dusk"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      aria-hidden
    >
      <path d="M1 5.5 C 10 2, 18 7, 28 4.2 S 47 2.2, 59 4.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </motion.svg>
  );
}

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  return (
    <li>
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={active ? 'true' : undefined}
        className={`relative inline-block py-1 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
          active ? 'text-dusk' : 'text-dusk/70 hover:text-dusk'
        }`}
      >
        {item.label}
        {active && <Squiggle />}
      </Link>
    </li>
  );
}

const Header = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Marks the section whose middle crosses the middle of the screen.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(id)),
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    // Back at the top (hero) → nothing active.
    const home = document.getElementById('home');
    if (home) {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActiveId('')),
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      obs.observe(home);
      observers.push(obs);
    }
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={reduced ? { opacity: 0 } : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`sticky top-0 z-40 text-dusk transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || isOpen
          ? 'bg-cream/90 backdrop-blur-md border-b border-creamLine'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container>
        {/* padding, not margin: a child's margin would collapse out of the header */}
        <div className={`transition-[padding] duration-500 ease-out-expo ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="flex h-11 items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" aria-label="Abel Adane — home" className="shrink-0">
            <motion.div
              whileHover={reduced ? undefined : { rotate: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <Logo size={scrolled ? 38 : 42} className="transition-[width,height] duration-500 ease-out-expo" />
            </motion.div>
          </Link>

          {/* Links + talk */}
          <div className="flex items-center justify-end gap-8 lg:gap-10">
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-8 lg:gap-10">
                {navItems.map((item) => (
                  <NavLink key={item.id} item={item} active={activeId === item.id} />
                ))}
              </ul>
            </nav>

            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-dusk/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-dusk transition-colors hover:border-dusk hover:bg-dusk hover:text-cream"
            >
              Let&apos;s talk
              <span aria-hidden>→</span>
            </a>

            {/* Menu button — phones */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-dusk"
            >
              {isOpen ? 'Close' : 'Menu'}
              <span className="relative flex h-3 w-5 flex-col justify-between" aria-hidden>
                <span className={`block h-px w-full bg-dusk transition-transform duration-300 ${isOpen ? 'translate-y-[5.5px] rotate-45' : ''}`} />
                <span className={`block h-px w-full bg-dusk transition-transform duration-300 ${isOpen ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
        </div>
      </Container>

      {/* Mobile menu — a cream sheet with big storybook links */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            aria-label="Mobile"
            className="md:hidden overflow-hidden border-t border-creamLine bg-cream"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Container>
              <motion.ul
                className="flex flex-col py-6"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                    className="border-b border-creamLine last:border-b-0"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-baseline justify-between py-3 font-display text-4xl font-semibold lowercase text-dusk"
                    >
                      {item.label}
                      {activeId === item.id && <span className="font-script text-lg text-dusk/70">you are here</span>}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <p className="pb-6 font-script text-xl text-dusk/70 -rotate-1">say hi any time, I read every message.</p>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Reading progress — a thin ochre thread */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-ochre transition-opacity duration-500"
      />
    </motion.header>
  );
};

export default Header;
