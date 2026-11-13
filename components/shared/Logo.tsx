/* ────────────────────────────────────────────────
   Logo — the "a." mark.
   A cream disc with a navy ring and "a." in the
   display font (same as the big headlines), ochre
   full stop. Matches the favicon (public/favicon.ico).
   ──────────────────────────────────────────────── */

interface LogoProps {
  /** diameter in px */
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="Abel Adane"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-cream ${className}`}
      style={{ width: size, height: size, boxShadow: `inset 0 0 0 ${Math.max(2, size * 0.04)}px #13283A` }}
    >
      <span
        aria-hidden
        className="font-display font-semibold leading-none text-dusk"
        style={{ fontSize: size * 0.875, transform: `translate(${size * 0.02}px, -${size * 0.05}px)`, letterSpacing: "-0.02em" }}
      >
        a<span className="text-ochre">.</span>
      </span>
    </span>
  );
}
