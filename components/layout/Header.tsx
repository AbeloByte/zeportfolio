import React from "react";
import Link from 'next/link';
import Logo from '../../public/Logo.svg';
import Image from "next/image";
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
  return (
  <header  className="font-space-grotesk">
   <div className="flex justify-between items-center p-4">
    <div><Image src={Logo} alt="Logo" /></div>
    <nav className="md:max-w-2xl">
        <ul className="flex justify-between p-4">
            {navItems.map((item) => (
              <li key={item.href} className="mx-6">
                <Link href={item.href} className="text-lg font-medium  ">
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
    </nav>
  <div>LOGO</div>
   </div>
  </header>);
};

export default Header;
