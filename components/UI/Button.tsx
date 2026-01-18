import React from 'react';

// 1."Source of Truth" first
const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base w-[120px] h-[44px]',
  lg: 'px-4 py-2 text-base',
  xl: 'px-10 py-5 text-xl',
} as const; // 'as const' makes the keys "read-only" and specific


// 2. Use 'keyof typeof' to automatically create the Type
// This says: "ButtonSize can only be one of the keys of the buttonSizes object"
type ButtonSize = keyof typeof buttonSizes;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: ButtonSize; // Now this automatically becomes 'sm' | 'md' | 'lg' | 'xl'
}


export default function Button({
  label,
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {

  // 3. No more errors! TS knows for a fact that size exists in buttonSizes
  const sizeClass = buttonSizes[size];

  return (
    <button
      className={`relative bg-white border font-space-grotesk border-white text-black hover:cursor-pointer shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(234,255,0,1)] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none ${sizeClass} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
