import React from "react";
import Image from "next/image";

const messageCardSizes = {
  sm: 'px-3 py-1.5 text-sm w-[160px]',
  md: 'px-4 py-4 text-sm w-[220px]',
  lg: 'px-4 py-2 text-base',
  xl: 'px-10 py-5 text-xl',
} as const;

type MessageCardSize = keyof typeof messageCardSizes;

interface FriendRobotProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  messageName: string;
  className?: string;
  size?: MessageCardSize;
  fading?: boolean;
}

const FriendRobot = ({ imageUrl, messageName, className = "", size = "lg", fading = false }: FriendRobotProps) => {
  const sizeClass = messageCardSizes[size];

  return (
    <div className="hidden md:flex flex-col items-center -space-y-10">
      {/* Robot image */}
      {imageUrl && (
        <Image src={imageUrl} alt="Robot" width={94} height={96} />
      )}

      {/* Message bubble */}
      <div
        className={`
          ${sizeClass} ${className}
          relative text-center font-space-grotesk text-sm text-black
          border border-black
          shadow-[4px_4px_0px_0px_rgba(234,255,0,1)]
          hover:translate-x-0.5 hover:translate-y-0.5
          hover:shadow-[4px_4px_0px_0px_rgba(234,255,0,1)]
          active:translate-x-2 active:translate-y-2 active:shadow-none
          transition-all duration-300
          flex items-center justify-center
        `}
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(4px)" : "translateY(0)",
          transition: "opacity 1s ease, transform 0.1s ease",
        }}
      >
        {/* Quote mark */}
        <span className="absolute top-1 left-2 text-primaryColor text-lg leading-none font-serif select-none">&ldquo;</span>
        <p className="leading-snug px-2">{messageName}</p>
      </div>
    </div>
  );
};

export default FriendRobot;
