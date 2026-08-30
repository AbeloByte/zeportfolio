// src/components/ContactCard.tsx
"use client";

import { ContactLink } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactCard({ link }: { link: ContactLink }) {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      whileHover={{ y: -6 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative flex flex-col items-center justify-center bg-black text-white p-6 md:p-8 h-28 md:h-32 w-full group shadow-[0px_4px_0px_0px_#DFFF00] hover:shadow-[0px_10px_0px_0px_#DFFF00] transition-shadow"
    >
      {/* Icon: Slightly smaller on mobile to save space */}
      <motion.div
        whileHover={{ rotate: 12 }}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-9 h-9 md:w-10 md:h-10 bg-white border-2 border-b-primaryColor rounded-full flex items-center justify-center"
      >
        <Image src={link.icon} alt={link.platform} width={18} height={18} />
      </motion.div>

      {/* Label: Uses 'break-all' so long emails don't break the layout on small screens */}
      <span className="text-[10px] md:text-xs font-bold font-mono text-center break-all px-2">
        {link.label}
      </span>
    </motion.a>
  );
}
