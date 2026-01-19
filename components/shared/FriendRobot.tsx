import React from "react";
import Image from "next/image";

const messageCardSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-5 text-base w-[199px] h-[82px]',
  lg: 'px-4 py-2 text-base',
  xl: 'px-10 py-5 text-xl',
} as const; // 'as const' makes the keys "read-only" and specific


type MessageCardSize = keyof typeof messageCardSizes;

interface jituRobot extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl?:string;
    messageName:string;
    className?:string;
    size?: MessageCardSize;

}



const FriendRobot = ({imageUrl, messageName, className, size = "lg"}: jituRobot) => {


const sizeClass = messageCardSizes[size];
  return <div className={`flex flex-col items-center gap-0 -space-y-10 `}>
<div>
    {imageUrl && <Image src={imageUrl} alt="Robot Image"  width={94} height={96}  className=""/>}
</div>
<div className={  className + sizeClass + ` text-sm relative text-center  border font-space-grotesk text-black hover:cursor-pointer shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none ${className} `}>{messageName}</div>
  </div>;
};

export default FriendRobot;
