// src/components/OccasionSelector.tsx
"use client";

import { RadioGroup, Listbox, Transition } from "@headlessui/react";
import GiftBoxIcon from "./icons/GiftBoxIcon";
import { OCCASION_THEMES, type OccasionKey } from "./occasionThemes";

// Derive lists locally so we don't depend on missing exports
const FEATURED_OCCASIONS: OccasionKey[] = (
  Object.keys(OCCASION_THEMES) as OccasionKey[]
).filter((k) => OCCASION_THEMES[k].featured);

const MORE_OCCASIONS: OccasionKey[] = (
  Object.keys(OCCASION_THEMES) as OccasionKey[]
)
  .filter((k) => !OCCASION_THEMES[k].featured)
  .sort((a, b) =>
    OCCASION_THEMES[a].label.localeCompare(OCCASION_THEMES[b].label)
  );

type Props = {
  value: OccasionKey;
  onChange: (next: OccasionKey) => void;
};

export default function OccasionSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-100">
        Occasion
      </label>

      {/* Featured row (horizontal on mobile, wraps on sm+) */}
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="sr-only">Choose an occasion</RadioGroup.Label>
        <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
          {FEATURED_OCCASIONS.map((key) => {
            const theme = OCCASION_THEMES[key];
            const isSelected = value === key;

            // Only show subtitle if different from label (prevents duplicates like "Birthday")
            const subtitle = key.replaceAll("_", " ");
            const showSubtitle =
              subtitle.toLowerCase() !== theme.label.toLowerCase();

            return (
              <RadioGroup.Option key={key} value={key} className="focus:outline-none shrink-0">
                {({ checked }) => (
                  <button
                    type="button"
                    className={[
                      "relative flex w-44 items-center gap-3 rounded-xl border bg-white p-3 text-left shadow-sm transition",
                      "dark:bg-neutral-900 dark:border-neutral-800",
                      (checked || isSelected)
                        ? "border-brand-500 ring-2 ring-brand-400/60"
                        : "border-neutral-200 hover:border-neutral-300",
                    ].join(" ")}
                    aria-pressed={checked}
                  >
                    <GiftBoxIcon className="h-10 w-10" style={{ color: theme.primary }} />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-medium">{theme.label}</span>
                      {showSubtitle && (
                        <span className="text-xs text-neutral-500 capitalize">
                          {subtitle}
                        </span>
                      )}
                    </div>
                    <span
                      aria-hidden
                      className={[
                        "absolute right-2 top-2 h-2.5 w-2.5 rounded-full",
                        (checked || isSelected) ? "bg-brand-500" : "bg-neutral-300",
                      ].join(" ")}
                    />
                  </button>
                )}
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>

      {/* More occasions (dropdown) */}
      {MORE_OCCASIONS.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="w-32 shrink-0 text-sm text-neutral-600 dark:text-neutral-300">
            More occasions
          </span>
          <Listbox value={value} onChange={onChange}>
            <div className="relative w-full">
              <Listbox.Button
                className="relative w-full cursor-default rounded-xl border border-neutral-200 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-400/60 dark:bg-neutral-900 dark:border-neutral-800"
                aria-label="More occasions"
              >
                <span className="block truncate">
                  {OCCASION_THEMES[value]?.label ?? "Select occasion"}
                </span>
              </Listbox.Button>

              <Transition
                as="div"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-neutral-200 bg-white p-1 text-sm shadow-lg dark:bg-neutral-900 dark:border-neutral-800">
                  {/* Show ALL occasions so user can switch freely */}
                  {[...FEATURED_OCCASIONS, ...MORE_OCCASIONS].map((key) => {
                    const theme = OCCASION_THEMES[key];
                    return (
                      <Listbox.Option
                        key={key}
                        value={key}
                        className={({ active }) =>
                          [
                            "relative cursor-pointer select-none rounded-lg px-3 py-2",
                            active ? "bg-neutral-100 dark:bg-neutral-800" : "",
                          ].join(" ")
                        }
                      >
                        <div className="flex items-center gap-3">
                          <GiftBoxIcon className="h-5 w-5" style={{ color: theme.primary }} />
                          <span className="block truncate">{theme.label}</span>
                        </div>
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      )}
    </div>
  );
}
