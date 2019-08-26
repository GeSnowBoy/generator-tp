var webpack = require('webpack');
var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

let port = '8023';
function resolve(src) {
  return path.resolve(__dirname, src);
}
module.exports = function(env) {
  return {
    devtool: 'source-map',
    entry: {
      index: resolve('../public/index.tsx')
    },

    output: {
      path: resolve('../'),
      filename: '[name].[chunkhash].min.js',
      publicPath: './'
    },

    devServer: {
      publicPath: '/',
      port,
      open: true,
      proxy: {
        '/api': {
          target: 'https://curiofetch-stage.curio.im/',
          secure: false,
          changeOrigin: true,
          autoRewrite: true,
          toProxy: true,
          hostRewrite: 'localhost:' + port
        }
      }
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

    resolveLoader: {
      modules: ['node_modules']
    },

    plugins: [
      new htmlWebpackPlugin({
        template: resolve(`../public/index.html`),
        filename: resolve('../index.html'),
        inject: true
      })
    ]
  };
};
