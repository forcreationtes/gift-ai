// src/components/occasionThemes.ts
import type { GiftBoxVariant } from "./icons/GiftBoxIcon";
import type { OccasionIconId } from "./icons/occasionIcons";

export type OccasionKey =
  | "secret_santa"
  | "birthday"
  | "anniversary"
  | "wedding"
  | "baby_shower"
  | "graduation"
  | "housewarming"
  | "valentines_day"
  | "mothers_day"
  | "fathers_day"
  | "christmas"
  | "hanukkah"
  | "retirement"
  | "just_because"
  | "congratulations"
  | "thank_you"
  | "get_well"
  | "new_job";

export type OccasionTheme = {
  label: string;
  primary: string;
  secondary: string;
  ribbon: string;
  shadow?: string;
  iconVariant?: GiftBoxVariant; // fallback for default GiftBox
  featured?: boolean;
  /** Which icon to render in the grid */
  iconId?: OccasionIconId;
};

export const OCCASION_THEMES: Record<OccasionKey, OccasionTheme> = {
  secret_santa: {
    label: "Secret Santa",
    primary: "#8B5CF6",
    secondary: "#FDE68A",
    ribbon: "#FB7185",
    iconVariant: "stars",
    featured: false,
    iconId: "gift", // 🎁
  },
  birthday: {
    label: "Birthday",
    primary: "#F59E0B",
    secondary: "#FDE68A",
    ribbon: "#EF4444",
    iconVariant: "dots",
    featured: true,
    iconId: "cake", // 🎂
  },
  anniversary: {
    label: "Anniversary",
    primary: "#EA580C",
    secondary: "#FED7AA",
    ribbon: "#10B981",
    iconVariant: "ribbon",
    featured: true,
    iconId: "anniversary", // ❤️
  },
  wedding: {
    label: "Wedding",
    primary: "#60A5FA",
    secondary: "#DBEAFE",
    ribbon: "#F472B6",
    iconVariant: "sparkles",
    featured: true,
    iconId: "rings", // 💍
  },
  baby_shower: {
    label: "Baby Shower",
    primary: "#93C5FD",
    secondary: "#E0F2FE",
    ribbon: "#F97316",
    iconVariant: "dots",
    featured: true,
    iconId: "baby", // 👶
  },
  graduation: {
    label: "Graduation",
    primary: "#111827",
    secondary: "#6B7280",
    ribbon: "#F59E0B",
    iconVariant: "stripes",
    featured: true,
    iconId: "cap", // 🎓
  },

  // === New Featured Occasions ===
  congratulations: {
    label: "Congratulations",
    primary: "#16A34A",
    secondary: "#BBF7D0",
    ribbon: "#FACC15",
    iconVariant: "stars",
    featured: true,
    iconId: "gift", // fallback (was "trophy")
  },
  thank_you: {
    label: "Thank You",
    primary: "#F59E0B",
    secondary: "#FEF3C7",
    ribbon: "#10B981",
    iconVariant: "ribbon",
    featured: true,
    iconId: "gift", // fallback (was "handshake")
  },
  get_well: {
    label: "Get Well Soon",
    primary: "#3B82F6",
    secondary: "#DBEAFE",
    ribbon: "#F43F5E",
    iconVariant: "sparkles",
    featured: true,
    iconId: "gift", // fallback (was "heart")
  },
  new_job: {
    label: "New Job / Promotion",
    primary: "#6366F1",
    secondary: "#E0E7FF",
    ribbon: "#F59E0B",
    iconVariant: "plain",
    featured: true,
    iconId: "gift", // fallback (was "briefcase")
  },

  // === Non-featured ===
  housewarming: {
    label: "Housewarming",
    primary: "#34D399",
    secondary: "#D1FAE5",
    ribbon: "#059669",
    iconVariant: "plain",
    iconId: "gift",
  },
  valentines_day: {
    label: "Valentine's Day",
    primary: "#EF4444",
    secondary: "#FECACA",
    ribbon: "#F59E0B",
    iconVariant: "ribbon",
    iconId: "gift",
  },
  mothers_day: {
    label: "Mother's Day",
    primary: "#F472B6",
    secondary: "#FCE7F3",
    ribbon: "#FB7185",
    iconVariant: "sparkles",
    iconId: "gift",
  },
  fathers_day: {
    label: "Father's Day",
    primary: "#1F2937",
    secondary: "#9CA3AF",
    ribbon: "#60A5FA",
    iconVariant: "stripes",
    iconId: "gift",
  },
  christmas: {
    label: "Christmas",
    primary: "#059669",
    secondary: "#BBF7D0",
    ribbon: "#EF4444",
    iconVariant: "stars",
    iconId: "gift",
  },
  hanukkah: {
    label: "Hanukkah",
    primary: "#2563EB",
    secondary: "#DBEAFE",
    ribbon: "#F59E0B",
    iconVariant: "dots",
    iconId: "gift",
  },
  retirement: {
    label: "Retirement",
    primary: "#6366F1",
    secondary: "#E0E7FF",
    ribbon: "#10B981",
    iconVariant: "plain",
    iconId: "gift",
  },
  just_because: {
    label: "Just Because",
    primary: "#A78BFA",
    secondary: "#E9D5FF",
    ribbon: "#F472B6",
    iconVariant: "sparkles",
    iconId: "gift",
  },
};
