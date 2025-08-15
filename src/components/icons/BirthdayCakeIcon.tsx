// src/components/icons/occasions/BirthdayCakeIcon.tsx
import * as React from "react";
type Props = { className?: string; primary?: string; secondary?: string; accent?: string };
export default function BirthdayCakeIcon({ className, primary="#F59E0B", secondary="#FDE68A", accent="#EF4444" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <rect x="14" y="34" width="36" height="16" rx="3" fill={primary}/>
      <rect x="18" y="28" width="28" height="8" rx="2" fill={secondary}/>
      <path d="M32 18v8" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 14c0 2-2 4-2 4h4s-2-2-2-4z" fill={accent}/>
    </svg>
  );
}
