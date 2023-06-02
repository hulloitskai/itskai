import type { ComponentType, ReactElement } from "react";
import type { MantineColor } from "@mantine/core";

import { ScottkitSignalType } from "~/helpers/graphql";

import BreakIcon from "~icons/heroicons/hand-raised-20-solid";
import RandIcon from "~icons/heroicons/sparkles-20-solid";
import PanicIcon from "~icons/heroicons/exclamation-triangle-20-solid";

const SCOTTKIT_SIGNAL_TYPE_LABELS: Record<ScottkitSignalType, string> = {
  [ScottkitSignalType.Break]: "break;",
  [ScottkitSignalType.Rand]: "rand()",
  [ScottkitSignalType.Panic]: "panic!",
};

const SCOTTKIT_SIGNAL_TYPE_COLORS: Record<ScottkitSignalType, MantineColor> = {
  [ScottkitSignalType.Break]: "violet",
  [ScottkitSignalType.Rand]: "yellow",
  [ScottkitSignalType.Panic]: "red",
};

const SCOTTKIT_SIGNAL_TYPE_ICONS: Record<ScottkitSignalType, ComponentType> = {
  [ScottkitSignalType.Break]: BreakIcon,
  [ScottkitSignalType.Rand]: RandIcon,
  [ScottkitSignalType.Panic]: PanicIcon,
};

export const scottkitSignalTypeLabel = (type: ScottkitSignalType): string =>
  SCOTTKIT_SIGNAL_TYPE_LABELS[type];

export const scottkitSignalTypeColor = (
  type: ScottkitSignalType,
): MantineColor => SCOTTKIT_SIGNAL_TYPE_COLORS[type];

export const scottkitSignalTypeIcon = (
  type: ScottkitSignalType,
): ReactElement => {
  const Icon = SCOTTKIT_SIGNAL_TYPE_ICONS[type];
  return <Icon />;
};
