const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    publicPath: "http://localhost:8084/",
  },
  devServer: {
    port: 8084,
    liveReload: true,
    hot: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "shared_core",
      filename: "remoteEntry.js",
      exposes: {
        "./SharedCore": "./src/bootstrap.tsx",
        "./SharedCoreEnums": "./src/entities/enum.ts",
        "./SharedCoreEntities": "./src/entities/app.ts",
        "./SharedCoreProps": "./src/entities/props.ts",
        "./SharedCoreStyles": "./src/index.css",
      },
      shared: packageJson.dependencies,
    }),
  ],
});
