const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
console.log("=>", path.resolve(__dirname, 'src/index.js'))
module.exports = {
  entry: './src/index.js',
  mode: "development",
  devtool: "source-map",
  output: {
    publicPath: "http://localhost:3000/",
    clean: true,
  },
  resolve: {
    extensions: [
      ".jsx",
      ".js",
      ".json",
      ".css",
      ".scss",
      ".jpg",
      "jpeg",
      "png",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: "url-loader",
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "web-store-container",
      remotes: {
        "obsess_libs": "obsess_libs@https://modules.obsess-vr.com/beta/obsess_libs/remoteEntry.js",
        "obsess_modules": "obsess_modules@http://localhost:3001/remoteEntry.js"
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  externals: {
    'config': JSON.stringify(require('./configs/config.development.json'))
  }
};
