const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    liveReload: true,
    hot: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "shared_react",
      filename: "remoteEntry.js",
      exposes: {
        "./SharedReact": "./src/bootstrap.tsx",
        "./SharedReactEnums": "./src/entities/enum.ts",
        "./SharedReactProps": "./src/entities/props.ts",
      },
      remotes: {
        shared_core: "shared_core@http://localhost:8084/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
});
