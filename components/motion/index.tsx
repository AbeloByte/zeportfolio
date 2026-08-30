"use client";

import React from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type Variants,
  type Transition,
} from "framer-motion";

/* ────────────────────────────────────────────────
   Shared motion language
   One easing curve + one duration scale so every
   section on the site moves the same way.
   ──────────────────────────────────────────────── */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const transition: Transition = {
  duration: 0.6,
  ease: EASE,
};

export const springy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

/** How far outside the viewport an element starts revealing. */
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" } as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = (dir: Direction, distance: number) => {
  switch (dir) {
    case "up":    return { y: distance };
    case "down":  return { y: -distance };
    case "left":  return { x: distance };
    case "right": return { x: -distance };
    default:      return {};
  }
};

/* ────────────────────────────────────────────────
   Reveal — fade + travel when scrolled into view
   ──────────────────────────────────────────────── */

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  /** Direction the element travels *from*. */
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
}

export function Reveal({
  children,
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.6,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Stagger — parent that releases its children in
   sequence. Pair with <StaggerItem>.
   ──────────────────────────────────────────────── */

interface StaggerProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  /** Animate on mount instead of on scroll (used in the hero). */
  immediate?: boolean;
}

export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  immediate = false,
  ...rest
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT })}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  direction?: Direction;
  distance?: number;
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 20,
  ...rest
}: StaggerItemProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, ...offset(direction, distance) },
    show: { opacity: 1, x: 0, y: 0, transition },
  };

  return (
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}

/** Same as StaggerItem but renders a <span> — safe inside inline flex rows. */
export function StaggerTag({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof motion.span>) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: springy },
  };

  return (
    <motion.span variants={variants} className={className} {...rest}>
      {children}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────
   Grow — a line that draws itself from one end
   (timeline tracks, rules, underlines)
   ──────────────────────────────────────────────── */

export function Grow({
  className,
  axis = "y",
  duration = 1.1,
  delay = 0,
}: {
  className?: string;
  axis?: "x" | "y";
  duration?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: axis === "y" ? "top" : "left" }}
      initial={reduced ? { opacity: 0 } : { scaleY: axis === "y" ? 0 : 1, scaleX: axis === "x" ? 0 : 1 }}
      whileInView={{ scaleY: 1, scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration, ease: EASE, delay }}
    />
  );
}

/* ────────────────────────────────────────────────
   Float — slow idle bob, for the robot / hero art
   ──────────────────────────────────────────────── */

export function Float({
  children,
  amount = 10,
  duration = 5,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amount, 0] }}
      transition={{ duration, ease: "easeInOut", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Pop — scale in when seen, nudge on hover.
   For badges, timeline nodes, avatars.
   ──────────────────────────────────────────────── */

export function Pop({
  children,
  className,
  delay = 0,
  hoverScale = 1.12,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
      whileHover={reduced ? undefined : { scale: hoverScale }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   HoverShift — slides its content on hover.
   Safe to use from server components (children are
   rendered on the server and passed through).
   ──────────────────────────────────────────────── */

export function HoverShift({
  children,
  className,
  x = 5,
  y = 0,
}: {
  children: React.ReactNode;
  className?: string;
  x?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      whileHover={{ x, y }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   WordReveal — headline that rises word by word
   from behind a mask. The workhorse of the hero
   and every section title.
   ──────────────────────────────────────────────── */

export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  as: Tag = "span",
  immediate = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        {...(immediate
          ? { animate: "show" }
          : { whileInView: "show", viewport: { once: true, amount: 0.4 } })}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="inline-flex overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span variants={word} className={wordClassName}>
              {w}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ────────────────────────────────────────────────
   Magnetic — the element leans toward the cursor
   and springs back on exit. For primary CTAs.
   ──────────────────────────────────────────────── */

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Tilt — subtle 3D rotation toward the pointer.
   Disabled on touch, where there is no hover.
   ──────────────────────────────────────────────── */

export function Tilt({
  children,
  className,
  max = 7,
  scale = 1.015,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  if (reduced) return <div className={className}>{children}</div>;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      transition={{ type: "spring", ...spring }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Parallax — drifts its content against the scroll.
   Keep `distance` small; this should be felt more
   than seen.
   ──────────────────────────────────────────────── */

export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
