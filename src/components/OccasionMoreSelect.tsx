"use client";

import { Fragment, useMemo, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import GiftBoxIcon from "./icons/GiftBoxIcon";
import { OCCASION_THEMES, OccasionKey } from "./occasionThemes";

// What the parent receives on change
export type OccasionSelection = {
  key?: OccasionKey;     // present if a known occasion
  label: string;         // always present (either known label or custom text)
  isCustom: boolean;     // true when user typed a custom label
};

type Props = {
  /** If you want to preselect a known key, pass it here. Otherwise leave undefined and use `initialText` */
  valueKey?: OccasionKey;
  /** Optional initial text for custom/free entry */
  initialText?: string;
  /** Called whenever selection changes (either choosing from the list or typing free text) */
  onChange: (sel: OccasionSelection) => void;
  /** Field label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** If true, only show non-featured from OCCASION_THEMES (like your “More occasions” section) */
  hideFeatured?: boolean;
};

export default function OccasionMoreSelect({
  valueKey,
  initialText = "",
  onChange,
  label = "More occasions",
  placeholder = "Type an occasion… e.g., Housewarming",
  hideFeatured = true,
}: Props) {
  // Build list of options
  const options = useMemo(() => {
    const keys = Object.keys(OCCASION_THEMES) as OccasionKey[];
    const filtered = hideFeatured ? keys.filter((k) => !OCCASION_THEMES[k].featured) : keys;
    return filtered.map((k) => ({ key: k, label: OCCASION_THEMES[k].label }));
  }, [hideFeatured]);

  // Local input text (supports free typing)
  const [query, setQuery] = useState<string>(initialText);

  // Current selected option if it matches a known key
  const [selectedKey, setSelectedKey] = useState<OccasionKey | undefined>(valueKey);

  // Keep parent informed on mount/prop changes
  useEffect(() => {
    const matched = selectedKey
      ? { key: selectedKey, label: OCCASION_THEMES[selectedKey].label, isCustom: false }
      : { label: query, isCustom: true as const };
    onChange(matched as OccasionSelection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey, query]);

  // Filter options by query (case-insensitive)
  const filtered =
    query === ""
      ? options
      : options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  // What to show in the input
  const inputDisplay = selectedKey ? OCCASION_THEMES[selectedKey].label : query;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {label}
      </label>

      <Combobox
        value={selectedKey ?? null}
        onChange={(next: OccasionKey | null) => {
          setSelectedKey(next ?? undefined);
          if (next) setQuery(OCCASION_THEMES[next].label); // sync text when choosing a known option
        }}
      >
        <div className="relative">
          <div className="relative w-full cursor-text overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-left">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <GiftBoxIcon className="h-4 w-4 opacity-70" />
            </div>

            <Combobox.Input
              className="w-full pl-9 pr-9 py-2 focus:outline-none bg-transparent"
              displayValue={() => inputDisplay}
              placeholder={placeholder}
              onChange={(e) => {
                const text = e.target.value;
                setQuery(text);
                setSelectedKey(undefined); // switch to custom whenever user types
              }}
            />

            {/* Clear button when custom text is present */}
            {query && !selectedKey && (
              <button
                type="button"
                className="absolute inset-y-0 right-2 my-auto h-7 rounded px-2 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setQuery("")}
                aria-label="Clear"
              >
                Clear
              </button>
            )}
          </div>

          <Transition
            as="div"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg focus:outline-none">
              {/* Known options */}
              {filtered.map((o) => (
                <Combobox.Option
                  key={o.key}
                  value={o.key}
                  className="cursor-pointer px-3 py-2 ui-active:bg-neutral-50 ui-active:dark:bg-neutral-800"
                >
                  {o.label}
                </Combobox.Option>
              ))}

              {/* “Use …” free-text option (only when no exact label match or user is typing) */}
              {query.trim() && (!filtered.length || !filtered.some((o) => o.label === query)) && (
                <Combobox.Option
                  value={null} // keep selection as custom
                  onClick={() => {
                    setSelectedKey(undefined);
                    // query already holds the custom text
                  }}
                  className="cursor-pointer px-3 py-2 border-t border-neutral-100 dark:border-neutral-800 ui-active:bg-neutral-50 ui-active:dark:bg-neutral-800"
                >
                  Use “{query.trim()}”
                </Combobox.Option>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      {/* Tiny helper text */}
      <p className="text-xs text-neutral-500">
        Start typing to search, or enter a custom occasion and choose <em>Use “…”.</em>
      </p>
    </div>
  );
}
