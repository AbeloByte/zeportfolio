"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  animate,
  useTransform,
  useVelocity,
} from "framer-motion";
import { guideScript, type Pose, type SectionId } from "@/data/robotGuide";
import RobotAvatar, { type RobotFace } from "./RobotAvatar";
import { ROBOT_CARD_H, ROBOT_H, ROBOT_OVERLAP, ROBOT_STOP_H, ROBOT_STOP_W } from "./RobotStop";

/* ────────────────────────────────────────────────
   RobotGuide — one robot that tours the whole page.

   Desktop: each section has a <RobotStop id="…" />.
   When a section reaches the middle of the screen,
   the robot flies (jet flame, tilt) to that section's
   stop and says its lines. Click it → next line.
   Hover anything with data-robot-say="…" → it comments.

   Phones: sections are too narrow for side stops, so
   it waits in the bottom-right corner instead.
   ──────────────────────────────────────────────── */

const SECTION_IDS = Object.keys(guideScript) as SectionId[];
const IDLE_MS = 15_000;
const MOBILE_AUTOCLOSE_MS = 7_000;
const HOVER_DWELL_MS = 500; // cursor must rest this long before the robot comments
const HINT_MIN_MS = 2_500; // a hint stays at least this long before the next one
const HINT_LINGER_MS = 1_200; // keep the hint briefly after the cursor leaves
const TYPE_SPEED_MS = 40; // per character
const FLIGHT_S = 1.6; // seconds for the robot to fly to a new section (higher = calmer)

/** Page coordinates of a section's <RobotStop />, or null if it isn't laid out. */
function stopPosition(section: string) {
  const el = document.querySelector<HTMLElement>(`[data-robot-stop="${section}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0) return null;
  return { x: r.left + window.scrollX, y: r.top + window.scrollY };
}

/** Types `text` out one character at a time; holds still while `paused`. */
function useTypewriter(text: string, { instant, paused }: { instant: boolean; paused: boolean }, speed = TYPE_SPEED_MS) {
  const [state, setState] = useState({ text: "", count: 0 });

  useEffect(() => {
    if (instant || paused) return;
    const id = setInterval(() => {
      setState((prev) => {
        if (prev.text === text && prev.count >= text.length) return prev; // finished — no re-render
        return { text, count: prev.text === text ? prev.count + 1 : 1 };
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, instant, paused, speed]);

  if (instant) return { typed: text, done: true };
  const typed = state.text === text ? text.slice(0, state.count) : "";
  return { typed, done: typed.length >= text.length };
}

export default function RobotGuide() {
  const reduced = !!useReducedMotion();

  const [isDesktop, setIsDesktop] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false); // (phones) robot steps aside for the footer
  const [section, setSection] = useState<SectionId>("home");
  const [line, setLine] = useState<{ section: SectionId; i: number }>({ section: "home", i: 0 });
  const [open, setOpen] = useState(true);
  const [hoverSay, setHoverSay] = useState<string | null>(null);
  const [idle, setIdle] = useState(false);
  const [flying, setFlying] = useState(false);
  // Desktop: the visitor scrolled past this section's stop (long sections like
  // Projects), so the robot waits in the screen corner instead.
  const [docked, setDocked] = useState(false);

  // Re-open the card whenever the visitor reaches a new section.
  const [prevSection, setPrevSection] = useState(section);
  if (section !== prevSection) {
    setPrevSection(section);
    setOpen(true);
  }

  // Docking tucks the card away; click the robot (or hover something) to hear from it.
  const [prevDocked, setPrevDocked] = useState(docked);
  if (docked !== prevDocked) {
    setPrevDocked(docked);
    if (docked) setOpen(false);
  }

  const stop = guideScript[section];
  const lineIndex = line.section === section ? line.i : 0;
  const hovering = isDesktop && hoverSay !== null;

  const text = hovering ? hoverSay! : idle ? stop.idle : stop.lines[lineIndex];
  const pose: Pose | "idle" = flying ? "idle" : hovering ? "point" : idle ? "wave" : stop.pose;
  const face: RobotFace =
    flying || hovering ? "happy" : pose === "wave" ? "hi" : pose === "think" ? "think" : "look";
  const showCard = open || hovering;
  const { typed, done } = useTypewriter(text, { instant: reduced, paused: flying || !showCard });

  /* ── Breakpoint ── */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    const raf = requestAnimationFrame(update);
    mq.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", update);
    };
  }, []);

  /* ── (phones) only show once the hero is gone ── */
  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.55);
      const footer = document.querySelector("footer");
      setAtFooter(!!footer && footer.getBoundingClientRect().top < window.innerHeight - 40);
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ── (desktop) dock in the corner once the current stop scrolls off the top ── */
  useEffect(() => {
    if (!isDesktop) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = document.querySelector<HTMLElement>(`[data-robot-stop="${section}"]`);
      if (!el) return setDocked(false);
      // 72px ≈ the sticky header: once the stop is hidden behind it, dock —
      // unless the footer is on screen (the robot has said bye by then).
      const footer = document.querySelector("footer");
      const footerVisible = !!footer && footer.getBoundingClientRect().top < window.innerHeight - 40;
      setDocked(el.getBoundingClientRect().bottom < 72 && !footerVisible);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop, section]);

  /* ── Which section is in the middle of the screen ── */
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── Flight: follow the current section's stop ── */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ready = useMotionValue(0);
  const placed = useRef(false);
  const sectionRef = useRef(section);

  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const tilt = useTransform(vx, [-1500, 0, 1500], [-16, 0, 16]);
  const speed = useTransform(() => Math.min(1, Math.hypot(vx.get(), vy.get()) / 600));
  const cardOpacity = useTransform(speed, [0, 0.25], [1, 0]);

  useMotionValueEvent(speed, "change", (v) => {
    if (v > 0.3 && !flying) setFlying(true);
    else if (v < 0.05 && flying) setFlying(false);
  });

  // A new section → fly there. The previous stop is usually far off-screen,
  // so first slip (invisibly) to just outside the screen edge, then make a
  // short, fixed-length flight in. Same calm pace however far apart sections are.
  useEffect(() => {
    sectionRef.current = section;
    if (!isDesktop) return;
    const pos = stopPosition(section);
    if (!pos) return;

    if (!placed.current || reduced) {
      x.jump(pos.x);
      y.jump(pos.y);
      placed.current = true;
      ready.set(1);
      return;
    }

    const viewTop = window.scrollY;
    const viewBottom = viewTop + window.innerHeight;
    const fromY = y.get();
    const offScreen = fromY + ROBOT_STOP_H < viewTop || fromY > viewBottom;
    if (offScreen) {
      const comingFromAbove = fromY < pos.y;
      y.jump(comingFromAbove ? viewTop - ROBOT_STOP_H : viewBottom);
    }

    // ease-in-out: gentle take-off, steady cruise, soft landing
    const flight = { duration: FLIGHT_S, ease: [0.45, 0, 0.25, 1] } as const;
    const ax = animate(x, pos.x, flight);
    const ay = animate(y, pos.y, flight);
    return () => {
      ax.stop();
      ay.stop();
    };
  }, [section, isDesktop, reduced, x, y, ready]);

  // Layout changed (resize, images loading) → snap to the stop, unless mid-flight.
  useEffect(() => {
    if (!isDesktop) return;
    const fix = () => {
      if (!placed.current || x.isAnimating() || y.isAnimating()) return;
      const pos = stopPosition(sectionRef.current);
      if (!pos) return;
      // jump (not set) so a layout nudge doesn't register as flying
      x.jump(pos.x);
      y.jump(pos.y);
    };
    const ro = new ResizeObserver(fix);
    ro.observe(document.body);
    window.addEventListener("resize", fix);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fix);
    };
  }, [isDesktop, x, y]);

  /* ── Hover hints: anything with data-robot-say ──
     Calm by design: the cursor has to rest on an item before the
     robot speaks, and once it speaks it finishes before switching —
     so sweeping across the project list doesn't make it babble. */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let shown: string | null = null; // what's in the card now
    let pending: string | null = null; // what we're about to say
    let shownAt = 0;

    const schedule = (say: string | null, minWait: number) => {
      if (say === pending) return; // already on its way
      clearTimeout(timer);
      pending = say;
      if (say === shown) return; // came back to the same item — keep it
      const readTime = shownAt + HINT_MIN_MS - Date.now(); // let the current hint finish
      timer = setTimeout(() => {
        shown = say;
        shownAt = say ? Date.now() : 0;
        setHoverSay(say);
      }, Math.max(minWait, readTime));
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.("[data-robot-say]");
      const say = el?.getAttribute("data-robot-say") ?? null;
      schedule(say, say ? HOVER_DWELL_MS : HINT_LINGER_MS);
    };
    document.addEventListener("pointerover", onOver);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  /* ── Idle nudge ── */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIdle(true);
        setOpen(true);
      }, IDLE_MS);
    };
    const onActivity = () => {
      setIdle(false);
      arm();
    };
    const events = ["scroll", "pointermove", "pointerdown", "keydown"] as const;
    events.forEach((ev) => window.addEventListener(ev, onActivity, { passive: true }));
    arm();
    return () => {
      clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, onActivity));
    };
  }, []);

  /* ── (phones) tuck the card away after a moment ── */
  useEffect(() => {
    if (isDesktop || !open || !pastHero) return;
    const t = setTimeout(() => setOpen(false), MOBILE_AUTOCLOSE_MS);
    return () => clearTimeout(t);
  }, [isDesktop, open, pastHero, section, lineIndex]);

  const onRobotClick = () => {
    if (!open) return setOpen(true);
    if (idle) return setIdle(false);
    setLine({ section, i: (lineIndex + 1) % stop.lines.length });
  };

  /* ────────── pieces ────────── */

  // Storybook card: a cream paper note, ink text, handwritten message.
  const cardTone = "bg-[#FBF6EA] text-dusk border-creamLine";

  const robot = (
    <motion.button
      type="button"
      onClick={onRobotClick}
      aria-label={showCard ? "Next tip from the tour robot" : "Open the tour robot"}
      className="pointer-events-auto relative z-0 w-[62px] h-[72px] shrink-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusk"
      whileHover={reduced ? undefined : { scale: 1.06 }}
      whileTap={reduced ? undefined : { scale: 0.92 }}
    >
      {/* jet flame — only visible in flight */}
      <motion.span
        aria-hidden
        style={{ opacity: speed, scaleY: speed }}
        className="absolute left-1/2 -translate-x-1/2 top-[92%] w-4 h-8 origin-top rounded-b-full bg-linear-to-b from-[#F2B24A] via-[#F2B24A]/60 to-transparent blur-[3px]"
      />
      <motion.div
        className="relative w-full h-full"
        animate={reduced || flying ? { y: 0 } : { y: [0, -6, 0] }}
        transition={flying ? { duration: 0.2 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <RobotAvatar pose={pose} face={face} talking={showCard && !done && !flying} className="w-full h-full" />
      </motion.div>

      {!showCard && (
        <span aria-hidden className="absolute top-1 right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-ochre opacity-75 animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-ochre border border-dusk" />
        </span>
      )}
    </motion.button>
  );

  const card = (
    <AnimatePresence>
      {showCard && (
        <motion.div
          key="card"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          style={isDesktop ? { height: ROBOT_CARD_H, marginTop: -ROBOT_OVERLAP } : { marginTop: -ROBOT_OVERLAP }}
          className={`pointer-events-auto relative z-10 w-full flex flex-col rounded-md border px-4 pt-2.5 pb-3 shadow-[0_14px_30px_-16px_rgba(19,40,58,0.55)] ${cardTone}`}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setHoverSay(null);
            }}
            aria-label="Close robot message"
            className="absolute top-1.5 right-1.5 p-1 leading-none text-dusk transition-opacity opacity-40 hover:opacity-100"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <p aria-hidden className="font-script text-[19px] leading-[1.15] line-clamp-2 flex-1 pr-4">
            {typed}
            {!done && (
              <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-[-0.15em] animate-pulse" />
            )}
          </p>
          <p className="sr-only" aria-live="polite">
            {text}
          </p>

          {!hovering && !idle && (
            <motion.div animate={{ opacity: done ? 1 : 0 }} className="flex items-center justify-between gap-2">
              <div className="flex gap-1" aria-hidden title={isDesktop ? "Click the robot for more" : "Tap the robot for more"}>
                {stop.lines.length > 1 &&
                  stop.lines.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === lineIndex ? "w-4 bg-dusk" : "w-1.5 bg-dusk/20"
                      }`}
                    />
                  ))}
              </div>
              <div className="flex gap-4">
                {stop.actions.map((a) => (
                  <a
                    key={a.href + a.label}
                    href={a.href}
                    className="whitespace-nowrap border-b border-dusk/40 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-dusk transition-colors hover:border-dusk"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  /** The robot waiting in the bottom-right corner of the screen. */
  const corner = (key: string, sizeClass: string) => (
    <motion.aside
          key={key}
          aria-label="Tour guide robot"
          className={`fixed z-30 flex flex-col items-end pointer-events-none ${sizeClass}`}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 120, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 120, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <div className="mr-2">{robot}</div>
          {showCard && <div className="w-full">{card}</div>}
    </motion.aside>
  );

  /* ── Desktop: flies between section stops; docks in the corner in long sections ── */
  if (isDesktop) {
    return (
      <>
        <motion.aside
          aria-label="Tour guide robot"
          aria-hidden={docked || undefined}
          inert={docked}
          className="absolute top-0 left-0 z-30 flex flex-col items-center pointer-events-none"
          style={{ x, y, width: ROBOT_STOP_W, height: ROBOT_H - ROBOT_OVERLAP + ROBOT_CARD_H, opacity: docked ? 0 : ready }}
        >
          <motion.div style={{ rotate: tilt }} className="flex justify-center">
            {robot}
          </motion.div>
          <motion.div style={{ opacity: cardOpacity }} className="w-full">
            {card}
          </motion.div>
        </motion.aside>
        <AnimatePresence>{docked && corner("robot-dock", "bottom-6 right-6 w-[300px]")}</AnimatePresence>
      </>
    );
  }

  /* ── Phones: waits in the corner ── */
  return (
    <AnimatePresence>
      {pastHero && !atFooter && corner("robot-corner", "bottom-4 right-4 w-[min(240px,calc(100vw-32px))]")}
    </AnimatePresence>
  );
}
