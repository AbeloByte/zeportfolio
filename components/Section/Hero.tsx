"use client";

import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import FriendRobot from "../shared/FriendRobot";
import Image from "next/image";
import Container from "../layout/Container";

const titles = ["Full Stack Web Developer", "Junior UI/UX Designer", "Frontend Engineer"];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
      {/* items-center so both halves share the same vertical midpoint */}
      <div className="flex flex-row items-center h-screen gap-12">

        {/* Left: full width on mobile, half on desktop */}
        <div className="flex flex-col gap-8 justify-center w-full md:w-1/2">
          <div className="flex flex-col gap-5">
            <h1 className="font-general-sans text-3xl sm:text-4xl lg:text-4xl text-white leading-snug">
              Hi, I&apos;m Abel
            </h1>

            {/* Animated title */}
            <div className="min-h-[2.5rem] sm:min-h-[3rem] flex items-center">
              <span className="text-primaryColor font-general-sans text-xl sm:text-2xl lg:text-3xl font-semibold">
                {displayed}
                <span className="inline-block w-0.5 h-6 sm:h-7 bg-primaryColor ml-0.5 align-middle animate-pulse" />
              </span>
            </div>

            <p className="text-bodyTextColor text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-md">
              I design and build user centered web experiences that balance clean interfaces with reliable engineering.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              label="View My Projects"
              size="lg"
              onClick={() => { window.location.href = '#projects'; }}
            />
            <a
              href="/cv/Abel_Adane_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 text-textColor text-base font-space-grotesk hover:border-primaryColor hover:text-primaryColor transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Right: hidden on mobile, half on desktop */}
        <div className="hidden md:flex w-1/2 items-center justify-center h-full relative pt-8">
          {/* FriendRobot — top right */}
          <div className="absolute top-8 right-0">
            <FriendRobot
              imageUrl="/robotimages/hey.svg"
              messageName="Hey there! Welcome  I'm Abel's tiny Robot"
              size="md"
              className="bg-white border-white"
            />
          </div>

          {/* Hero image — centered in its half */}
          <Image
            src="/images/personal_image.png"
            alt="Abel"
            width={572}
            height={510}
            className="w-full max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain"
            priority
          />
        </div>

      </div>
    </Container>
  );
};

export default Hero;
