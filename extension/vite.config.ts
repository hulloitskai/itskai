import { defineConfig } from "vite";
import { join, resolve } from "path";

import autoImportPlugin from "unplugin-auto-import/vite";
import iconsPlugin from "unplugin-icons/vite";
import graphqlCodegenPlugin from "vite-plugin-graphql-codegen";
import gzipPlugin from "rollup-plugin-gzip";
import reactPlugin from "@vitejs/plugin-react";
import { crx as crxPlugin } from "@crxjs/vite-plugin";

import manifest from "./manifest.json";
import { imports } from "./config/auto-import";

export default defineConfig({
  plugins: [
    autoImportPlugin({
      dts: join(__dirname, "typings/auto-import.generated.d.ts"),
      imports,
    }),
    iconsPlugin({ compiler: "jsx", jsx: "react" }),
    graphqlCodegenPlugin({
      configFilePathOverride: "config/graphql/codegen.ts",
      configOverride: {
        errorsOnly: true,
      },
    }),
    reactPlugin(),
    crxPlugin({ manifest }),
    gzipPlugin(),
  ],
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "app")}/`,
    },
  },
  server: {
    port: 3001,
    hmr: {
      port: 3001,
    },
  },
});
