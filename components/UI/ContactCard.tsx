// src/components/ContactCard.tsx
import { ContactLink } from "@/types";
import Image from "next/image";

export default function ContactCard({ link }: { link: ContactLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      className="relative flex flex-col items-center justify-center bg-black text-white p-6 md:p-8 h-28 md:h-32 w-full group transition-all shadow-[0px_4px_0px_0px_#DFFF00]"
    >
      {/* Icon: Slightly smaller on mobile to save space */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-9 h-9 md:w-10 md:h-10 bg-white border-2 border-b-primaryColor rounded-full flex items-center justify-center">
        <Image src={link.icon} alt={link.platform} width={18} height={18} />
      </div>

      {/* Label: Uses 'break-all' so long emails don't break the layout on small screens */}
      <span className="text-[10px] md:text-xs font-bold font-mono text-center break-all px-2">
        {link.label}
      </span>
    </a>
  );
}
