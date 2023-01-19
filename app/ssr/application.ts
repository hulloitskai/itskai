import { createElement } from "react";
import type { ReactElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createStylesServer, ServerStyles } from "@mantine/ssr";

import { setupApp, pagesFromFiles } from "~/helpers/inertia";
import type { PageComponent } from "~/helpers/inertia";

import createServer from "@inertiajs/react/server";
import { createInertiaApp } from "@inertiajs/react";
import type { Page, PageProps } from "@inertiajs/core";

const pages = resolve(() => {
  const files = import.meta.glob("~/pages/*.tsx", {
    import: "default",
    eager: true,
  });
  return pagesFromFiles(files);
});

const stylesServer = createStylesServer();

createServer(async (page: Page<PageProps>) => {
  let stylesMarkup = "";
  const { head, body } = await createInertiaApp({
    page,
    render: (element: ReactElement): string => {
      const content = renderToString(element);
      const styles = createElement(ServerStyles, {
        html: content,
        server: stylesServer,
      });
      stylesMarkup = renderToStaticMarkup(styles);
      return content;
    },
    resolve: async name => {
      const page = pages[name] as PageComponent | undefined;
      if (!page) {
        throw new Error(`Missing page '${name}'`);
      }
      return page;
    },
    progress: undefined,
    setup: setupApp,
  });
  return { head: [...head, stylesMarkup], body };
});
