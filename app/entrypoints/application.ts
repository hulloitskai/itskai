import type { PageComponent } from "~/helpers/inertia";
import { initializeApp } from "~/helpers/inertia/client";

import "~/helpers/dependencies";

const pageImports = import.meta.glob("~/pages/*.tsx", {
  import: "default",
}) as Record<string, () => Promise<PageComponent>>;

initializeApp(pageImports);
