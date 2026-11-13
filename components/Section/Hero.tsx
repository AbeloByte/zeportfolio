"use client";

import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import RobotStop from "../shared/RobotStop";
import Image from "next/image";
import Container from "../layout/Container";
import { Stagger, StaggerItem } from "../motion";
import { motion, useReducedMotion } from "framer-motion";

const titles = ["Full Stack Web Developer", "Junior UI/UX Designer", "Software Developer"];


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const reduced = useReducedMotion();

  // Typewriter effect
  useEffect(() => {
    const current = titles[currentIndex];

    if (isPaused) {
      const pause = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pause);
    }

    if (!isDeleting) {
      if (displayed.length < current.length) {
        const timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsPaused(true);
        }, 0);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % titles.length);
      }
    }
  }, [displayed, isDeleting, isPaused, currentIndex]);


  return (
    <Container>
      <div id="home" className="flex flex-row items-center h-screen gap-12">

        {/* Left: full width on mobile, half on desktop */}
        <Stagger immediate stagger={0.12} delay={0.15} className="flex flex-col gap-8 justify-center w-full md:w-1/2">
          <div className="flex flex-col gap-5">
            <StaggerItem><h1 className="font-general-sans text-3xl sm:text-4xl lg:text-4xl text-white leading-snug">
              Hi, I&apos;m Abel Adane
            </h1></StaggerItem>

            {/* Animated title */}
            <StaggerItem className="min-h-[2.5rem] sm:min-h-[3rem] flex items-center">
              <span className="text-primaryColor font-general-sans text-xl sm:text-2xl lg:text-3xl font-semibold">
                {displayed}
                <motion.span
                  aria-hidden
                  className="inline-block w-0.5 h-6 sm:h-7 bg-primaryColor ml-0.5 align-middle"
                  animate={reduced ? {} : { opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                />
              </span>
            </StaggerItem>

            <StaggerItem><p className="text-bodyTextColor text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-md">
              I design and build user centered web experiences that balance clean interfaces with reliable engineering.
            </p></StaggerItem>
          </div>

          <StaggerItem className="flex items-center gap-4">
            <Button
              label="View My Projects"
              size="lg"
              onClick={() => { window.location.href = '#projects'; }}
            />
            <a
              href="https://drive.google.com/file/d/1X_q8e8kGmlyqDlZULYyJ8a5bZIotcmRj/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 text-textColor text-base font-space-grotesk hover:border-primaryColor hover:text-primaryColor transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </StaggerItem>
        </Stagger>

        {/* Right: hidden on mobile, half on desktop */}
        <div className="hidden md:flex w-1/2 items-center justify-center h-full relative pt-8">
          {/* The tour robot starts here (rendered by <RobotGuide />) */}
          <RobotStop id="home" className="absolute top-8 right-0 z-10" />

          {/* Hero image */}
          <motion.div
            className="w-full flex justify-center"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
          <Image
            src="/images/personal_image.png"
            alt="Abel"
            width={572}
            height={510}
            className="w-full max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain"
            priority
          />
          </motion.div>
        </div>

      </div>
    </Container>
  );
};

export default Hero;
