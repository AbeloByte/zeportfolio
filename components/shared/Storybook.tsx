import Image, { type StaticImageData } from "next/image";

/* ────────────────────────────────────────────────
   Small shared pieces of the storybook look.
   ──────────────────────────────────────────────── */

const GRAIN_TONES = {
  /** cool, for sky sections */
  sky: "0 0 0 0 0.1 0 0 0 0 0.12 0 0 0 0 0.15 0 0 0 0.55 0",
  /** warm, for cream / paper sections */
  paper: "0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.35 0",
} as const;

const grainUrl = (tone: keyof typeof GRAIN_TONES) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='${GRAIN_TONES[tone]}'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")`;

/** Paper grain overlay. Put it first inside a `relative overflow-hidden` section. */
export function Grain({ tone = "paper", opacity = 0.6 }: { tone?: keyof typeof GRAIN_TONES; opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{ backgroundImage: grainUrl(tone), opacity }}
    />
  );
}

/** A screenshot shown like a photo taped into a sketchbook. */
export function TapedPhoto({
  src,
  alt,
  tilt = -2,
  sizes,
  className = "",
}: {
  src: string | StaticImageData;
  alt: string;
  tilt?: number;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ rotate: `${tilt}deg` }}
    >
      {/* tape */}
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 border border-[#E2D3A8]/70 bg-[#F3E7C4]/85"
      />
      <div className="border border-creamLine bg-white p-1.5">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE6D2]">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}
