import { defineConfig } from "vite";
import { join } from "path";

import rubyPlugin from "vite-plugin-ruby";
import gzipPlugin from "rollup-plugin-gzip";
import fullReloadPlugin from "vite-plugin-full-reload";
import autoImportPlugin from "unplugin-auto-import/vite";
import iconsPlugin from "unplugin-icons/vite";
import reactPlugin from "@vitejs/plugin-react";
import graphqlCodegenPlugin from "vite-plugin-graphql-codegen";
import { isoImport as isoImportPlugin } from "vite-plugin-iso-import";
import { visualizer as visualizerPlugin } from "rollup-plugin-visualizer";

import { imports } from "./config/auto-import";

const plugins = [
  rubyPlugin(),
  isoImportPlugin(),
  autoImportPlugin({
    dts: join(__dirname, "typings/auto-import.d.ts"),
    imports,
  }),
  iconsPlugin({
    compiler: "jsx",
    jsx: "react",
  }),
  graphqlCodegenPlugin({
    configFilePathOverride: "config/graphql-codegen.client.ts",
    configOverride: {
      errorsOnly: true,
    },
  }),
  reactPlugin(),
  gzipPlugin(),
  fullReloadPlugin([
    "config/routes.rb",
    "config/routes/**/*.rb",
    "app/views/**/*.{html,html.erb}",
  ]),
];

if (process.env.VITE_VISUALIZE) {
  plugins.push(
    visualizerPlugin({
      filename: "dist/stats.html",
      open: true,
    }),
  );
}

export default defineConfig({
  clearScreen: false,
  ssr: {
    format: "cjs",
  },
  plugins,
});
