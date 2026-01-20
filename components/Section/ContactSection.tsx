import { contactLinks } from "@/data/contact";
import ContactCard from "@/components/UI/ContactCard";
import Image from "next/image";
import Container from "../layout/Container";

export default function ContactSection() {
  return (
    // 'overflow-hidden' or 'overflow-clip' prevents the robot from creating
    // a horizontal scrollbar on mobile if it hangs off the edge.
    <section className="bg-[#F5F5F5]  flex flex-col  overflow-x-clip" id="contact">

      {/* Container: Added 'mb-40' to give the robot space so it doesn't overlap the next section */}

      <div className="relative border  md:p-12 ">
    <Container className="bg-white border-primaryColor p-6 mb-40">
        <p className="text-xl md:text-2xl font-mono mb-12 max-w-2xl selection:bg-[#DFFF00] selection:text-black">
          He&#39;s always open to conversations, feedback, and new opportunities.
        </p>
        {/* The Grid of Cards */}
            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-20">
                {contactLinks.map((link) => (
                   <ContactCard key={link.id} link={link} />
                ))}
            </div>
        {/* IMPROVED Robot Wrapper */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2
          /* Mobile size: 280px wide roughly matches the 1.08 aspect ratio */
          w-70 h-65
          /* Desktop size: Using   399px (99.75 * 4) and 370px (92.5 * 4) */
          md:w-99.75 md:h-92.5 z-0">
           <Image
             src="/images/robotContact.svg"
             alt="Robot Character"
             fill
             priority // Ensures the robot loads instantly
             sizes="(max-width: 768px) 280px, 399px"
           />
        </div>
      </Container>
      </div>
    </section>
  );
}
