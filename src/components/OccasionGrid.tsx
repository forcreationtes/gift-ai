"use client";

import { RadioGroup } from "@headlessui/react";
import GiftBoxIcon from "./icons/GiftBoxIcon";
import { OCCASION_THEMES, OccasionKey } from "./occasionThemes";
import { OCCASION_ICON_MAP } from "./icons/occasionIcons";

type Props = {
  value: OccasionKey;
  onChange: (next: OccasionKey) => void;
  label?: string;
};

export default function OccasionGrid({ value, onChange, label = "Occasion" }: Props) {
  const featuredKeys = (Object.keys(OCCASION_THEMES) as OccasionKey[]).filter(
    (k) => OCCASION_THEMES[k].featured
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {label}
      </label>

      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="sr-only">Choose an occasion</RadioGroup.Label>

        <div className="flex flex-wrap gap-3">
          {featuredKeys.map((key) => {
            const theme = OCCASION_THEMES[key];
            const Icon =
              (theme.iconId && OCCASION_ICON_MAP[theme.iconId]) || GiftBoxIcon;

            // Only show subtitle if it's different from the label
            const subtitle = key.replaceAll("_", " ");
            const showSubtitle =
              subtitle.toLowerCase() !== theme.label.toLowerCase();

            return (
              <RadioGroup.Option key={key} value={key} className="focus:outline-none">
                {({ checked }) => (
                  <button
                    type="button"
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
                      {showSubtitle && (
                        <div className="truncate text-xs text-neutral-500 capitalize">
                          {subtitle}
                        </div>
                      )}
                    </div>

                    <span
                      aria-hidden
                      className={[
                        "absolute right-2 top-2 h-2.5 w-2.5 rounded-full",
                        checked ? "bg-brand-500" : "bg-neutral-300",
                      ].join(" ")}
                    />
                  </button>
                )}
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
