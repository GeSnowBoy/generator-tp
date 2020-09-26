var webpack = require('webpack');
var path = require('path');
const cdnExternals = require('./cdn.externals.js');
let temp = cdnExternals([
  'react',
  'react-dom',
  'react-router-dom',
  'axios',
  'moment',
  'antd',
  'immer'
]);

function resolve(src) {
  return path.resolve(__dirname, src);
}
module.exports = function(env) {
  return {
    devtool: 'none',
    entry: {
      index: resolve('../src/index.tsx')
    },

    output: {
      path: resolve('../lib'),
      filename: 'index.min.js',
      publicPath: './',
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        {
          test: /.ts(x?)$/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader' // creates style nodes from JS strings
            },
            {
              loader: 'css-loader' // translates CSS into CommonJS
            },
            {
              loader: 'less-loader' // compiles Less to CSS
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.js', '.ts', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },
    externals: temp.externals,
    resolveLoader: {
      modules: ['node_modules']
    }
  };
};
