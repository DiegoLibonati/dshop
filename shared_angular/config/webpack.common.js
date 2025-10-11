const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "../tsconfig.app.json"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            issuer: /\.component\.ts$/,
            type: "asset/source",
          },
          {
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
            ],
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.html$/i,
        use: [{ loader: "html-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@tests": path.resolve(__dirname, "../tests"),
    },
  },
};
