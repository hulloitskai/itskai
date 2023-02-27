import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

import { setupApp, pagesFromFiles, wrapPage } from "~/helpers/inertia";
import type { PageComponent } from "~/helpers/inertia";

const pages = resolve(() => {
  const files = import.meta.glob("~/pages/*.tsx", {
    import: "default",
  });
  return pagesFromFiles(files);
});

document.addEventListener("DOMContentLoaded", () => {
  createInertiaApp({
    resolve: async name => {
      const importPage = pages[name];
      if (!importPage) {
        throw new Error(`Missing page '${name}'`);
      }
      const page = (await importPage()) as PageComponent | undefined;
      if (!page) {
        throw new Error(`Missing default export for page '${name}'`);
      }
      return wrapPage(page);
    },
    setup: ({ el, App, props }) => {
      const app = setupApp({ App, props });
      if (el.hasChildNodes()) {
        hydrateRoot(el, app);
      } else {
        createRoot(el).render(app);
      }
    },
  });
});
