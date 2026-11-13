import React from "react";
import Container from "../layout/Container";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem, StaggerTag } from "../motion";
import { robotHint } from "@/data/robotGuide";
import RobotStop from "../shared/RobotStop";

const stats = [
  { value: "4+", label: "Years in Tech" },
  { value: "10+", label: "Projects Built" },
  { value: "∞", label: "Coffee Consumed" },
];

const roles = ["Software Developer","Full-Stack Developer", "UI/UX Designer"];

const About = () => {
  return (
    <div className="relative bg-white py-16 overflow-hidden" id="about">
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
      <Container>
        <div className="relative z-10 hidden md:flex justify-end mb-6">
          <RobotStop id="about" />
        </div>
        <div className="relative z-10 flex flex-col gap-10 md:gap-16 lg:gap-20 items-center md:items-start md:flex-row w-full">

          {/* ── Image column ── */}
          <Reveal direction="right" distance={40} className="shrink-0 flex flex-col items-center gap-8">
            <Image
              src="/images/personal_image.png"
              alt="Abel Adane"
              width={331}
              height={409}
              className="w-64 h-auto sm:w-72 md:w-80 lg:w-[320px]"
            />

            {/* Stats — same tag style as the rest of the site */}
            <Stagger stagger={0.1} delay={0.2} className="flex gap-3">
              {stats.map((s) => (
                <StaggerItem
                  key={s.label}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center gap-1 border-b-4 border-primaryColor px-4 py-3 bg-bgColor text-white"
                >
                  <span className="text-lg font-bold font-space-grotesk leading-none">{s.value}</span>
                  <span className="text-[10px] font-mono text-bodyTextColor text-center leading-tight">{s.label}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          {/* ── Text column ── */}
          <Stagger stagger={0.1} className="flex flex-col gap-6 w-full max-w-[620px]">

            {/* Heading — matches other sections */}
            <StaggerItem>
              <h2 className="text-2xl md:text-4xl font-bold font-space-grotesk text-bgColor">
                About
              </h2>
            </StaggerItem>

            {/* Role tags — same style as ExperienceItem tech tags */}
            <Stagger stagger={0.07} className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <StaggerTag
                  key={role}
                  whileHover={{ y: -3 }}
                  className="bg-black text-white px-4 py-1 text-sm font-mono border-b-4 border-[#DFFF00]"
                >
                  {role}
                </StaggerTag>
              ))}
            </Stagger>

            {/* Lead */}
            <StaggerItem>
              <p className="text-base font-medium text-bgColor leading-relaxed">
                Building products that combine clean engineering with thoughtful design.
              </p>
            </StaggerItem>

            {/* Body */}
            <StaggerItem><p className="text-sm sm:text-base text-experiencebodyText leading-[1.8]">
              I&apos;m Software Developer with a focus on full-stack development, who enjoys turning ideas into intuitive digital experiences. My work combines thoughtful interface design with scalable backend architecture, letting me build products that are both visually appealing and technically reliable.
            </p></StaggerItem>
            <StaggerItem><p className="text-sm sm:text-base text-experiencebodyText leading-[1.8]">
              Beyond writing clean, maintainable code, I&apos;m passionate about understanding users and solving real-world problems. Recently I&apos;ve been expanding my skills in UI/UX design to create products that not only work well but also feel effortless to use.
            </p></StaggerItem>

            {/* CTAs — same shadow style as Button component */}
            <StaggerItem className="flex flex-wrap gap-4 pt-2">
              <a
                href="YOUR_GOOGLE_DRIVE_LINK_HERE"
                data-robot-say={robotHint.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-bgColor text-white text-sm font-space-grotesk font-medium shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-bgColor text-bgColor text-sm font-space-grotesk font-medium hover:bg-bgColor hover:text-white transition-colors"
              >
                Contact Me
              </a>
            </StaggerItem>

          </Stagger>

        </div>
      </Container>
    </div>
  );
};

export default About;
