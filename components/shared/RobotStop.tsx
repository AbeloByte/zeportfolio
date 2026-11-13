/* ────────────────────────────────────────────────
   RobotStop — an empty slot where the tour robot
   lands when its section is on screen. Put one in
   each section; the `id` must match the section id
   and a key in data/robotGuide.ts.
   The robot itself is rendered by <RobotGuide />.
   ──────────────────────────────────────────────── */

/* Robot (72px, standing 12px into the card) + fixed-height card.
   The guide uses the same numbers, so the slot is exactly its size
   and the robot never covers the section's content. */
export const ROBOT_H = 72;
export const ROBOT_OVERLAP = 12;
export const ROBOT_CARD_H = 96;
export const ROBOT_STOP_W = 300;
export const ROBOT_STOP_H = ROBOT_H - ROBOT_OVERLAP + ROBOT_CARD_H; // 156

export default function RobotStop({ id, className = "" }: { id: string; className?: string }) {
  return (
    <div
      aria-hidden
      data-robot-stop={id}
      className={`hidden md:block shrink-0 ${className}`}
      style={{ width: ROBOT_STOP_W, height: ROBOT_STOP_H }}
    />
  );
}
