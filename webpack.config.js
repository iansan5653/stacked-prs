// @ts-check

"use strict";

const webpack = require("webpack");
const {name} = require("./manifest.json");
const safeName = name.replace(/\s/g, "_");

const CopyPlugin = require("copy-webpack-plugin");

const nodeModulePrefixRe = /^node:/u;

const OUT_DIR = "dist";

module.exports = /** @type {webpack.Configuration[]} */ ([
  {
    entry: {
      ["content-scripts/github"]: "./src/content-scripts/github.tsx",
      ["views/options"]: "./src/views/options.ts",
    },
    devtool: false,
    externals: {},
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        },
      ],
    },
    name: safeName,
    output: {
      filename: `${OUT_DIR}/[id].js`,
      library: {
        name: safeName.replace(/(-\w)/g, (m) => m.slice(1).toUpperCase()),
        type: "var",
      },
      path: __dirname,
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        nodeModulePrefixRe,
        (resource) => {
          const module = resource.request.replace(nodeModulePrefixRe, "");
          resource.request = module;
        }
      ),
      new CopyPlugin({
        // copy HTML files
        patterns: [
          {from: "src/views/*.html", to: `${OUT_DIR}/views/[name][ext]`},
        ],
      }),
    ],
    resolve: {
      fallback: {
        fs: false,
        os: false,
        path: false,
        util: false,
      },
      extensions: [".tsx", ".ts"],
    },
    mode: "development",
  },
]);
