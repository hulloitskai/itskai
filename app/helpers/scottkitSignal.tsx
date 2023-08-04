import type { ComponentType, ReactElement } from "react";
import type { MantineColor } from "@mantine/core";

import { ScottkitSignal } from "~/helpers/graphql";

import BreakIcon from "~icons/heroicons/hand-raised-20-solid";
import RandIcon from "~icons/heroicons/sparkles-20-solid";
import PanicIcon from "~icons/heroicons/exclamation-triangle-20-solid";

const SCOTTKIT_SIGNAL_LABELS: Record<ScottkitSignal, string> = {
  [ScottkitSignal.Break]: "break;",
  [ScottkitSignal.Rand]: "rand()",
  [ScottkitSignal.Panic]: "panic!",
};

const SCOTTKIT_SIGNAL_COLORS: Record<ScottkitSignal, MantineColor> = {
  [ScottkitSignal.Break]: "violet",
  [ScottkitSignal.Rand]: "yellow",
  [ScottkitSignal.Panic]: "red",
};

const SCOTTKIT_SIGNAL_ICONS: Record<ScottkitSignal, ComponentType> = {
  [ScottkitSignal.Break]: BreakIcon,
  [ScottkitSignal.Rand]: RandIcon,
  [ScottkitSignal.Panic]: PanicIcon,
};

export const scottkitSignalLabel = (type: ScottkitSignal): string =>
  SCOTTKIT_SIGNAL_LABELS[type];

export const scottkitSignalColor = (type: ScottkitSignal): MantineColor =>
  SCOTTKIT_SIGNAL_COLORS[type];

export const scottkitSignalIcon = (type: ScottkitSignal): ReactElement => {
  const Icon = SCOTTKIT_SIGNAL_ICONS[type];
  return <Icon />;
};
