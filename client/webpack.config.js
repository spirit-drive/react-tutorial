const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ContextReplacementPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = 2033;
const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');
const host = 'localhost';

module.exports = {
  entry: "./index.tsx",
  devtool: "source-map",
  context: src,
  devServer: {
    port,
    hot: true,
    historyApiFallback: true,
    host,
  },
  resolve: {
    modules: [src, 'node_modules'],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      src,
    },
    fallback: { "crypto": require.resolve("crypto-browserify"), "stream": require.resolve("stream-browserify") }
  },
  output: {
    path: dist,
    publicPath: `http://${host}:${port}/`,
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[name]_[local]-[hash:base64:5]',
              },
            },
          },
          "sass-loader"
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: "./favicon.svg"
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(__dirname, 'tsconfig.json'),
      },
    }),
  ],
};
