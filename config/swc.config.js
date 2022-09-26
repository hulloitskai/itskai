const customConfig = {
  options: {
    jsc: {
      baseUrl: ".",
      paths: {
        app: ["app"],
      },
    },
    env: {
      targets: "defaults",
    },
  },
};

module.exports = customConfig;
