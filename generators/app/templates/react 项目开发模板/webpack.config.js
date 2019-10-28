var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cdnExternals = require('./cdn.externals.js');
const HappyPack = require('happypack'); // 利用多核打包加速
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 拆分包
// 每个网页需要注入的外联cdn的包名
let cdnConfig = {
  index: [] // ['react', 'react-dom', 'react-router-dom', 'moment', 'antd'],
};
let externals = cdnExternals([...new Set([...cdnConfig.index])]).externals;
const port = 9095;
module.exports = function(env) {
  let sourceMap = !!env.production;

  let webpackConfig = {
    mode: env.production ? 'production' : 'development',
    devtool: sourceMap ? 'source-map' : '',
    entry: {
      index: './ts/index.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: env.production
        ? 'js/[name].[chunkhash].min.js'
        : 'js/[name].[chunkhash].min.js',
      chunkFilename: 'js/[id].[name].[chunkhash].js',
      publicPath: env.production ? './public/' : '',
      libraryTarget: 'umd'
    },
    devServer: {
      contentBase: path.join(__dirname, './public'),
      historyApiFallback: {
        rewrites: [{ from: /^\/$/, to: '/index.html' }]
      },
      port,
      // open: true,
      proxy: {
        '/api': {
          target: 'https://qrcode-eshop-stage.curio.im/',
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
          oneOf: [
            {
              test: /.ts(x?)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'cache-loader',
                  options: {
                    cacheDirectory: path.resolve(
                      __dirname,
                      'node_modules/.cache-loader'
                    )
                  }
                },
                { loader: 'happypack/loader?id=ts' }
              ],
              exclude: /node_modules/
            },
            {
              test: /\.module\.less$/,
              use: [
                MiniCssExtractPlugin.loader,

                {
                  loader: 'happypack/loader?id=lessModule'
                }
              ],
              sideEffects: true
            },
            {
              test: /\.less$/,

              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap
                  }
                },
                'less-loader'
              ],
              sideEffects: true
            },

            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap
                  }
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
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules')],
      alias: {
        '@': path.resolve(__dirname, './ts/')
      }
    },
    externals,
    plugins: ['index']

      .map(
        page =>
          new HtmlWebpackPlugin({
            template: `html/${page}.html`,
            filename: `./${page}.html`,

            inject: true,
            environment: env,
            chunks: [page],
            files: cdnExternals(cdnConfig[page]).files
          })
      )
      .concat(
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].css'
        }),

        new HappyPack({
          id: 'ts',
          threads: 4,
          loaders: [
            {
              path: 'ts-loader',
              query: { happyPackMode: true }
            }
          ]
        }),
        new HappyPack({
          id: 'less',
          threads: 4,
          loaders: [
            {
              path: 'css-loader',
              options: {
                sourceMap
              }
            },
            {
              path: 'less-loader',
              query: {
                javascriptEnabled: true,
                sourceMap
              }
            }
          ]
        }),
        new HappyPack({
          id: 'lessModule',
          threads: 4,
          loaders: [
            {
              path: 'css-loader',
              query: {
                sourceMap,
                modules: true
              }
            },
            {
              path: 'less-loader',
              query: {
                sourceMap
              }
            }
          ]
        })
      ),
    node: { fs: 'empty' }
  };

  return webpackConfig;
};
