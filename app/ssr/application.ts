import { createElement } from "react";
import type { ReactElement } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createStylesServer, ServerStyles } from "@mantine/ssr";

import { setupApp, pagesFromFiles } from "~/helpers/inertia";
import type { PageProps } from "@inertiajs/inertia";
import { createInertiaApp } from "@inertiajs/inertia-react";
import type { InertiaAppOptionsForSSR } from "@inertiajs/inertia-react";
import createServer from "@inertiajs/server";
import type { PageComponent } from "~/helpers/inertia";

const pages = resolve(() => {
  const files = import.meta.glob("~/pages/*.tsx", {
    import: "default",
    eager: true,
  });
  return pagesFromFiles(files);
});

const stylesServer = createStylesServer();

createServer(async page => {
  let stylesMarkup = "";
  const { head, body } = await createInertiaApp({
    page,
    render: (element: ReactElement) => {
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
        throw new Error(`missing page '${name}'`);
      }
      return page as any;
    },
    setup: setupApp,
  } as InertiaAppOptionsForSSR<PageProps>);
  return { head: [...head, stylesMarkup], body };
});
