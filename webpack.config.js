const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    chaoxing: "./src/chaoxing/main.js",
    mosoteach: './src/mosoteach/main.js',
    nfstar: './src/nfstar/main.js',
    icourse163: './src/icourse163/main.js',
    mrrtv: './src/mrrtv/main.js'
  },
  output: {
    filename: '[name]/main.js',
    path: path.resolve(process.cwd(), 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: './src/manifest.json', to: 'manifest.json'},
        {from: './src/assets', to: 'assets/[name][ext]'},
        {from: './src/runtime/**', to: 'runtime/[name][ext]'}
      ]
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ],
  // optimization: {
  //   //抽取公共的dm
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },
}
