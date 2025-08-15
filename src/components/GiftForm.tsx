// src/components/GiftForm.tsx
"use client";

import { useEffect, useState } from "react";
import OccasionGrid from "./OccasionGrid";
import { OCCASION_THEMES, OccasionKey } from "./occasionThemes";
import OccasionMoreSelect, { OccasionSelection } from "./OccasionMoreSelect";
import InterestMultiCombobox from "./InterestMultiCombobox";
import ResultsGrid from "./ResultsGrid";
import type { GiftIdea, GiftQuery } from "@/types/gifts";

const STORAGE_KEY = "gift-form-v1";

export default function GiftForm() {
  // Featured pills (primary)
  const [occasion, setOccasion] = useState<OccasionKey>("secret_santa");

  // Combobox selection (free text or known)
  const [moreOccasion, setMoreOccasion] = useState<OccasionSelection>({
    label: "",
    isCustom: true,
  });

  // Interests (multi-select, up to 5; 3 recommended)
  const [interests, setInterests] = useState<string[]>([]);

  // Demographics
  const [ageGroup, setAgeGroup] = useState("Adult (25–34)");
  const [identity, setIdentity] = useState("Unspecified"); // formerly "gender"
  const [budget, setBudget] = useState("$0–$25");

  // Results + UI state
  const [results, setResults] = useState<GiftIdea[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.occasionKey && OCCASION_THEMES[s.occasionKey as OccasionKey]) {
        setOccasion(s.occasionKey as OccasionKey);
      }
      if (s.moreOccasion && typeof s.moreOccasion.label === "string") {
        setMoreOccasion(s.moreOccasion);
      }
      if (Array.isArray(s.interests)) setInterests(s.interests.slice(0, 5));
      if (s.ageGroup) setAgeGroup(s.ageGroup);
      if (s.identity) setIdentity(s.identity);
      if (s.budget) setBudget(s.budget);
    } catch {
      // ignore corrupted state
    }
  }, []);

  // Persist state
  useEffect(() => {
    const toSave = {
      occasionKey: occasion,
      moreOccasion,
      interests,
      ageGroup,
      identity,
      budget,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [occasion, moreOccasion, interests, ageGroup, identity, budget]);

  // ---- Derived values & validation ----
  const primaryOccasionLabel = OCCASION_THEMES[occasion]?.label ?? "";
  const typed = moreOccasion.label?.trim() ?? "";
  const finalOccasion = typed || primaryOccasionLabel;
  const isValid = finalOccasion.length > 0 && interests.length >= 1;

  // ---- Submit handler ----
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const payload: GiftQuery = {
      occasion: finalOccasion,
      interests,
      ageGroup,
      identity,
      budget,
    };

    try {
      const res = await fetch("/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResults(data.ideas as GiftIdea[]);
    } catch (err) {
      console.error(err);
      setError("Sorry—couldn’t fetch gift ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Featured Occasion grid */}
      <OccasionGrid value={occasion} onChange={setOccasion} label="Occasion" />

      {/* More occasions (Combobox with type-ahead + free text) */}
      <OccasionMoreSelect
        onChange={(sel) => setMoreOccasion(sel)}
        label="More occasions"
        placeholder="Type an occasion… e.g., Housewarming"
      />

      {/* Interests (multi-select combobox) */}
      <InterestMultiCombobox
        value={interests}
        onChange={setInterests}
        label="Interests"
        placeholder="Type and press Enter… (recommended 3, max 5)"
        max={5}
        recommended={3}
      />

      {/* Age / Identity / Budget */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium">Age Group</label>
          <select
            className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option>Teen (13–17)</option>
            <option>Young Adult (18–24)</option>
            <option>Adult (25–34)</option>
            <option>Adult (35–44)</option>
            <option>Adult (45–64)</option>
            <option>Senior (65+)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Identity</label>
          <select
            className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          >
            <option>Unspecified</option>
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Budget</label>
          <select
            className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option>$0–$25</option>
            <option>$25–$50</option>
            <option>$50–$100</option>
            <option>$100–$200</option>
            <option>$200+</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!isValid || loading}
          title={!isValid ? "Pick an occasion and add at least one interest" : undefined}
          className="mt-2 h-12 w-56 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Finding…" : "🎁 Find Gifts"}
        </button>
      </div>

      {/* Errors / Results */}
      {error && <p className="text-center text-sm text-red-600">{error}</p>}

      {results && <ResultsGrid items={results} onReset={() => setResults(null)} />}
    </form>
  );
}
