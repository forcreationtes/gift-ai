"use client";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import GiftBoxIcon from "./icons/GiftBoxIcon";
import { OCCASION_THEMES } from "./occasionThemes";

export default function OccasionSelectWithIcons({
  value, onChange, label = "Occasion",
}: { value: Occasion; onChange: (o: Occasion) => void; label?: string }) {
  const items = Object.keys(OCCASION_THEMES) as Occasion[];

  return (
    <div className="w-full">
      <label className="mb-1 block text-sm text-neutral-200">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white/80 px-4 py-3 text-left shadow backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <GiftBoxIcon size={28} theme={OCCASION_THEMES[value]} />
              <span>{value}</span>
            </div>
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-xl bg-white p-2 shadow-xl">
              {items.map((name) => {
                const theme = OCCASION_THEMES[name];
                return (
                  <Listbox.Option
                    key={name}
                    value={name}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-neutral-100"
                  >
                    <GiftBoxIcon size={32} theme={theme} />
                    <span>{name}</span>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
