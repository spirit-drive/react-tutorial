const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ContextReplacementPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  devServer: {
    // для корректной работы react-router-dom при перезагрузке страницы
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      src: path.resolve('./src'),
    },
  },
  output: {
    path: path.join(__dirname, "/dist"),
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
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#1BA829',
                  'border-radius-base': '4px',
                },
              },
            },
          },
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
      template: "./src/index.html",
      favicon: "./src/favicon.svg"
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
