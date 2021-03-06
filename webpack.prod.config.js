const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",

  entry: ["./src/index"],

  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/"
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],

  resolve: {
    extensions: ["*", ".jsx", ".scss", ".css", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        include: [path.join(__dirname, "src"), path.join(__dirname, ".")],
        exclude: /node_modules\/(?!mapbox-gl\/js)/
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
