const { env } = require("shakapacker");

const customConfig = {
  options: {
    jsc: {
      transform: {
        react: {
          useBuiltins: true,
          development: env.isDevelopment,
          refresh: env.isDevelopment && env.runningWebpackDevServer,
        },
      },
    },
    env: {
      targets: "defaults",
    },
  },
};

module.exports = customConfig;
