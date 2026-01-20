import React from "react";
import  Container from "../layout/Container"
import Image from "next/image";

const About = () => {
  return <div className="bg-white py-16 md:py-0 md:h-170.25 flex flex-col justify-center items-center" id="about">
    <Container>
        <div className="flex flex-col gap-8 md:gap-16 lg:gap-32 items-center md:items-start md:flex-row relative w-full">
        {/* Image container - responsive sizing */}
        <div className="shrink-0">
            <Image
              src="/AboutImage.svg"
              alt="About Hebel"
              width={331}
              height={409}
              className="w-48 h-auto sm:w-64 md:w-72 lg:w-82.75"
            />
        </div>
        {/* Text content */}
        <div className="relative w-full ">
            <div className="w-full max-w-189.25 leading-[120%]">
                <h3 className="font-space-grotesk text-2xl md:text-4xl mb-4 md:mb-8 font-semibold ">About</h3>
                <p className="text-sm sm:text-base mb-6 md:mb-10  text-bgColor">
                  Hebel is a full-stack web developer who enjoys building websites and applications that are easy to use and easy to understand. He likes working on both the frontend and backend, and pays attention to how users interact with what he builds.
                </p>
                <p className="text-sm sm:text-base   text-bgColor">
                  He cares about writing clear, readable code and designing interfaces that feel simple and practical. Hebel enjoys communicating with people and believes good conversations lead to better results. His interest in technology started in childhood and grew naturally over time. He is currently learning and experimenting with UI/UX design to better understand users and improve the way his products work.
                </p>
            </div>
        </div>
        </div>
    </Container>
  </div>;
};

export default About;
