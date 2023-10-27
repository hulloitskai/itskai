import { join } from "path";

import { defineConfig } from "vite";
import type { PluginOption } from "vite";

import rubyPlugin from "vite-plugin-ruby";
import fullReloadPlugin from "vite-plugin-full-reload";
import autoImportPlugin from "unplugin-auto-import/vite";
import iconsPlugin from "unplugin-icons/vite";
import reactPlugin from "@vitejs/plugin-react";
import { isoImport as isomorphicImportPlugin } from "vite-plugin-iso-import";
import { visualizer as visualizerPlugin } from "rollup-plugin-visualizer";

import { imports } from "./config/auto-import";

export default defineConfig(() => {
  // == Plugins
  const plugins: PluginOption = [
    isomorphicImportPlugin(),
    autoImportPlugin({
      dts: join(__dirname, "typings/auto-import.generated.d.ts"),
      imports,
    }),
    iconsPlugin({ compiler: "jsx", jsx: "react" }),
    reactPlugin(),
    rubyPlugin(),
    fullReloadPlugin([
      "config/routes.rb",
      "config/routes/**/*.rb",
      "app/views/**/*.{html,html.erb}",
      "app/**/*.generated.*",
    ]),
  ];

  // == Visualize
  if (process.env.VITE_VISUALIZE) {
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
    resolve: {
      alias: [
        {
          find: /^@apollo\/client$/,
          replacement: "@apollo/client/index",
        },
      ],
    },
    plugins,
  };
});
