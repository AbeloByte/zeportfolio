import { contactLinks } from "@/data/contact";
import ContactCard from "@/components/UI/ContactCard";
import Image from "next/image";
import Container from "../layout/Container";

export default function ContactSection() {
  return (
    <section className="bg-[#F5F5F5] overflow-x-clip" id="contact">
      <div className="md:p-12">
        <Container className="bg-white p-6 md:px-10 md:pt-10 md:pb-16">

          <p className="text-xl md:text-2xl font-mono mb-12 max-w-2xl selection:bg-[#DFFF00] selection:text-black">
            Abel is always open to conversations, feedback, and new opportunities.
          </p>

          {/* Contact cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactLinks.map((link) => (
              <ContactCard key={link.id} link={link} />
            ))}
          </div>

          {/* Robot — inline below cards on mobile, centered hanging on desktop */}
          {/* Mobile */}
          <div className="flex justify-center mt-8 md:hidden">
            <div className="relative w-40 h-36">
              <Image
                src="/images/robotContact.svg"
                alt="Robot Character"
                fill
                sizes="160px"
                className="object-contain hidden"
              />
            </div>
          </div>

        </Container>

        {/* Desktop robot — flush to footer, no bottom padding */}
        <div className="hidden md:flex justify-center relative -mt-20">
          <div className="relative w-[450px] h-96">
            <Image
              src="/images/robotContact.svg"
              alt="Robot Character"
              fill
              priority
              sizes="450px"
              className="object-contain object-bottom"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
