// src/components/icons/occasions/BabyFaceIcon.tsx
import * as React from "react";
type Props = { className?: string; primary?: string; secondary?: string };

export default function BabyFaceIcon({
  className,
  primary = "currentColor",       // now inherits from CSS/text color
  secondary = "currentColor",     // also inherits
}: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      {/* Head */}
      <circle cx="32" cy="35" r="14" fill={primary} />
      {/* Eyes */}
      <circle cx="26" cy="33" r="2.5" fill="#111" />
      <circle cx="38" cy="33" r="2.5" fill="#111" />
      {/* Smile */}
      <path
        d="M26 40c3 3 9 3 12 0"
        stroke="#111"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Curl of hair */}
      <path
        d="M28 20c4-6 10-6 12-2"
        stroke={secondary}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
