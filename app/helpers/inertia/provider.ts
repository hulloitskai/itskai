import type { PropsWithChildren } from "react";
import type { Page } from "@inertiajs/core";
import type { SharedPageProps } from "./page";

export type ProviderProps = PropsWithChildren<{
  page: Page<SharedPageProps>;
}>;
