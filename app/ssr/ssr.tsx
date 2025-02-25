import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { type SetupOptions } from "@inertiajs/react/types/createInertiaApp";
import { renderToString } from "react-dom/server";

import AppWrapper from "~/components/AppWrapper";
import EmailWrapper from "~/components/EmailWrapper";
import {
  type PageComponent,
  PageType,
  parsePageImports,
  resolvePageType,
} from "~/helpers/inertia";
import { preparePage } from "~/helpers/inertia/page/server";
import { setupLuxon } from "~/helpers/luxon";

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
    render: renderToString,
    resolve: name => {
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
    setup: ({ App, props }: SetupOptions<null, SharedPageProps>) => {
      const { initialPage } = props;
      const pageType = resolvePageType(initialPage.component);
      const app = <App {...props} />;
      switch (pageType) {
        case PageType.Page:
          return <AppWrapper {...{ initialPage }}>{app}</AppWrapper>;
        case PageType.Email:
          return <EmailWrapper>{app}</EmailWrapper>;
      }
    },
  });
}, port);
