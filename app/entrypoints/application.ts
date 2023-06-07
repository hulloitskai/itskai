import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

import type { PageComponent } from "~/helpers/inertia";
import { setupApp, pagesFromFiles, preparePage } from "~/helpers/inertia";

import { setupActiveStorage } from "~/helpers/activestorage";
import { setupLuxon } from "~/helpers/luxon";

// == Polyfills
import "requestidlecallback-polyfill";

// == Setup
setupActiveStorage();
setupLuxon();

// == Pages
const pages = resolve(() => {
  const files = import.meta.glob("~/pages/*.tsx", {
    import: "default",
  });
  return pagesFromFiles(files);
});

// == Entrypoint
document.addEventListener("DOMContentLoaded", () => {
  createInertiaApp({
    progress: false,
    resolve: async name => {
      const importPage = pages[name];
      if (!importPage) {
        throw new Error(`Missing page '${name}'`);
      }
      const page = (await importPage()) as PageComponent | undefined;
      if (!page) {
        throw new Error(`Missing default export for page '${name}'`);
      }
      preparePage(page);
      return page;
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
