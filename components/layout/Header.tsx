'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Logo from '../../public/Logo.svg';
import Image from "next/image";
import Button from "../UI/Button";
import Container from "./Container";

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
    <header
      className={`font-space-grotesk text-textColor sticky top-0 z-40 mt-5 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-black/80 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]' : 'bg-black/50'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4 gap-4 md:gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src={Logo} alt="Logo" width={128} height={36} priority className="h-9 w-auto" />
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
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-300 group flex flex-col items-center gap-0.5
                        ${isActive ? 'text-primaryColor' : 'text-white/70 hover:text-white'}`}
                    >
                      {item.label}
                      {/* Active underline bar */}
                      <span
                        className={`block h-0.5 bg-primaryColor transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Button
            label="Let's Talk"
            size="md"
            className="hidden md:inline-flex"
            onClick={() => { window.location.href = '#contact'; }}
          />
        </div>

        {/* Mobile nav */}
        <nav
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${isOpen ? 'max-h-72' : 'max-h-0'}`}
          aria-hidden={!isOpen}
        >
          <ul className="flex flex-col gap-1 px-2 pb-4">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.href}>
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
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
