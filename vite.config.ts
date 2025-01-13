import spotlightSidecarPlugin from "@spotlightjs/sidecar/vite-plugin";
import spotlightPlugin from "@spotlightjs/spotlight/vite-plugin";
import reactPlugin from "@vitejs/plugin-react";
import { join } from "path";
import { visualizer as visualizerPlugin } from "rollup-plugin-visualizer";
import autoImportPlugin from "unplugin-auto-import/vite";
import iconsPlugin from "unplugin-icons/vite";
import { type PluginOption } from "vite";
import { defineConfig } from "vite";
import environmentPlugin from "vite-plugin-environment";
import fullReloadPlugin from "vite-plugin-full-reload";
import { isoImport as isomorphicImportPlugin } from "vite-plugin-iso-import";
import rubyPlugin from "vite-plugin-ruby";

import { imports } from "./config/auto-import";

export default defineConfig(() => {
  // == Plugins
  const plugins: PluginOption = [
    environmentPlugin(
      { RAILS_ENV: "development" },
      { defineOn: "import.meta.env" },
    ),
    isomorphicImportPlugin(),
    autoImportPlugin({
      dts: join(__dirname, "typings/generated/auto-import.d.ts"),
      imports,
    }),
    iconsPlugin({ compiler: "jsx", jsx: "react" }),
    reactPlugin(),
    rubyPlugin(),
    fullReloadPlugin(
      [
        "config/routes.rb",
        "config/routes/**/*.rb",
        "app/models/**/*.rb",
        "app/serializers/**/*.rb",
        "app/views/**/*.{html,html.erb}",
        "app/controllers/**/*.rb",
      ],
      { delay: 200 },
    ),
    spotlightSidecarPlugin(),
    spotlightPlugin(),
  ];

  // == Visualize
  const visualize = process.env.VITE_VISUALIZE;
  if (visualize && ["1", "true", "t"].includes(visualize.toLowerCase())) {
    plugins.push(
      visualizerPlugin({
        filename: "tmp/vite_visualize.html",
        open: true,
      }),
    );
  }

  // == Config
  return {
    clearScreen: false,
    resolve: { alias: [{ find: "lodash", replacement: "lodash-es" }] },
    ssr: {
      noExternal: ["@microsoft/clarity"],
    },
    plugins,
  };
});
