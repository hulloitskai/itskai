import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

import { pagesFromFiles } from "~/helpers/inertia";
import { preparePage, setupApp } from "~/helpers/inertia/client";
import type { PageComponent, SharedPageProps } from "~/helpers/inertia";

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
  }) as Record<string, () => Promise<PageComponent>>;
  return pagesFromFiles(files);
});

// == Entrypoint
document.addEventListener("DOMContentLoaded", () => {
  createInertiaApp<SharedPageProps>({
    progress: false,
    resolve: async name => {
      const importPage = pages[name];
      if (!importPage) {
        throw new Error(`Missing page '${name}'`);
      }
      const component = await importPage();
      if (!component) {
        throw new Error(`Missing default export for page '${name}'`);
      }
      preparePage(component);
      return component;
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
