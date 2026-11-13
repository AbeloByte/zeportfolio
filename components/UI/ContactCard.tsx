"use client";

import { ContactLink } from "@/types";
import Image from "next/image";
import { robotHint } from "@/data/robotGuide";

/** One paper index card: icon, platform in small caps, handle in typewriter. */
export default function ContactCard({ link }: { link: ContactLink }) {
  const isEmail = link.platform === "Email";
  const name = link.platform === "Twitter" ? "X / Twitter" : link.platform;

  return (
    <a
      href={link.url}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      data-robot-say={robotHint.contact(link)}
      className="group flex items-center gap-4 p-5 text-dusk transition-colors hover:bg-[#EFE3C8]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dusk/20 bg-[#FBF6EA] transition-transform duration-300 group-hover:-rotate-12">
        <Image src={link.icon} alt="" width={18} height={18} />
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em]">{name}</span>
        <span className="truncate font-type text-[13px] text-dusk/80">{isEmail ? link.label : "say hello"}</span>
      </span>
      <span aria-hidden className="ml-auto text-dusk/60 transition-transform group-hover:translate-x-1 group-hover:text-dusk">
        →
      </span>
    </a>
  );
}
