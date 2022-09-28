import "./server-bundle-polyfills";
import "./server-bundle-generated";

import ReactOnRails from "react-on-rails";
import { createElement } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { createStylesServer, ServerStyles } from "@mantine/ssr";

// Build renderers from pure components.
const components = ReactOnRails.registeredComponents();
const renderers = {};
const stylesServer = createStylesServer();
Array.from(components.keys()).forEach(key => {
  const { component } = components.get(key);
  if (!component.renderFunction) {
    const renderer = props => {
      const componentHtml = renderToString(createElement(component, props));
      const stylesHtml = renderToStaticMarkup(
        createElement(ServerStyles, {
          server: stylesServer,
          html: componentHtml,
        }),
      );
      return {
        renderedHtml: {
          componentHtml,
          stylesHtml,
        },
      };
    };
    renderer.renderFunction = true;
    renderers[key] = renderer;
    components.delete(key);
  }
});
ReactOnRails.register(renderers);
