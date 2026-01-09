// components/Button.jsx
const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export default function Button({ size = 'md', children, className, ...props }) {
  // Select the class based on the prop, defaulting to 'md'
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      className={`bg-blue-600 text-white font-medium rounded-lg transition-all hover:bg-blue-700 ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
