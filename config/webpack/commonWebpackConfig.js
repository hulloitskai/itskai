// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { webpackConfig, merge } = require("shakapacker");
const { resolve } = require("path");

const AutoImportPlugin = require("unplugin-auto-import/webpack");
const IconsPlugin = require("unplugin-icons/webpack");
const IconsResolver = require("unplugin-icons/resolver");

const customConfig = {
  resolve: {
    extensions: [".css", ".ts", ".tsx"],
    alias: {
      "~views": resolve(process.cwd(), "app/views"),
    },
  },
  plugins: [
    AutoImportPlugin({
      dts: resolve(process.cwd(), "typings/auto-imports.d.ts"),
      resolvers: [
        IconsResolver({
          prefix: "Icon",
          enabledCollections: ["heroicons"],
          alias: {
            hero: "heroicons",
          },
          extension: "jsx",
        }),
      ],
      imports: [
        "react",
        {
          "@apollo/client": ["useQuery", "useSubscription", "useMutation"],
          "@mantine/core": [
            "Box",
            "Button",
            "Container",
            "Divider",
            "Group",
            "Space",
            "Stack",
            "Text",
            "TextInput",
            "Title",
          ],
          "@mantine/form": ["useForm"],
          "~views/shared/components": ["withProviders"],
          "~views/shared/helpers": [
            "resolve",
            "formatError",
            "usePreloadedQuery",
          ],
          lodash: ["first"],
        },
      ],
    }),
    IconsPlugin({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: /_virtual_/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
            },
          },
        },
      },
    ],
  },
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions
// are mutable globals
const commonWebpackConfig = () => merge({}, webpackConfig, customConfig);

module.exports = commonWebpackConfig;
