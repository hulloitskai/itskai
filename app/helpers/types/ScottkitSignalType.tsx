import type { ComponentType, ReactElement } from "react";
import type { MantineColor } from "@mantine/core";

import { ScottkitSignalType } from "~/helpers/graphql";

import BreakIcon from "~icons/heroicons/hand-raised-20-solid";
import RandIcon from "~icons/heroicons/sparkles-20-solid";
import PanicIcon from "~icons/heroicons/exclamation-triangle-20-solid";

const ScottkitSignalTypeLabels: Record<ScottkitSignalType, string> = {
  [ScottkitSignalType.Break]: "break;",
  [ScottkitSignalType.Rand]: "rand()",
  [ScottkitSignalType.Panic]: "panic!",
};

const ScottkitSignalTypeColors: Record<ScottkitSignalType, MantineColor> = {
  [ScottkitSignalType.Break]: "violet",
  [ScottkitSignalType.Rand]: "yellow",
  [ScottkitSignalType.Panic]: "red",
};

const ScottkitSignalTypeIcons: Record<ScottkitSignalType, ComponentType> = {
  [ScottkitSignalType.Break]: BreakIcon,
  [ScottkitSignalType.Rand]: RandIcon,
  [ScottkitSignalType.Panic]: PanicIcon,
};

export const scottkitSignalTypeLabel = (type: ScottkitSignalType): string =>
  ScottkitSignalTypeLabels[type];

export const scottkitSignalTypeColor = (
  type: ScottkitSignalType,
): MantineColor => ScottkitSignalTypeColors[type];

export const scottkitSignalTypeIcon = (
  type: ScottkitSignalType,
): ReactElement => {
  const Icon = ScottkitSignalTypeIcons[type];
  return <Icon />;
};
