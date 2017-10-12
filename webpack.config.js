const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new CleanWebpackPlugin(path.resolve(__dirname, 'public')),
  new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'app/index.template.html') })
];

if (isProduction) {
  // Production-only plugins.
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
} else {
  // Development-only plugins.
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'app')],
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ],
          plugins: ['react-hot-loader/babel', 'transform-class-properties']
        }
      }
    ]
  },
  plugins: plugins,

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true
  }
};
