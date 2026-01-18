import React from "react";
import Button from "../UI/Button";
import FriendRobot from "../shared/FriendRobot";
import Image from "next/image";

const Hero = () => {
  return <div className="flex flex-col md:flex-row relative h-screen">

    <div className="w-96 flex flex-col gap-8 justify-center">
   <div className="flex flex-col gap-4">
<h1 className="font-general-sans text-10 text-white ">
    Hi, I’m Hebel Full Stack
<span className="text-primaryColor">Web</span> Developer

    </h1>

<p className="text-bodyTextColor leading-[120%]">

    I design and build user centered web experiences  that balance clean interfaces with reliable engineering.
</p>

    </div>
<div>
 <Button label="View My Projects" size="lg" className="hidden md:inline-flex"  />
</div>


    </div>

<div>
<Image src="/hero image.svg" alt="Robot Image" width={572} height={510} className="absolute bottom-0"/>
</div>
<FriendRobot imageUrl="/robotimages/hey.svg" messageName="Hey there! Welcome  I’m Hebel’s tiny Robot" size="md" className="right-4 absolute top-8" />

  </div>;
};

export default Hero;
