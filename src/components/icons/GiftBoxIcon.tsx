// src/components/icons/GiftBoxIcon.tsx
import * as React from "react";

export type GiftBoxVariant =
  | "plain"
  | "stars"
  | "dots"
  | "stripes"
  | "ribbon"
  | "sparkles";

// In case a theme sends an unexpected string, map it safely.
function normalizeVariant(v?: string): GiftBoxVariant {
  switch (v) {
    case "stars":
    case "sparkles": // treat sparkles ~ stars or keep a separate branch below
      return "sparkles"; // or "stars" if you prefer that look
    case "dots":
      return "dots";
    case "stripes":
      return "stripes";
    case "ribbon":
      return "ribbon";
    case "plain":
    default:
      return "plain";
  }
}

type Props = {
  className?: string;
  primary?: string;   // box color
  secondary?: string; // lid color
  ribbon?: string;    // ribbon color
  shadow?: string;    // shadow color
  showShadow?: boolean; // allow disabling the ellipse shadow if needed
  variant?: GiftBoxVariant | string; // allow any string, we normalize internally
};

export default function GiftBoxIcon({
  className,
  primary = "#8B5CF6",
  secondary = "#FDE68A",
  ribbon = "#FB7185",
  shadow = "rgba(16,24,40,0.18)",
  showShadow = true,
  variant = "plain",
}: Props) {
  const v = normalizeVariant(variant);

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Soft shadow */}
      {showShadow && <ellipse cx="32" cy="54" rx="14" ry="4" fill={shadow} />}

      {/* Box */}
      <rect x="12" y="26" width="40" height="22" rx="4" fill={primary} />

      {/* Lid */}
      <rect x="10" y="20" width="44" height="10" rx="3" fill={secondary} />

      {/* Ribbons */}
      <rect x="30" y="20" width="4" height="28" rx="2" fill={ribbon} />
      <rect x="12" y="30" width="40" height="4" rx="2" fill={ribbon} />

      {/* Variants */}
      {v === "stars" && (
        <g fill="#fff" opacity="0.9">
          <path d="M20 36l1.5 2.8L24 40l-2.8 1.1L20 44l-1.1-2.9L16 40l2.9-1.2L20 36z" />
          <path d="M46 38l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
          <path d="M34 34l1.2 2.4L38 38l-2.8 1.1L34 42l-1.2-2.9L30 38l2.8-1.2L34 34z" />
        </g>
      )}

      {v === "dots" && (
        <g fill="#fff" opacity="0.8">
          {[18, 24, 30, 36, 42].map((x, i) => (
            <circle key={i} cx={x} cy={38} r="1.6" />
          ))}
          {[21, 27, 33, 39].map((x, i) => (
            <circle key={`${x}-${i}`} cx={x} cy={44} r="1.6" />
          ))}
        </g>
      )}

      {v === "stripes" && (
        <g fill="#ffffff" opacity="0.35">
          <rect x="16" y="26" width="2" height="22" />
          <rect x="22" y="26" width="2" height="22" />
          <rect x="40" y="26" width="2" height="22" />
          <rect x="46" y="26" width="2" height="22" />
        </g>
      )}

      {v === "ribbon" && (
        <path
          d="M22 20c2 0 5 1 8 4 3-3 6-4 8-4 3 0 5 1.5 5 4 0 3-3 5-7 3-2-1-4-3-6-3s-4 2-6 3c-4 2-7 0-7-3 0-2.5 2-4 5-4z"
          fill={ribbon}
        />
      )}

      {v === "sparkles" && (
        <g stroke="#fff" strokeWidth="1.2" strokeLinecap="round">
          <path d="M18 36h4M20 34v4" />
          <path d="M28 42h3M29.5 40.5v3" />
          <path d="M44 36h3M45.5 34.5v3" />
        </g>
      )}
    </svg>
  );
}
