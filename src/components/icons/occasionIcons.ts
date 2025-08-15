import type * as React from "react";

import WeddingRingsIcon from "./WeddingRingsIcon";
import BabyFaceIcon from "./BabyFaceIcon";
import BirthdayCakeIcon from "./BirthdayCakeIcon";
import GraduationCapIcon from "./GraduationCapIcon";
import AnniversaryIcon from "./AnniversaryIcon";
import GiftBoxIcon from "./GiftBoxIcon"; // fallback (same folder)

export type OccasionIconId =
  | "gift"
  | "rings"
  | "baby"
  | "cake"
  | "cap"
  | "anniversary";

type IconProps = {
  className?: string;
  primary?: string;
  secondary?: string;
  ribbon?: string;
};

export const OCCASION_ICON_MAP: Record<OccasionIconId, React.FC<IconProps>> = {
  gift: GiftBoxIcon,
  rings: WeddingRingsIcon,
  baby: BabyFaceIcon,
  cake: BirthdayCakeIcon,
  cap: GraduationCapIcon,
  anniversary: AnniversaryIcon,
};
