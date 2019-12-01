const path = require("path");
const HmtlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.otf$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HmtlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
