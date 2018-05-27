const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const outputPath = 'public/assets';
const PRODUCTION = process.env.NODE_ENV === 'production';

let plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
];

if (PRODUCTION) {
  plugins.push(new ManifestPlugin());
}

module.exports = {
  mode: 'development',
  entry: {
    application: path.join(__dirname, 'app/assets/javascripts/admin/application.js'),
  },
  output: {
    filename: PRODUCTION ? '[name]-[hash].js' : '[name].js',
    path: path.join(__dirname, outputPath)
  },
  devServer: {
    host: '0.0.0.0',
    port: 18080,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /(\.scss$|\.sass)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=image/svg+xml'
      },
      {
        test: /.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  optimization: {
    minimize: PRODUCTION
  },
};
