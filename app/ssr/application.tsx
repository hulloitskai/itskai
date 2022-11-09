import type { ReactElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createStylesServer, ServerStyles } from "@mantine/ssr";

import createServer from "@inertiajs/server";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { setupPage, setupApp, pagesFromFiles } from "~/helpers/inertia";

const pages = resolve(() => {
  const files = import.meta.glob("~/pages/*.tsx", {
    import: "default",
    eager: true,
  });
  return pagesFromFiles(files);
});

const stylesServer = createStylesServer();

createServer(async page => {
  let styles = "";
  const { head, body } = await createInertiaApp({
    page,
    render: (element: ReactElement) => {
      const content = renderToString(element);
      styles = renderToStaticMarkup(
        <ServerStyles html={content} server={stylesServer} />,
      );
      return content;
    },
    resolve: async name => {
      const page = pages[name];
      if (!page) {
        throw new Error(`missing page '${name}'`);
      }
      return setupPage(page);
    },
    setup: setupApp,
  });
  return { head: [...head, styles], body };
});
