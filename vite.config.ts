import { defineConfig } from "vite";
import type { PluginOption } from "vite";
import { join } from "path";

import rubyPlugin from "vite-plugin-ruby";
import fullReloadPlugin from "vite-plugin-full-reload";
import autoImportPlugin from "unplugin-auto-import/vite";
import iconsPlugin from "unplugin-icons/vite";
import reactPlugin from "@vitejs/plugin-react";
import graphqlCodegenPlugin from "vite-plugin-graphql-codegen";
import { isoImport as isomorphicImportPlugin } from "vite-plugin-iso-import";
import { visualizer as visualizerPlugin } from "rollup-plugin-visualizer";

import { imports } from "./config/auto-import";

export default defineConfig(({ ssrBuild, mode }) => {
  // == Plugins
  const plugins: PluginOption = [
    isomorphicImportPlugin(),
    autoImportPlugin({
      dts: join(__dirname, "typings/auto-import.generated.d.ts"),
      imports,
    }),
    iconsPlugin({
      compiler: "jsx",
      jsx: "react",
    }),
    !ssrBuild &&
      graphqlCodegenPlugin({
        configFilePathOverride: "config/graphql/codegen.helpers.ts",
        configOverride: {
          errorsOnly: true,
        },
      }),
    rubyPlugin(),
    reactPlugin(),
    fullReloadPlugin([
      "config/routes.rb",
      "config/routes/**/*.rb",
      "app/views/**/*.{html,html.erb}",
      "app/**/*.generated.*",
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

  // == Config
  return {
    clearScreen: false,
    resolve: {
      alias: [
        {
          find: /^@react-email\/components$/,
          replacement: "@react-email/components/dist",
        },
        {
          find: /^@apollo\/client$/,
          replacement: "@apollo/client/index",
        },
      ],
    },
    build: {
      emptyOutDir: true,
      sourcemap: true,
      ...(ssrBuild &&
        mode === "development" && {
          rollupOptions: {
            output: {
              assetFileNames: "assets/[name][extname]",
            },
          },
        }),
    },
    optimizeDeps: {
      include: ["@react-email/components"],
    },
    plugins,
  };
});
