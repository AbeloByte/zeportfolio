
'use client';

import React, { useState } from "react";
import Link from 'next/link';
import Logo from '../../public/Logo.svg';
import Image from "next/image";
import Button from "../UI/Button";
//  types for navigation items

interface NavItem {
  label: string;
  href: string;
}




const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
  <header className="mx-auto font-space-grotesk bg-bgColor text-textColor sticky top-0 z-40 mt-5">
   <div className="flex items-center justify-evenly px-4 py-4 md:px-6 gap-4 md:gap-8">

    <Link href="/" className="flex items-center gap-3">
      <Image src={Logo} alt="Logo" width={128} height={36} priority className="h-9 w-auto" />
    </Link>
<div className="md:hidden">
    <button
      type="button"
      onClick={toggleMenu}
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
  className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 text-textColor transition hover:border-white/30 hover:bg-white/10"
    >
      <span className="sr-only">Toggle navigation</span>
      <span className={`block h-0.5 w-6 rounded-full bg-textColor transition-transform duration-300 ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
      <span className={`block h-0.5 w-6 rounded-full bg-textColor transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`block h-0.5 w-6 rounded-full bg-textColor transition-transform duration-300 ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
    </button>

</div>


{/* on large screen  */}
    <nav className="hidden md:flex  justify-center">
      <ul className="flex items-center gap-6">
            {navItems.map((item) => (
          <li key={item.href}>
                <Link href={item.href} className="text-base font-medium hover:text-hoverText px-2 py-1 rounded transition-colors duration-300">
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
    </nav>


    <Button label="Let's Talk" size="md" className="hidden md:inline-flex" onClick={() => { window.location.href = '/contact'; }} />

   </div>

{/* on small screen  */}
   <nav
     className={`md:hidden overflow-hidden flex gap-6 transition-[max-height] duration-300 ${isOpen ? 'max-h-64' : 'max-h-0'}`}
     aria-hidden={!isOpen}
   >
      <ul className="space-y-2 px-4 pb-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-lg font-medium hover:text-hoverText transition-colors duration-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
   </nav>



  </header>);
};

export default Header;
