// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { webpackConfig, merge } = require("shakapacker");

const customConfig = {
  resolve: {
    extensions: [".css", ".ts", ".tsx"],
  },
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions
// are mutable globals
const commonWebpackConfig = () => merge({}, webpackConfig, customConfig);

module.exports = commonWebpackConfig;
