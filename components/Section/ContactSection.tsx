import Image from "next/image";
import { contactLinks } from "@/data/contact";
import ContactCard from "@/components/UI/ContactCard";
import Container from "../layout/Container";
import { Reveal, Stagger, StaggerItem } from "../motion";
import RobotStop from "../shared/RobotStop";
import { Grain } from "../shared/Storybook";
import contactRobot from "@/public/images/contact-robot.png";

/* ────────────────────────────────────────────────
   Contact — storybook vibe, back under the sky.
   Bookends the hero: cream headline on blue, the
   robot sending paper airplanes, contact links as
   paper index cards.
   ──────────────────────────────────────────────── */

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-sky py-20 md:py-28"
      style={{ backgroundImage: "linear-gradient(180deg, #6CA6C6 0%, #4A8DB5 45%, #2F6F98 100%)" }}
    >
      <Grain tone="sky" opacity={0.4} />

      <Container className="relative">
        <div className="hidden md:flex justify-start mb-6">
          <RobotStop id="contact" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* ── Words + cards ── */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="font-script text-2xl text-dusk/85 -rotate-1">the end of the tour, the start of something?</p>
              <h2
                className="mt-1 font-display font-semibold lowercase leading-[0.86] text-cream"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6.75rem)" }}
              >
                let&apos;s make
                <br />
                something.
              </h2>
              <p className="mt-6 max-w-lg font-general-sans text-base leading-relaxed text-dusk sm:text-lg">
                I&apos;m always open to conversations, feedback and new opportunities. My inbox is the fastest way to reach me.
              </p>
            </Reveal>

            {/* 1px gaps over the line colour draw the dividers between cards */}
            <Stagger
              stagger={0.08}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-creamLine bg-creamLine sm:grid-cols-2"
            >
              {contactLinks.map((link) => (
                <StaggerItem key={link.id} className="bg-cream">
                  <ContactCard link={link} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* ── The robot sending paper airplanes ── */}
          <Reveal direction="left" distance={40} className="relative mx-auto w-full max-w-[460px]">
            <Image
              src={contactRobot}
              alt="Abel's tiny robot happily throwing paper airplanes from a grassy hill"
              sizes="(min-width: 1024px) 460px, 80vw"
              className="h-auto w-full select-none"
            />
            <p aria-hidden className="absolute -bottom-2 left-4 font-script text-xl text-dusk/85 -rotate-3">
              your message, on its way
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
