/* ============================================================
   The ink layer.

   Eight sketches, maximum two per section, 4em to 9em,
   opacity never above 0.40 and never below 0.10.

   Authoring rules that make these read as ink and not as
   clip-art: coordinates hand-jittered on a 100 grid, 2-4
   cubic segments per path, circles approximated with four
   arcs, no dash patterns on the drawing itself, stroke
   weight 1 everywhere, and variation carried by per-path
   opacity rather than by stroke weight.
   ============================================================ */

type InkProps = {
  className?: string;
  /** stroke colour; defaults to inheriting from the parent */
  color?: string;
  /** layer opacity, 0.10 - 0.40 */
  opacity?: number;
};

/* --- 1. bird, flying, single. hero, over the sky. ---------- */
export function BirdInk({ className, color, opacity = 0.28 }: InkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`ink ${className ?? ""}`}
      style={{ width: "9em", height: "9em", opacity, color }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 16 61 C 27 43 39 44 50 57 C 61 44 73 43 84 61"
        opacity="1"
      />
      <path d="M 50 57 C 53 61 56 63 60 63" opacity="0.6" />
    </svg>
  );
}

/* --- 2. the Zambezi, as a drawn river. destinations. ------- */
export const RIVER_PATH =
  "M 52 -10 C 38 40 66 68 47 116 C 29 162 61 190 44 238 C 30 276 58 300 45 344 C 36 376 52 396 48 412";

export function RiverInk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 400"
      preserveAspectRatio="none"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={RIVER_PATH}
        fill="none"
        stroke="var(--c-orange)"
        strokeWidth={1.25}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        style={{ opacity: 0.4 }}
      />
    </svg>
  );
}

/* --- 3. route ticks. sit on the river line. ---------------- */
export function RouteTicksInk({ className }: { className?: string }) {
  const ticks: Array<{ y: number; w: number }> = [
    { y: 104, w: 5 },
    { y: 232, w: 7 },
    { y: 338, w: 4 },
  ];
  return (
    <svg
      viewBox="0 0 100 400"
      preserveAspectRatio="none"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
      focusable="false"
    >
      {ticks.map((t) => (
        <line
          key={t.y}
          x1={46}
          y1={t.y}
          x2={46 + t.w}
          y2={t.y}
          stroke="var(--c-orange)"
          strokeWidth={1.25}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0.4 }}
        />
      ))}
    </svg>
  );
}

/* --- 4. compass, eight ticks, no ornate points. footer. --- */
export function CompassInk({ className, color, opacity = 0.22 }: InkProps) {
  const ticks = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg
      viewBox="0 0 100 100"
      className={`ink ${className ?? ""}`}
      style={{ width: "5em", height: "5em", opacity, color }}
      aria-hidden="true"
      focusable="false"
    >
      {/* circle approximated with four arcs, radius jittered */}
      <path d="M 50 22 C 64 22 76 34 77 48" />
      <path d="M 77 52 C 77 67 65 78 51 78" />
      <path d="M 47 78 C 33 77 23 66 23 52" />
      <path d="M 23 48 C 23 33 35 22 46 22" opacity="0.6" />
      {ticks.map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const inner = deg % 90 === 0 ? 8 : 11;
        return (
          <line
            key={deg}
            x1={50 + inner * Math.cos(rad)}
            y1={50 + inner * Math.sin(rad)}
            x2={50 + 17 * Math.cos(rad)}
            y2={50 + 17 * Math.sin(rad)}
            opacity={deg % 90 === 0 ? 1 : 0.6}
          />
        );
      })}
    </svg>
  );
}

/* --- 5. topographic contours, five nested. trust. ---------- */
export function ContourInk({ className, color, opacity = 0.1 }: InkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`ink ${className ?? ""}`}
      style={{ width: "7em", height: "7em", opacity, color }}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M 8 62 C 20 34 44 22 68 28 C 88 33 96 52 88 70 C 80 87 54 94 34 87 C 16 81 6 76 8 62 Z" />
      <path d="M 20 60 C 30 40 48 32 66 36 C 82 40 86 54 79 67 C 72 80 52 84 38 79 C 25 74 18 71 20 60 Z" opacity="0.8" />
      <path d="M 32 58 C 39 46 51 41 63 44 C 73 46 76 55 71 63 C 66 71 52 73 43 70 C 35 67 30 65 32 58 Z" opacity="0.6" />
      <path d="M 43 57 C 48 50 55 48 62 50 C 68 52 69 57 66 61 C 63 65 54 66 48 64 C 44 62 41 60 43 57 Z" opacity="0.4" />
      <path d="M 52 56 C 55 53 58 52 61 53 C 63 54 64 56 62 58 C 60 60 56 60 54 59" opacity="0.3" />
    </svg>
  );
}

/* --- 6. field-guide elephant. stories. --------------------- */
export function ElephantInk({ className, color, opacity = 0.2 }: InkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`ink ${className ?? ""}`}
      style={{ width: "7em", height: "7em", opacity, color }}
      aria-hidden="true"
      focusable="false"
    >
      {/* far side of the body, held back in opacity */}
      <path d="M 74 58 C 79 48 82 42 81 36" opacity="0.6" />
      <path d="M 44 62 C 43 72 43 81 43 88" opacity="0.6" />
      <path d="M 60 62 C 61 72 61 81 61 88" opacity="0.6" />
      {/* body */}
      <path d="M 26 62 C 26 48 36 41 54 41 C 70 41 79 45 80 55" />
      <path d="M 26 62 C 22 64 19 69 20 75" />
      {/* head and trunk */}
      <path d="M 20 75 C 18 82 21 88 27 89 C 31 90 34 87 33 83" />
      {/* ear */}
      <path d="M 33 47 C 42 49 45 60 40 67 C 37 71 32 70 30 65" opacity="0.75" />
      {/* near legs */}
      <path d="M 36 62 C 35 72 35 81 35 88" />
      <path d="M 52 62 C 52 72 52 81 52 88" />
      {/* tusk and eye */}
      <path d="M 22 74 C 26 77 30 77 33 74" opacity="0.8" />
      <path d="M 27 58 C 28 57 29 58 29 59" opacity="0.9" />
    </svg>
  );
}

/* --- 7. hand-drawn arrow. link ends only. ------------------ */
export function ArrowInk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={`ink ${className ?? ""}`}
      style={{ width: "3.5em", height: "2.625em" }}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M 4 34 C 20 32 40 30 64 27" />
      <path d="M 53 15 C 60 20 65 26 66 27 C 65 34 62 40 58 45" />
    </svg>
  );
}

/* --- 8. map cross-hair. introduction. ---------------------- */
export function CrossHairInk({
  className,
  color,
  opacity = 0.28,
}: InkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`ink ${className ?? ""}`}
      style={{ width: "4em", height: "4em", opacity, color }}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M 50 26 C 60 26 69 34 70 44" />
      <path d="M 70 54 C 70 65 61 73 51 73" />
      <path d="M 47 73 C 37 72 30 63 30 54" />
      <path d="M 30 44 C 30 34 39 26 47 26" opacity="0.6" />
      <line x1="50" y1="14" x2="50" y2="30" />
      <line x1="50" y1="70" x2="50" y2="86" />
      <line x1="14" y1="50" x2="30" y2="50" />
      <line x1="70" y1="50" x2="86" y2="50" />
      <path d="M 50 44 C 53 44 55 46 55 49 C 55 52 53 54 50 54 C 47 54 45 52 45 49 C 45 46 47 44 50 44" />
    </svg>
  );
}