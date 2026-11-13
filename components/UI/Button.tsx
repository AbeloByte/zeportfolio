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
      className={`group relative overflow-hidden bg-ink border font-space-grotesk font-medium border-ink text-white hover:text-ink cursor-pointer
        shadow-[4px_4px_0px_0px_var(--color-primaryColor)]
        hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--color-primaryColor)]
        active:translate-x-1 active:translate-y-1 active:shadow-none
        transition-all duration-300 ease-out-expo ${sizeClass} ${className}`}
      {...props}
    >
      {/* Lime wipe that fills the button from the bottom on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-primaryColor
          transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
      />
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
