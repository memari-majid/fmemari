/**
 * Reusable cancer-themed visual elements for fmemari.com.
 *
 * Designed to be subtle: most components default to low opacity and use
 * `currentColor`, so they inherit the surrounding text color (which makes
 * them adapt naturally to light/dark mode without per-component dark variants).
 *
 * Inventory:
 *   <AwarenessRibbon />       — universal cancer-awareness ribbon (any color)
 *   <DnaHelixBackground />    — repeating double-helix pattern, fills its parent
 *   <CellClusterBackground /> — repeating microscopic-cell cluster pattern
 *   <MolecularBonds />        — small atomic / molecular-bond glyph
 *   <Caduceus />              — staff-of-Asclepius medical symbol (single line)
 */

type DecorationProps = { className?: string };

/* ------------------------------------------------------------------ */
/*  Awareness ribbon                                                   */
/* ------------------------------------------------------------------ */

/**
 * The universally-recognized cancer-awareness ribbon shape — looped at the
 * top, with two tails diverging downward. Color is supplied via `currentColor`
 * so callers can tint it with Tailwind text-color utilities (e.g.
 * `<span className="text-green-500 dark:text-green-300"><AwarenessRibbon ../></span>`).
 *
 * Color conventions (per major awareness foundations):
 *   • Pink            — Breast cancer
 *   • Light blue      — Stomach / gastric cancer
 *   • Dark blue       — Colorectal cancer
 *   • Teal            — Thyroid (and ovarian) cancer
 *   • Burgundy        — Head and neck cancer
 *   • Lavender        — All cancers / general awareness
 */
export function AwarenessRibbon({
  className = "h-3 w-3",
  title,
}: DecorationProps & { title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {/* Loop at the top — two strands cross to form a tear-drop shape */}
      <path
        d="M8 11 C 4 9 3 6 4.5 3.5 C 6 1 8 3 8 5 C 8 3 10 1 11.5 3.5 C 13 6 12 9 8 11 Z"
        fill="currentColor"
      />
      {/* Two tails diverging downward */}
      <path d="M7 11 L 5 22" />
      <path d="M9 11 L 11 22" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Background patterns                                                */
/* ------------------------------------------------------------------ */

/**
 * Repeating DNA double-helix pattern. Fills its parent — usually used as an
 * absolutely-positioned background element with `text-green-500/15` or
 * similar low-opacity color to make it a watermark.
 */
export function DnaHelixBackground({ className = "" }: DecorationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern
          id="dna-helix-pattern"
          x="0"
          y="0"
          width="20"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Two sinusoidal strands — approximated with quadratic curves */}
          <path d="M0 0 Q 10 20 20 40 M20 0 Q 10 20 0 40" />
          {/* Base pairs — short rungs between the strands */}
          <line x1="2" y1="6" x2="18" y2="6" />
          <line x1="4" y1="14" x2="16" y2="14" />
          <line x1="6" y1="22" x2="14" y2="22" />
          <line x1="4" y1="30" x2="16" y2="30" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dna-helix-pattern)" />
    </svg>
  );
}

/**
 * Repeating cluster of cells viewed under a microscope — small filled circles
 * arranged in soft groups. Same usage as DnaHelixBackground.
 */
export function CellClusterBackground({ className = "" }: DecorationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern
          id="cell-cluster-pattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Cluster — three round cells with a smaller satellite */}
          <circle cx="20" cy="22" r="6" opacity="0.55" />
          <circle cx="32" cy="14" r="4" opacity="0.45" />
          <circle cx="36" cy="28" r="5" opacity="0.5" />
          <circle cx="14" cy="32" r="2.5" opacity="0.4" />

          {/* A second, sparser cluster offset to the lower-right of the tile */}
          <circle cx="48" cy="48" r="4" opacity="0.4" />
          <circle cx="54" cy="40" r="2" opacity="0.35" />

          {/* Micro-cells scattered for visual texture */}
          <circle cx="6" cy="50" r="1.5" opacity="0.35" />
          <circle cx="50" cy="6" r="1.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cell-cluster-pattern)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Smaller, single-instance accents                                   */
/* ------------------------------------------------------------------ */

/**
 * A small molecular-bond / atom glyph — three nodes connected by lines, with
 * one orbiting electron-style ring. Used as a corner accent in the hero.
 */
export function MolecularBonds({ className = "" }: DecorationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Bonds */}
      <line x1="14" y1="14" x2="32" y2="32" />
      <line x1="32" y1="32" x2="50" y2="14" />
      <line x1="32" y1="32" x2="32" y2="54" />
      {/* Atoms */}
      <circle cx="14" cy="14" r="4.5" fill="currentColor" />
      <circle cx="50" cy="14" r="4.5" fill="currentColor" />
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      <circle cx="32" cy="54" r="4.5" fill="currentColor" />
      {/* Orbital ring */}
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="14"
        transform="rotate(35 32 32)"
        opacity="0.55"
      />
    </svg>
  );
}
