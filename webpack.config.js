const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const StylelintPlugin = require('stylelint-webpack-plugin');
const createWriteWpAssetManifest = require('./webpack/wpAssets');

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    devtool: mode === 'production'
      ? 'source-map'
      : 'cheap-module-eval-source-map',
    entry: {
      app: './components/app/index.jsx',
      appClassic: './components/appClassic/index.jsx',
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /.jsx?$/,
          use: [
            'babel-loader',
            'eslint-loader',
          ],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: 'oovvuu-[name]__[local]___[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.join(__dirname, './config/postcss.config.js'),
                },
              },
            },
            'resolve-url-loader',
            'sass-loader',
          ],
        },
      ],
    },
    output: {
      filename: mode === 'production'
        ? '[name].[chunkhash].bundle.min.js'
        : '[name].js',
      path: path.join(__dirname, 'build'),
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
      new StylelintPlugin({
        configFile: path.join(__dirname, './config/stylelint.config.js'),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
};
