const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config, env) {

  webpack: (config) => {
    config.resolve.fallback = {fs: false}
  }
  config.plugins.push(new NodePolyfillPlugin());
  return config;
};
