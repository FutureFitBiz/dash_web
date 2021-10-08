const webpack = require('webpack');
let commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' }
      ]
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        HASH: JSON.stringify(commitHash),
      })
    ]
  }
}
