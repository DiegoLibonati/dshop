const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.ts",
  output: { filename: "[name].[contenthash].js" },
  resolve: {
    extensions: [".js", ".ts", ".vue"],
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@tests": path.resolve(__dirname, "../tests"),
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  module: {
    rules: [
      { test: /\.vue$/i, use: "vue-loader" },
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            compilerOptions: { noEmit: false },
          },
        },
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],
};
