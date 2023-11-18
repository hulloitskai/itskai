import { renderToString as renderPage } from "react-dom/server";

import { render as renderEmail } from "@react-email/render";
import { setupLuxon } from "~/helpers/luxon";

import { PageType, parsePageImports, resolvePageType } from "~/helpers/inertia";
import { preparePage, setupApp } from "~/helpers/inertia/server";
import type { PageComponent } from "~/helpers/inertia";

import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";

// == Setup
setupLuxon();

// == Pages
const pageImports: Record<string, PageComponent> = import.meta.glob(
  "~/pages/**/*.tsx",
  { import: "default", eager: true },
);
const pages = parsePageImports(pageImports);

// == Emails
const emailImports: Record<string, PageComponent> = import.meta.glob(
  "~/emails/**/*.tsx",
  { import: "default", eager: true },
);
const emails = parsePageImports(emailImports);

// == Entrypoint
const port = process.env.INERTIA_PORT
  ? parseInt(process.env.INERTIA_PORT)
  : 13714;
createServer(async page => {
  const type = resolvePageType(page.component);
  return createInertiaApp({
    page,
    render: page => {
      switch (type) {
        case PageType.Page: {
          return renderPage(page);
        }
        case PageType.Email: {
          return renderEmail(page);
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
}, port);
