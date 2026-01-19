import React from "react";
import  Container from "../layout/Container"
import Image from "next/image";
import FriendRobot from "../shared/FriendRobot";
const About = () => {
  return <div className="bg-white h-screen flex flex-col justify-center  align-center ">
    <Container>
        <div className="flex flex-col gap-24 align-center md:flex-row relative w-full">
        <div >

            <Image src="/AboutImage.svg" alt="robot" width={331} height={409}/>
        </div>
        <div className="relative">

    <div className="absolute right-6">
        <FriendRobot imageUrl="/robotimages/abourhebel.svg" messageName="Let me tell you a bit about Hebel" size="md" className="bg-black text-white border-black right-0 absolute top-8 "/>
    </div>
            <div className="md:w-188.5">
                <h3 className="font-space-grotesk text-4xl mb-8 font-semibold">About</h3>
                <p className="text-base mb-10">
                  Hebel is a full-stack web developer who enjoys building websites and applications that are easy to use and easy to understand. He likes working on both the frontend and backend, and pays attention to how users interact with what he builds.
                </p>
                <p className="text-base">
                  He cares about writing clear, readable code and designing interfaces that feel simple and practical. Hebel enjoys communicating with people and believes good conversations lead to better results. His interest in technology started in childhood and grew naturally over time. He is currently learning and experimenting with UI/UX design to better understand users and improve the way his products work.
                </p>
            </div>
        </div>
        </div>
    </Container>
  </div>;
};

export default About;
