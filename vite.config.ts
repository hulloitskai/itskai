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

import { imports } from "./config/auto-import.config";

export default defineConfig({
  clearScreen: false,
  ssr: {
    format: "cjs",
  },
  plugins: [
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
      configFilePathOverride: join(
        __dirname,
        "config/graphql-codegen.config.ts",
      ),
      configOverride: {
        generates: {
          "./app/queries/index.ts": {
            schema: "app/graphql/schema.graphql",
            config: {
              omitOperationSuffix: true,
            },
            plugins: [
              "typescript",
              "typescript-operations",
              "typed-document-node",
            ],
          },
        },
        silent: true,
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
  ],
});
