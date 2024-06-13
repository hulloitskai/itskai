import type { SetupOptions } from "@inertiajs/react/types/createInertiaApp";
import type { SharedPageProps } from "~/types";

export type SetupAppOptions = Omit<SetupOptions<null, SharedPageProps>, "el">;
