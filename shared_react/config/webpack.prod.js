const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/shared_react/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shared_react",
      filename: "remoteEntry.js",
      exposes: {
        "./SharedReact": "./src/bootstrap.tsx",
        "./SharedReactEnums": "./src/entities/enum.ts",
        "./SharedReactProps": "./src/entities/props.ts",
      },
      remotes: {
        shared_core: `shared_core@/shared_core/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
});
