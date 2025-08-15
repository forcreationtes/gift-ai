// src/components/icons/occasions/WeddingRingsIcon.tsx
import * as React from "react";

type Props = { className?: string; primary?: string; secondary?: string };
export default function WeddingRingsIcon({ className, primary="#F59E0B", secondary="#FDE68A" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <circle cx="26" cy="38" r="12" stroke={primary} strokeWidth="4" fill="none" />
      <circle cx="38" cy="30" r="12" stroke={secondary} strokeWidth="4" fill="none" />
      <rect x="36" y="14" width="8" height="4" rx="1.5" fill={primary}/>
      <path d="M40 14l4-6" stroke={primary} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}
