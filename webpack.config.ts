import * as path from "path";
import * as webpack from "webpack";
import nodeExternals from "webpack-node-externals";

const config: webpack.Configuration = {
  mode: "production",
  externalsPresets: { node: true },
  externals: [nodeExternals()], // removes node_modules from your final bundle
  entry: "./src/index.ts", // make sure this matches the main root of your code
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  module: {
    rules: [{ test: /\.ts$/, use: { loader: "raw-loader" } }],
  },
  optimization: {
    minimize: false, // enabling this reduces file size and readability
  },
};

export default config;
