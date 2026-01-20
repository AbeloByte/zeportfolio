import React from "react";
import Button from "../UI/Button";
import FriendRobot from "../shared/FriendRobot";
import Image from "next/image";
import Container from "../layout/Container";


const Hero = () => {
    return (
    <Container>

  <div className="flex flex-col justify-evenly md:justify-between md:flex-row  h-screen">


    <div className="md:w-96 flex flex-col gap-8 justify-center ">
   <div className="flex flex-col gap-4">
    <h1 className="font-general-sans text-2xl text-white  md:text-4xl">
    Hi, I’m Hebel Full Stack
<span className="text-primaryColor"> Web </span> Developer | Junior UI/UX Designer

    </h1>

        <p className="text-bodyTextColor text-xl font-light leading-[120%]">

    I design and build user centered web experiences  that balance clean interfaces with reliable engineering.
        </p>

    </div>
        <div>
 <Button label="View My Projects" size="lg" className="hidden md:inline-flex"  />
        </div>
    </div>

    <div>
        <Image src="/hero image.svg" alt="hero image" width={572} height={510} className="absolute -bottom-24  md:left-1/2 md:-translate-x-1/2 "/>
    </div>
    <div className="relative">
    <FriendRobot imageUrl="/robotimages/hey.svg" messageName="Hey there! Welcome  I’m Hebel’s tiny Robot" size="md" className="right-0 absolute top-8 bg-white border-white" />
    </div>
    </div>
    </Container>
    );
};

export default Hero;
