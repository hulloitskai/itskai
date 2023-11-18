import type { ReactElement } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AppWrapper from "~/components/AppWrapper";

import type { PageComponent, SharedPageProps } from "~/helpers/inertia";
import type { SetupAppOptions } from "~/helpers/inertia";
import { preparePage } from "~/helpers/inertia/page/client";
import { parsePageImports } from "~/helpers/inertia";

export const setupApp = ({ App, props }: SetupAppOptions): ReactElement => {
  const { initialPage } = props;
  return (
    <AppWrapper {...{ initialPage }}>
      <App {...props} />
    </AppWrapper>
  );
};

export const initializeApp = (
  pageImports: Record<string, () => Promise<PageComponent>>,
) => {
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
};
