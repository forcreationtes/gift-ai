// src/components/icons/occasions/GraduationCapIcon.tsx
import * as React from "react";
type Props = { className?: string; primary?: string; secondary?: string; accent?: string };
export default function GraduationCapIcon({ className, primary="#111827", secondary="#6B7280", accent="#F59E0B" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M10 26l22-10 22 10-22 10L10 26z" fill={primary}/>
      <path d="M20 30v8c6 5 18 5 24 0v-8" fill={secondary}/>
      <circle cx="52" cy="28" r="2.5" fill={accent}/>
      <path d="M52 30v10" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
