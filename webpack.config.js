const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/renderer.tsx',  // 確保這是您的 React 入口文件
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.svg']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      }
    ]
  }
};