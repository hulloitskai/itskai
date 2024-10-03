// == Polyfills
import "requestidlecallback-polyfill";

import { createInertiaApp } from "@inertiajs/react";
import { reactErrorHandler } from "@sentry/react";
import { createRoot, hydrateRoot } from "react-dom/client";

import AppWrapper from "~/components/AppWrapper";
import { setupActiveStorage } from "~/helpers/activestorage";
import { setupFetch } from "~/helpers/fetch";
import { setupFullStory } from "~/helpers/fullstory";
import {
  type PageComponent,
  parsePageImports,
  setupInertia,
} from "~/helpers/inertia";
import { preparePage } from "~/helpers/inertia/page/client";
import { setupLuxon } from "~/helpers/luxon";
import { setupSentry } from "~/helpers/sentry";

// == Setup
setupInertia();
setupFetch();
setupLuxon();
setupActiveStorage();
setupSentry();
setupFullStory();

// == Pages
const pageImports = import.meta.glob("~/pages/*.tsx", {
  import: "default",
}) as Record<string, () => Promise<PageComponent>>;
const pages = parsePageImports(pageImports);

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
    setup: ({ App, el, props }) => {
      const { initialPage } = props;
      const app = (
        <AppWrapper {...{ initialPage }}>
          <App {...props} />
        </AppWrapper>
      );
      if (el.hasChildNodes()) {
        hydrateRoot(el, app, {
          onRecoverableError: reactErrorHandler(),
        });
      } else {
        createRoot(el, {
          onRecoverableError: reactErrorHandler(),
        }).render(app);
      }
    },
  });
});
