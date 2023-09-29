import { join } from "path";

import { defineConfig } from "vite";
import type { PluginOption } from "vite";

import rubyPlugin from "vite-plugin-ruby";
import autoImportPlugin from "unplugin-auto-import/vite";
import iconsPlugin from "unplugin-icons/vite";
import reactPlugin from "@vitejs/plugin-react";
import { isoImport as isomorphicImportPlugin } from "vite-plugin-iso-import";

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
  ];

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
