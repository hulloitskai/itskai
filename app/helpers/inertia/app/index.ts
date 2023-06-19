import type { SetupOptions } from "@inertiajs/react/types/createInertiaApp";
import type { SharedPageProps } from "~/helpers/inertia/page";

export type SetupAppOptions = Omit<SetupOptions<null, SharedPageProps>, "el">;
