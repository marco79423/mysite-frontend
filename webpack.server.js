const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: [
    // 'babel-polyfill',
    'whatwg-fetch',
    './server/index.js'
  ],
  target: 'node',
  output: {
    publicPath: '/bin/',
    path: path.join(__dirname, '/bin'),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'server'),
        ]
      },
      {
        test: /\.css|\.scss$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'isomorphic-style-loader!css-loader?modules!sass-loader'
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src'),
        loader: 'isomorphic-style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
}