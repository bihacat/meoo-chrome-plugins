const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        chaoxing: "./src/chaoxing/main.js"
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
            }
          ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ 
            patterns: [
                {from: './src/manifest.json', to: 'manifest.json'}
            ]
        })
    ],
    optimization: {
    //抽取公共的dm
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
}