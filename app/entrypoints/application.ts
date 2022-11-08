import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";

import { setupPage, setupApp, pagesFromFiles } from "~/helpers/inertia";

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
        throw new Error(`missing page '${name}'`);
      }
      const page = (await importPage()) as PageComponent;
      return setupPage(page);
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
