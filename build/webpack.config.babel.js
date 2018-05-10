
var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    config = require('../config'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    BomPlugin = require('webpack-utf8-bom'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

var _version = '20180503';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        checkIn: process.env.NODE_ENV === 'production' ? ['./app-checkIn.js'] : ['./build/dev-client', './app-checkIn.js'],
        theWall: process.env.NODE_ENV === 'production' ? ['./app-theWall.js'] : ['./build/dev-client', './app-theWall.js'],
        vendor: ["vue", "vue-router", "vuex", "rxjs", "vue-rx", "tracking"]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
        filename: process.env.NODE_ENV === 'production'
            ? path.posix.join(config.build.assetsSubDirectory, `js/[name].${_version}.js`)
            : path.posix.join(config.dev.assetsSubDirectory, `js/[name].${_version}.js`),
        chunkFilename: process.env.NODE_ENV === 'production'
            ? path.posix.join(config.build.assetsSubDirectory, `js/[name].chunk.js`)
            : path.posix.join(config.dev.assetsSubDirectory, `js/[name].chunk.js`)
    },
    resolve:{
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:[
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                'scss': 'vue-style-loader!css-loader?-autoprefixer!sass-loader!postcss-loader',
                                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                                js: 'babel-loader?presets[]=es2015&presets[]=stage-2'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'babel-loader?cacheDirectory',
                        options: {
                            plugins: ['external-helpers']
                        }
                    }
                ],
                
            },
            {
                test: /\.s[c|a]ss$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                },{ 
                    loader: "postcss-loader"
                }, {
                    loader: "vue-style-loader"
                }]
            },
            {
                test: /\.(jpeg|jpg|png|gif)$/i,
                use: [
                    process.env.NODE_ENV === 'production'
                        ? `url-loader?limit=10000&name=${ path.posix.join(config.build.assetsSubDirectory, 'images/[name].[ext]?[hash]') }`
                        : `url-loader?limit=10000&name=${ path.posix.join(config.dev.assetsSubDirectory, 'images/[name].[ext]?[hash]') }`,
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: false,//process.env.NODE_ENV === 'production',
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false, // disabled
                            pngquant: {
                                floyd: 0.5,
                                speed: 2
                            },
                            svgo: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertPathData: false }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                      loader: 'css-loader',
                      options: {
                        minimize: (isProd),
                        sourceMap: !isProd
                      }
                    }, 'postcss-loader', {
                      loader: 'sass-loader'
                    }]
                  })
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('css-loader!stylus-loader')        
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                use: [process.env.NODE_ENV === 'production'
                    ? `url-loader?limit=10000&name=${ path.posix.join(config.build.assetsSubDirectory, 'fonts/[name].[ext]') }`
                    : `url-loader?limit=10000&name=${ path.posix.join(config.dev.assetsSubDirectory, 'fonts/[name].[ext]') }`]
            }
        ]
    }
}


module.exports.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: process.env.NODE_ENV === 'production'
            ? path.posix.join(config.build.assetsSubDirectory, `js/vendors.min.js`)
            : path.posix.join(config.dev.assetsSubDirectory, `js/vendors.min.js`),
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ 
        // favicon: './src/images/favicon.ico', 
        filename: `./checkin.html`, 
        template: `./template-checkIn.html`,
        // inject: 'head',
        inject: true,
        chunks: ['vendor', 'checkIn'],
        chunksSortMode: function (a, b) {
            let orders = ['vendor', 'checkIn'];
            if (orders.indexOf(a.names[0]) > orders.indexOf(b.names[0])) {
                return 1;
            } else if (orders.indexOf(a.names[0]) < orders.indexOf(b.names[0])) {
                return -1;
            } else {
                return 0;
            }
        },
        minify: { 
          removeComments: false, 
          collapseWhitespace: false
        }
    }),
    new HtmlWebpackPlugin({ 
        // favicon: './src/images/favicon.ico', 
        filename: `./thewall.html`, 
        template: `./template-theWall.html`,
        // inject: 'head',
        inject: true,
        chunks: ['vendor', 'theWall'],
        chunksSortMode: function (a, b) {
            let orders = ['vendor', 'theWall'];
            if (orders.indexOf(a.names[0]) > orders.indexOf(b.names[0])) {
                return 1;
            } else if (orders.indexOf(a.names[0]) < orders.indexOf(b.names[0])) {
                return -1;
            } else {
                return 0;
            }
        },
        minify: { 
          removeComments: false, 
          collapseWhitespace: false
        }
    }),
    new CopyWebpackPlugin([
        { from: './src/images/**', to: process.env.NODE_ENV === 'production'
            ? path.posix.join(config.build.assetsSubDirectory, `images/[name].[ext]`)
            : path.posix.join(config.dev.assetsSubDirectory, `images/[name].[ext]`) },
        { from: './src/js/libs/**', to: process.env.NODE_ENV === 'production'
            ? path.posix.join(config.build.assetsSubDirectory, `js/libs/[name].[ext]`)
            : path.posix.join(config.dev.assetsSubDirectory, `js/libs/[name].[ext]`) },
        { from: './src/css/libs/**', to: process.env.NODE_ENV === 'production'
            ? path.posix.join(config.build.assetsSubDirectory, `css/libs/[name].[ext]`)
            : path.posix.join(config.dev.assetsSubDirectory, `css/libs/[name].[ext]`) }
    ], {}),
    new ExtractTextPlugin({ filename: `static/css/[name].${_version}.css`, allChunks: true }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("production")
        },
        __ENV: process.env.NODE_ENV == 'production'
            ? "'pro'"
            : "'dev'"
    }),
    new FriendlyErrorsPlugin()
];

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.LoaderOptionsPlugin({
            test: /\.vue$/,
            options: {
                vue: {
                    loaders: {
                        css: ExtractTextPlugin.extract('css-loader'),
                        stylus: ExtractTextPlugin.extract('css-loader!stylus-loader'),
                        js: 'babel-loader?presets[]=es2015&presets[]=stage-2'
                    },
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 2 versions']
                        })
                    ]
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]);
} else {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin()
    ]);
    module.exports.devtool = 'source-map'
}
