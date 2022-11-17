import type { PropsWithChildren } from "react";
import type { Page } from "@inertiajs/inertia";
import type { SharedPageProps } from "./page";

export type ProviderProps = PropsWithChildren<{
  page: Page<SharedPageProps>;
}>;
