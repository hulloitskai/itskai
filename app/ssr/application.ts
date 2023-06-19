import { createElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";

import { createStylesServer, ServerStyles } from "@mantine/ssr";
import { render as renderEmail } from "@react-email/render";
import { setupLuxon } from "~/helpers/luxon";

import { PageType, pagesFromFiles, resolvePageType } from "~/helpers/inertia";
import { setupApp, preparePage } from "~/helpers/inertia/server";
import type { PageComponent } from "~/helpers/inertia";

import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";

// == Setup
setupLuxon();

// == Pages
const pages = resolve(() => {
  const files: Record<string, PageComponent> = import.meta.glob(
    "~/pages/*.tsx",
    { import: "default", eager: true },
  );
  return pagesFromFiles(files);
});

// == Emails
const emails = resolve(() => {
  const files: Record<string, PageComponent> = import.meta.glob(
    "~/emails/*.tsx",
    { import: "default", eager: true },
  );
  return pagesFromFiles(files);
});

// == Entrypoint
const stylesServer = createStylesServer();

createServer(async page => {
  const type = resolvePageType(page.component);
  let stylesMarkup: string | undefined = undefined;
  const { head, body } = await createInertiaApp({
    page,
    render: page => {
      stylesMarkup = undefined;
      switch (type) {
        case PageType.Page: {
          const html = renderToString(page);
          const styles = createElement(ServerStyles, {
            html,
            server: stylesServer,
          });
          stylesMarkup = renderToStaticMarkup(styles);
          return html;
        }
        case PageType.Email: {
          const html = renderEmail(page);
          const styles = createElement(ServerStyles, {
            html,
            server: stylesServer,
          });
          stylesMarkup = renderToStaticMarkup(styles);
          return html;
        }
      }
    },
    resolve: async name => {
      switch (type) {
        case PageType.Page: {
          const page = pages[name];
          if (!page) {
            throw new Error(`Missing page '${name}'`);
          }
          preparePage(page, type);
          return page;
        }
        case PageType.Email: {
          const email = emails[name];
          if (!email) {
            throw new Error(`Missing email '${name}'`);
          }
          preparePage(email, type);
          return email;
        }
      }
    },
    setup: setupApp,
  });
  if (stylesMarkup) {
    head.push(stylesMarkup);
  }
  return { head, body };
});
