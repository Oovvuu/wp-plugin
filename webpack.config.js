const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const createWriteWpAssetManifest = require('./webpack/wpAssets');
const getDevServer = require('./config/devServer');
const getEntries = require('./config/getEntries');

const paths = {
  config: path.join(__dirname, './config'),
  build: path.join(__dirname, './build'),
  scss: path.join(__dirname, './client/scss'),
  fonts: path.join(__dirname, './client/fonts'),
};

module.exports = (env, argv) => {
  const { mode } = argv;

  // The base entries used in production mode.
  const entries = {
    app: './components/app',
    appClassic: './components/appClassic',
    fonts: './client/fonts/fonts.scss',
  };

  return {
    devtool: mode === 'production'
      ? 'source-map'
      : 'cheap-module-eval-source-map',
    entry: getEntries(mode, entries),
    devServer: getDevServer(mode, env),
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /.jsx?$/,
          use: [
            'react-hot-loader/webpack',
            'babel-loader',
            'eslint-loader',
          ],
        },
        {
          test: /\.scss$/,
          exclude: /client\/fonts/,
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: (resourcePath) => {
                    // Exclude core styles from this loader's CSS Modules mode.
                    if (/client\/scss\/global/i.test(resourcePath)) {
                      return 'global';
                    }

                    return 'local';
                  },
                  localIdentName: 'oovvuu-[name]__[local]___[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.join(paths.config, 'postcss.config.js'),
                },
              },
            },
            'resolve-url-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  'core/_utilities.scss',
                  'core/_a11y.scss',
                  'core/_typography.scss',
                  'core/_buttons.scss',
                ].map((file) => path.resolve(`${paths.scss}`, file)),
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          include: /client\/fonts/,
          loaders: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '.',
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true, // true outputs JSX tags
              },
            },
          ],
        },
        {
          test: [
            /\.woff2?$/,
          ],
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[ext]',
            },
          },
        },
      ],
    },
    output: {
      filename: mode === 'production'
        ? '[name].[chunkhash].bundle.min.js'
        : '[name].js',
      path: paths.build,
      publicPath: (mode === 'development')
        ? 'https://8080-httpsproxy.alley.test/build/'
        : paths.build,
    },
    plugins: [
      new StatsPlugin({
        transform: createWriteWpAssetManifest(mode),
        fields: ['assetsByChunkName', 'hash'],
        filename: 'assetMap.json',
      }),
      ...(mode === 'production'
        ? [
          new CleanWebpackPlugin(),
        ] : []
      ),
      ...(mode === 'development'
        ? [
          new webpack.HotModuleReplacementPlugin({
            multiStep: true,
          }),
        ] : []
      ),
      new StylelintPlugin({
        configFile: path.join(paths.config, 'stylelint.config.js'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].min.css',
        chunkFilename: '[name].[contenthash].chunk.min.css',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        fonts: paths.fonts,
        shared: path.join(paths.scss, 'shared'),
        'react-dom': '@hot-loader/react-dom',
      },
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
};
