const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: ["babel-polyfill", "react-hot-loader/patch", "./src/index"],

  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    extensions: ["*", ".jsx", ".scss", ".css", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        include: path.join(__dirname, "src"),
        exclude: /node_modules\/(?!mapbox-gl\/js)/,        
      },
      {
        test: /\.css?$/,
        loaders: ["style-loader", "css-loader?modules=true"],
        include: path.join(__dirname, "node_modules")
      },
      {
        test: /\.scss?$/,
        loader: "style-loader!css-loader!sass-loader",
        include: path.join(__dirname, "src", "styles")
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      }
    ]
  }
};
