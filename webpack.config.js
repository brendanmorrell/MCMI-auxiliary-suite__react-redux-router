const path = require('path');

module.exports = {
  entry: './src/components/App.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.jsx$/,
      exclude: /node_modules/,
    }, {
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
      test: /.s?css$/,
    }],
  },
  resolve: {
    extensions: ['.jsx', '.scss', '.js', 'css'],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
};
