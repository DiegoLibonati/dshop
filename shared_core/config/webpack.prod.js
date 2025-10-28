const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/shared_core/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shared_core",
      filename: "remoteEntry.js",
      exposes: {
        "./SharedCore": "./src/bootstrap.tsx",
        "./SharedCoreEntities": "./src/entities/app.ts",
        "./SharedCoreEnums": "./src/entities/enum.ts",
        "./SharedCoreProps": "./src/entities/props.ts",
        "./SharedCoreStyles": "./src/index.css",
      },
      shared: packageJson.dependencies,
    }),
  ],
});
