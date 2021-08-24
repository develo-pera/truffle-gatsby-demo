const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// We need this in order for Web3.js to work properly
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      new NodePolyfillPlugin(),
    ],
  })
}
