import React from "react";
import Container from "../layout/Container";
import Image from "next/image";

const About = () => {
  return (
    <div className="bg-white py-16 md:py-0 md:h-170.25 flex flex-col justify-center items-center" id="about">
      <Container>
        <div className="flex flex-col gap-10 md:gap-16 lg:gap-24 items-center md:items-start md:flex-row relative w-full">

          <div className="shrink-0">
            <Image
              src="/images/personal_image.png"
              alt="Abel Adane"
              width={331}
              height={409}
              className="w-64 h-auto sm:w-72 md:w-80 lg:w-96 xl:w-[380px]"
            />
          </div>

          <div className="flex flex-col justify-center gap-6 w-full">
            <h3 className="font-space-grotesk text-2xl md:text-4xl font-semibold text-bgColor">About</h3>
            <p className="text-sm sm:text-base text-bgColor leading-relaxed">
              I&apos;m a full-stack web developer who enjoys building websites and applications that are easy to use and easy to understand. I work on both the frontend and backend, and I always pay close attention to how users interact with what I build.
            </p>
            <p className="text-sm sm:text-base text-bgColor leading-relaxed">
              I care about writing clear, readable code and designing interfaces that feel simple and practical. I enjoy communicating with people and believe good conversations lead to better results. My interest in technology started in childhood and has grown ever since. I&apos;m currently learning and experimenting with UI/UX design to better understand users and improve the products I build.
            </p>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default About;
