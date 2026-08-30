'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Logo from '../../public/Logo.svg';
import Image from "next/image";
import Button from "../UI/Button";
import Container from "./Container";
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'About',      href: '#about',      id: 'about'      },
  { label: 'Projects',   href: '#projects',   id: 'projects'   },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Blogs',      href: '#blogs',      id: 'blogs'      },
  { label: 'Contact',    href: '#contact',    id: 'contact'    },
];

const Header = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [activeId, setActiveId]   = useState<string>('');
  const [scrolled, setScrolled]   = useState(false);

  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // Track scroll depth for header background intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver — marks the section most visible in the viewport
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    const callback = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(id);
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(callback(id), {
        rootMargin: '-40% 0px -55% 0px', // fires when section centre crosses viewport centre
        threshold: 0,
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu  = () => setIsOpen(false);

  return (
    <motion.header
      initial={reduced ? { opacity: 0 } : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`font-space-grotesk text-textColor sticky top-0 z-40 glass transition-colors duration-500 ${
        scrolled
          ? 'bg-black/70 border-b border-hairline'
          : 'bg-black/20 border-b border-transparent'
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between gap-4 md:gap-10 transition-[padding] duration-500 ease-out-expo ${
            scrolled ? 'py-3' : 'py-5'
          }`}
        >

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <Image
                src={Logo}
                alt="Logo"
                width={148}
                height={42}
                priority
                className={`w-auto transition-[height] duration-500 ease-out-expo ${
                  scrolled ? 'h-9' : 'h-11'
                }`}
              />
            </motion.div>
          </Link>

          {/* Hamburger — mobile only */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 text-textColor transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className={`block h-0.5 w-6 rounded-full bg-textColor transition-transform duration-300 ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 rounded-full bg-textColor transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-6 rounded-full bg-textColor transition-transform duration-300 ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex justify-center">
            <motion.ul
              className="flex items-center gap-1 rounded-md border border-hairline bg-white/3 p-1"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
            >
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: reduced ? { opacity: 0 } : { opacity: 0, y: -12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative block rounded px-4 py-1.5 text-sm font-medium transition-colors duration-300
                        ${isActive ? 'text-bgColor' : 'text-white/60 hover:text-white'}`}
                    >
                      {/* Shared-layout pill — slides between items */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded bg-primaryColor"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          <motion.div
            className="hidden md:block"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            <Button
              label="Let's Talk"
              size="md"
              onClick={() => { window.location.href = '#contact'; }}
            />
          </motion.div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.nav
              key="mobile-nav"
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.ul
                className="flex flex-col gap-1 px-2 pb-4"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              >
                {navItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <motion.li
                      key={item.href}
                      variants={{
                        hidden: reduced ? { opacity: 0 } : { opacity: 0, x: -16 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 px-3 py-2.5 text-base font-medium transition-colors duration-300
                          ${isActive
                            ? 'text-primaryColor border-l-2 border-primaryColor pl-4'
                            : 'text-white/70 hover:text-white border-l-2 border-transparent pl-4'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>

      {/* Scroll progress rail */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-primaryColor shadow-[0_0_12px_0_rgba(223,255,0,0.7)]"
      />
    </motion.header>
  );
};

export default Header;
