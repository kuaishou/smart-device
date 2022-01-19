const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const devMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {

  output: {
    // dist:'dist',
    path: path.resolve(process.cwd(), 'dist'),
    // chunkFilename: "js/[name].chunk.js?[hash:5]",
    filename: '[name]/build.js?[hash:5]'
  },


  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          // loader: 'ts-loader' //用这个会报错，todo正在找原因
          loader: 'awesome-typescript-loader'
        }
      },

      {
        test: /\.(le|c)ss$/,
        use: [
          // devMode ? 'style-loader' : 
          MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader',
          'less-loader',

        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ['@babel/preset-env']    //配置信息
          // }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': '../src'
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name]/index.css",
      chunkFilename: "css/common.css"
    }),
    new HtmlWebPackPlugin({
      // publicPath:'./index',
      // chunks: ['vendor', 'common', 'index'],
      hash: true,
      template: "./public/index.html",
      // filename: "./index/index.html"
    }),
   
  ]
};