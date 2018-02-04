const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function isDevEnvironment() {
  return process.env.NODE_ENV === 'development';
}

module.exports = {
  devtool: isDevEnvironment() ? 'inline-source-map' : false,
  entry: {
    polyfills: path.resolve(__dirname, 'src/polyfills.ts'),
    vendor: path.resolve(__dirname, 'src/vendor.ts'),
    app: path.resolve(__dirname, 'src/index.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js'] // enables users to leave off the extension when importing
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                  minimize: true,
                  sourceMap: isDevEnvironment()
              }
          }, {
              loader: "sass-loader",
              options: {
                sourceMap: isDevEnvironment()
              }
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: isDevEnvironment()
    }),
    new ExtractTextPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      title: 'Web App',
      xhtml: true,
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico')
    })
  ]
};
