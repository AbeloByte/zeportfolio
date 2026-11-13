"use client";

import { useEffect, useId, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/* ────────────────────────────────────────────────
   RobotAvatar — Abel's tiny robot, drawn in code.

   Every part is its own SVG group, so it can move
   independently:
     • eyes follow the cursor and blink
     • the visor shows different faces
     • arms wave / point / rest on the chin
     • mouth flaps while `talking`
   Animations live in globals.css (robot-* classes)
   and switch off for prefers-reduced-motion.
   ──────────────────────────────────────────────── */

export type RobotPose = "idle" | "wave" | "point" | "think";
export type RobotFace = "hi" | "look" | "happy" | "think";

interface RobotAvatarProps {
  pose?: RobotPose;
  face?: RobotFace;
  /** Mouth moves while true (e.g. while a message is typing). */
  talking?: boolean;
  /** Eyes follow the pointer. */
  followCursor?: boolean;
  className?: string;
}

// Palette — matched to the storybook illustrations: warm white shell,
// teal trim, bold ink outlines, green-lime glowing face.
const C = {
  shellLight: "#FBFAF4",
  shellDark: "#C9D5D0",
  outline: "#1D2B33", // ink outline, like the hand-drawn art
  teal: "#3F8E92",
  tealDark: "#215A5F",
  visor: "#0B1416",
  glow: "#C8F54A",
};
const INK = 2.2; // outline weight (viewBox units)

// Arm rotation (deg) per pose. 0 = hanging straight down.
const ARMS: Record<RobotPose, { left: number; right: number | "wave" }> = {
  idle: { left: 14, right: -14 },
  wave: { left: 14, right: "wave" },
  point: { left: 100, right: -14 },
  think: { left: -131, right: -14 },
};

const SHOULDER_L = { x: 37, y: 100 };
const SHOULDER_R = { x: 83, y: 100 };

function Arm({ x, y, rotate, wave, ids }: {
  x: number;
  y: number;
  rotate: number | "wave";
  wave?: boolean;
  ids: { shell: string };
}) {
  return (
    <g
      className={wave ? "robot-wave" : undefined}
      style={{
        transformOrigin: `${x}px ${y}px`,
        transform: wave ? undefined : `rotate(${rotate}deg)`,
        transition: "transform 550ms cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      <rect x={x - 4.5} y={y} width={9} height={22} rx={4.5} fill={`url(#${ids.shell})`} stroke={C.outline} strokeWidth={INK} />
      <circle cx={x} cy={y + 11} r={2.6} fill={C.teal} />
      <circle cx={x} cy={y + 26} r={6} fill={`url(#${ids.shell})`} stroke={C.outline} strokeWidth={INK} />
      <path d={`M${x - 3} ${y + 29} q3 2 6 0`} stroke={C.teal} strokeWidth={1} fill="none" strokeLinecap="round" />
    </g>
  );
}

function Eye({ cx, cy, shape }: { cx: number; cy: number; shape: "pill" | "arc" | "line" }) {
  if (shape === "arc")
    return <path d={`M${cx - 6} ${cy + 3} Q${cx} ${cy - 7} ${cx + 6} ${cy + 3}`} stroke={C.glow} strokeWidth={3.6} strokeLinecap="round" fill="none" />;
  if (shape === "line")
    return <path d={`M${cx - 5} ${cy} L${cx + 5} ${cy}`} stroke={C.glow} strokeWidth={3.6} strokeLinecap="round" />;
  return <rect x={cx - 4} y={cy - 7} width={8} height={14} rx={4} fill={C.glow} />;
}

export default function RobotAvatar({
  pose = "idle",
  face = "look",
  talking = false,
  followCursor = true,
  className = "",
}: RobotAvatarProps) {
  const uid = useId().replace(/:/g, "");
  const ids = {
    shell: `rb-shell-${uid}`,
    ear: `rb-ear-${uid}`,
    glow: `rb-glow-${uid}`,
    visorClip: `rb-visor-${uid}`,
  };

  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  // Eye + head offsets that chase the pointer.
  const eyeX = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const eyeY = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const headX = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });

  useEffect(() => {
    if (!followCursor || reduced) return;
    const onMove = (e: PointerEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.38);
      const d = Math.max(1, Math.hypot(dx, dy));
      const pull = Math.min(1, d / 250); // close cursor → small movement
      eyeX.set((dx / d) * 6 * pull);
      eyeY.set((dy / d) * 4 * pull);
      headX.set((dx / d) * 2 * pull);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [followCursor, reduced, eyeX, eyeY, headX]);

  const arms = ARMS[pose];
  const showMouth = talking && (face === "look" || face === "think" || face === "happy");

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 140"
      className={className}
      role="img"
      aria-label="Abel's tiny robot"
      overflow="visible"
    >
      <defs>
        <linearGradient id={ids.shell} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.shellLight} />
          <stop offset="0.6" stopColor="#E6F0F0" />
          <stop offset="1" stopColor={C.shellDark} />
        </linearGradient>
        <linearGradient id={ids.ear} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.teal} />
          <stop offset="1" stopColor={C.tealDark} />
        </linearGradient>
        <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={ids.visorClip}>
          <ellipse cx="60" cy="54" rx="31" ry="22" />
        </clipPath>
      </defs>

      {/* ── Body ── */}
      <rect x="52" y="84" width="16" height="8" rx="2" fill={C.tealDark} stroke={C.outline} strokeWidth={INK} />
      <ellipse cx="60" cy="112" rx="24" ry="22" fill={`url(#${ids.shell})`} stroke={C.outline} strokeWidth={INK} />
      <path d="M44 100 Q60 95 76 100" stroke={C.outline} strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* chest panel */}
      <rect x="47" y="106" width="26" height="10" rx="5" fill={C.visor} stroke={C.outline} strokeWidth="1.6" />
      <g filter={`url(#${ids.glow})`}>
        <circle className="robot-led" cx="53" cy="111" r="1.8" fill={C.glow} />
        <path d="M61 109h6M61 111h6M61 113h6" stroke={C.glow} strokeWidth="1" opacity="0.7" />
      </g>

      {/* ── Head (leans a little toward the cursor; tilts when thinking) ── */}
      <motion.g style={{ x: headX }}>
        <g
          style={{
            transformOrigin: "60px 88px",
            transform: `rotate(${pose === "think" ? -6 : 0}deg)`,
            transition: "transform 500ms cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          {/* ear pods */}
          <ellipse cx="17" cy="52" rx="7" ry="12" fill={`url(#${ids.ear})`} stroke={C.outline} strokeWidth={INK} />
          <ellipse cx="103" cy="52" rx="7" ry="12" fill={`url(#${ids.ear})`} stroke={C.outline} strokeWidth={INK} />
          <ellipse cx="15" cy="52" rx="3" ry="7" fill={C.shellLight} opacity="0.85" />
          <ellipse cx="105" cy="52" rx="3" ry="7" fill={C.shellLight} opacity="0.85" />

          {/* helmet */}
          <ellipse cx="60" cy="50" rx="42" ry="38" fill={`url(#${ids.shell})`} stroke={C.outline} strokeWidth={INK} />
          <path d="M30 26 Q44 14 62 13" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />

          {/* visor */}
          <ellipse cx="60" cy="54" rx="34" ry="25" fill={C.teal} stroke={C.outline} strokeWidth="1.8" />
          <ellipse cx="60" cy="54" rx="31" ry="22" fill={C.visor} />

          {/* face */}
          <g clipPath={`url(#${ids.visorClip})`}>
            <g filter={`url(#${ids.glow})`}>
              {face === "hi" ? (
                <text
                  x="60"
                  y="62"
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="800"
                  fill={C.glow}
                  fontFamily="var(--font-space-grotesk), ui-rounded, system-ui, sans-serif"
                  transform="rotate(-6 60 54)"
                >
                  Hi!
                </text>
              ) : (
                <motion.g style={{ x: eyeX, y: eyeY }}>
                  <g
                    className="robot-blink"
                    transform={face === "think" ? "translate(3 -3)" : undefined}
                  >
                    <Eye cx={48} cy={52} shape={face === "happy" ? "arc" : face === "think" ? "line" : "pill"} />
                    <Eye cx={72} cy={52} shape={face === "happy" ? "arc" : "pill"} />
                  </g>
                  {showMouth ? (
                    <rect className="robot-talk" x="55" y="63" width="10" height="3" rx="1.5" fill={C.glow} />
                  ) : face === "look" || face === "happy" ? (
                    <path d="M55 63 Q60 67 65 63" stroke={C.glow} strokeWidth="2" strokeLinecap="round" fill="none" />
                  ) : null}
                </motion.g>
              )}
            </g>
            {/* visor reflection */}
            <path d="M38 42 Q46 34 58 33" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.18" />
          </g>
        </g>
      </motion.g>

      {/* thought dots */}
      {pose === "think" && (
        <g fill={C.glow} filter={`url(#${ids.glow})`}>
          <circle className="robot-dot" cx="104" cy="16" r="2" />
          <circle className="robot-dot" cx="111" cy="8" r="2.6" style={{ animationDelay: "0.2s" }} />
          <circle className="robot-dot" cx="119" cy="-1" r="3.2" style={{ animationDelay: "0.4s" }} />
        </g>
      )}

      {/* ── Arms (drawn last so a hand can rest on the chin) ── */}
      <Arm {...SHOULDER_L} rotate={arms.left} ids={ids} />
      <Arm {...SHOULDER_R} rotate={arms.right} wave={arms.right === "wave"} ids={ids} />
    </svg>
  );
}
