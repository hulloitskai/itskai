import { defineConfig } from "vite";
import { join } from "path";

import autoImportPlugin from "unplugin-auto-import/vite";
import graphqlCodegenPlugin from "vite-plugin-graphql-codegen";
import gzipPlugin from "rollup-plugin-gzip";
import reactPlugin from "@vitejs/plugin-react";
import { crx as crxPlugin } from "@crxjs/vite-plugin";
import { isoImport as isoImportPlugin } from "vite-plugin-iso-import";

import manifest from "./manifest.json";
import { imports } from "./config/auto-import";

export default defineConfig({
  plugins: [
    isoImportPlugin(),
    autoImportPlugin({
      dts: join(__dirname, "typings/auto-import.generated.d.ts"),
      imports,
    }),
    graphqlCodegenPlugin({
      configFilePathOverride: "config/graphql-codegen.ts",
      configOverride: {
        errorsOnly: true,
      },
    }),
    reactPlugin(),
    crxPlugin({ manifest }),
    gzipPlugin(),
  ],
  server: {
    port: 3001,
    hmr: {
      port: 3001,
    },
  },
});
