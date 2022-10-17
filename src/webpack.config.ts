import { Configuration } from "webpack";
import { resolve } from "path";
import externals from "webpack-node-externals";

export default {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: resolve("./build"),
  },
  target: "node",
  externals: [externals()],
  resolve: {
    extensions: [".ts", ".js", ".json", ".graphql"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: ["ts-loader"],
      },
      {
        test: /\.graphql$/,
        exclude: /(node_modules)/,
        use: ["graphql-tag/loader"],
      },
    ],
  },
} as Configuration;
