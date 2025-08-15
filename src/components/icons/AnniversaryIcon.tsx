// src/components/icons/occasions/AnniversaryIcon.tsx
import * as React from "react";
type Props = { className?: string; primary?: string; secondary?: string };
export default function AnniversaryIcon({ className, primary="#EA580C", secondary="#F472B6" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M20 34c0-6 8-10 12-3 4-7 12-3 12 3 0 9-12 14-12 14S20 43 20 34z" fill={secondary}/>
      <circle cx="40" cy="23" r="4" stroke={primary} strokeWidth="3"/>
    </svg>
  );
}
