// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { webpackConfig, merge } = require("shakapacker");
const { resolve } = require("path");

const UnpluginIconsPlugin = require("unplugin-icons/webpack");

const customConfig = {
  resolve: {
    extensions: [".css", ".ts", ".tsx"],
    alias: {
      "~components": resolve(process.cwd(), "app/views/components"),
      "~helpers": resolve(process.cwd(), "app/views/helpers"),
    },
  },
  plugins: [
    UnpluginIconsPlugin({
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
