// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const paths = require("./paths");

const publicPath = paths.servedPath;

const shouldUseRelativeAssetPaths = publicPath === "./";
const cssFilename = "css/[name].[contenthash:8].css";
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split("/").length).join("../") }
  : {};

module.exports = {
  bail: true,
  devtool: "source-map",
  entry: [paths.appIndexJs],
  output: {
    path: paths.appBuild,
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].chunk.js",
    publicPath
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules, paths.appSrc],
    extensions: [".js", ".json", ".jsx"],
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: paths.appSrc
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              compact: true
            }
          },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve("style-loader"),
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: require.resolve("css-loader"),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: true
                      }
                    },
                    {
                      loader: require.resolve("postcss-loader"),
                      options: {
                        ident: "postcss",
                        plugins: () => [autoprefixer()]
                      }
                    },
                    {
                      loader: require.resolve("less-loader")
                    }
                  ]
                },
                extractTextPluginOptions
              )
            )
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve("style-loader"),
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: require.resolve("css-loader"),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: true
                      }
                    },
                    {
                      loader: require.resolve("postcss-loader"),
                      options: {
                        ident: "postcss",
                        plugins: () => [autoprefixer()]
                      }
                    }
                  ]
                },
                extractTextPluginOptions
              )
            )
          },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: "media/[name].[hash:8].[ext]"
            }
          }
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([paths.appBuild], { root: `${paths.appBuild}/../` }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: process.env.PUBLIC_URL }),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: "public/favicon.ico",
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        GA_ENABLED: JSON.stringify(true),
        GA_TRACKING_ID: JSON.stringify("UA-XXXXXXXX-X")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false
      },
      mangle: {
        safari10: true
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: cssFilename
    })
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
