// src/components/OccasionSelectWithIcons.tsx
"use client";

import GiftBoxIcon from "./icons/GiftBoxIcon";
import { OCCASION_ICON_MAP } from "./icons/occasionIcons";
import { OCCASION_THEMES, type OccasionKey } from "./occasionThemes";

type Props = {
  value: OccasionKey;
  onChange: (o: OccasionKey) => void;
  label?: string;
};

export default function OccasionSelectWithIcons({
  value,
  onChange,
  label = "Occasion",
}: Props) {
  const items = Object.keys(OCCASION_THEMES) as OccasionKey[];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {label}
      </label>

      <div className="flex flex-wrap gap-3">
        {items
          .filter((k) => OCCASION_THEMES[k].featured)
          .map((k) => {
            const theme = OCCASION_THEMES[k];
            const Icon =
              (theme.iconId && OCCASION_ICON_MAP[theme.iconId]) || GiftBoxIcon;
            const checked = value === k;

            return (
              <button
                key={k}
                type="button"
                onClick={() => onChange(k)}
                className={[
                  "relative flex h-[72px] w-[220px] items-center gap-3 rounded-xl border bg-white p-3 text-left shadow-sm transition",
                  "dark:bg-neutral-900 dark:border-neutral-800",
                  checked
                    ? "border-brand-500 ring-2 ring-brand-400/60"
                    : "border-neutral-200 hover:border-neutral-300",
                ].join(" ")}
              >
                <Icon
                  className="h-10 w-10"
                  primary={theme.primary}
                  secondary={theme.secondary}
                  ribbon={theme.ribbon}
                />
                <div className="min-w-0">
                  <div className="truncate font-medium">{theme.label}</div>
                </div>

                <span
                  aria-hidden
                  className={[
                    "absolute right-2 top-2 h-2.5 w-2.5 rounded-full",
                    checked ? "bg-brand-500" : "bg-neutral-300",
                  ].join(" ")}
                />
              </button>
            );
          })}
      </div>
    </div>
  );
}
