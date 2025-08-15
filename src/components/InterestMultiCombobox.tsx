"use client";

import { useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

// Seed suggestions (expand anytime)
const SUGGESTED_INTERESTS = [
  "coffee","tea","hiking","camping","gym","yoga","running",
  "tech","gadgets","gaming","board games","books","fiction",
  "non-fiction","mystery","romance","cookbooks","music",
  "jazz","hip hop","classical","travel","photography",
  "cooking","baking","wine","whiskey","craft beer","fashion",
  "skincare","makeup","DIY","home decor","plants","sports",
  "basketball","soccer","NFL","NHL","F1","cars",
  "art","drawing","painting","digital art","anime",
  "film","TV","comedy","cats","dogs",
];

type Props = {
  label?: string;
  placeholder?: string;
  /** hard cap */
  max?: number;           // default 5
  /** soft guidance (for coloring) */
  recommended?: number;   // default 3
  value: string[];
  onChange: (next: string[]) => void;
};

export default function InterestMultiCombobox({
  label = "Interests",
  placeholder = "Type and press Enter… (recommended 3, max 5)",
  max = 5,
  recommended = 3,
  value,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");

  const options = useMemo(() => {
    const lowerSel = new Set(value.map((v) => v.toLowerCase()));
    return SUGGESTED_INTERESTS.filter((s) => !lowerSel.has(s.toLowerCase()));
  }, [value]);

  const filtered =
    query.trim() === ""
      ? options
      : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  const canAddMore = value.length < max;

  function addInterest(raw: string) {
    const text = raw.trim();
    if (!text || !canAddMore) return;
    const exists = value.some((v) => v.toLowerCase() === text.toLowerCase());
    if (exists) return;
    onChange([...value, text]);
    setQuery("");
  }

  function removeInterest(idx: number) {
    const next = [...value];
    next.splice(idx, 1);
    onChange(next);
  }

  const effectiveRecommended = Math.min(recommended, max);
  const countClass =
    value.length >= max
      ? "text-red-600"
      : value.length > effectiveRecommended
      ? "text-amber-600"
      : "text-neutral-500";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-100">
        {label}
      </label>

      {/* Chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((chip, i) => (
            <span
              key={`${chip}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1 text-sm"
            >
              {chip}
              <button
                type="button"
                onClick={() => removeInterest(i)}
                className="rounded px-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label={`Remove ${chip}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <Combobox value={null} onChange={() => {}}>
        <div className="relative">
          <div className="relative w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <Combobox.Input
              className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (query && canAddMore) addInterest(query);
                }
                if (e.key === "Backspace" && !query && value.length > 0) {
                  removeInterest(value.length - 1);
                }
              }}
            />
          </div>

          <Transition
            as="div"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {filtered.length > 0 && canAddMore && (
              <Combobox.Options className="absolute z-10 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg focus:outline-none">
                {filtered.map((o) => (
                  <Combobox.Option
                    key={o}
                    value={o}
                    onClick={() => addInterest(o)}
                    className="cursor-pointer px-3 py-2 ui-active:bg-neutral-50 ui-active:dark:bg-neutral-800"
                  >
                    {o}
                  </Combobox.Option>
                ))}
                {query.trim() &&
                  !filtered.some((o) => o.toLowerCase() === query.toLowerCase()) && (
                    <Combobox.Option
                      value={query}
                      onClick={() => addInterest(query)}
                      className="cursor-pointer border-t border-neutral-100 dark:border-neutral-800 px-3 py-2 ui-active:bg-neutral-50 ui-active:dark:bg-neutral-800"
                    >
                      Add “{query.trim()}”
                    </Combobox.Option>
                  )}
              </Combobox.Options>
            )}
          </Transition>
        </div>
      </Combobox>

      <div className="flex items-center justify-between text-xs">
        <span className="text-neutral-500">
          {effectiveRecommended} recommended • max {max}
        </span>
        <span className={countClass}>
          {value.length}/{max}
        </span>
      </div>

      <p className="text-xs text-neutral-500">
        Type to search or add your own. Press Enter to add.
      </p>
    </div>
  );
}
