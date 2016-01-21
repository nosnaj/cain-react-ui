var webpack = require('webpack')

module.exports = function () {
  return {
    devtool: 'inline-source-map',
    entry: [
      './src/client/index.js'
    ],
    output: {
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.ProgressPlugin(function (percentage, message) {
        var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
        var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
        process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '%: ' + message + MOVE_LEFT);
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: __dirname,
          query: {
            "plugins": [
              "transform-decorators-legacy"
            ],
            "presets": [
              "es2015",
              "react"
            ],
            "env": {
              "development": {
                "plugins": [["react-transform", {
                  "transforms": [{
                    "transform": "react-transform-hmr",
                    // if you use React Native, pass "react-native" instead:
                    "imports": ["react"],
                    // this is important for Webpack HMR:
                    "locals": ["module"]
                  }]
                  // note: you can put more transforms into array
                  // this is just one of them!
                }]]
              }
            }
          }
        }, {
          test: /\.less$/,
          loader: "style!css!less",
          exclude: /node_modules/,
          include: __dirname
        }
      ]
    }
  };
};