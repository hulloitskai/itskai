// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/clientWebpackConfig.js

const commonWebpackConfig = require("./commonWebpackConfig");

const configureClient = () => {
  const clientConfig = commonWebpackConfig();

  // server is special and should ONLY be built by the serverConfig
  // In case this entry is not deleted, a very strange "window" not found
  // error shows referring to window["webpackJsonp"]. That is because the
  // client config is going to try to load chunks.
  Object.keys(clientConfig.entry).forEach(key => {
    if (key.startsWith("server-bundle")) {
      delete clientConfig.entry[key];
    }
  });

  return clientConfig;
};

module.exports = configureClient;
