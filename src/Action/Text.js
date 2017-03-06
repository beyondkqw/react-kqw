var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var publicPath = '/dist/'; //服务器路径
var path = __dirname + '/dist/';

var plugins = [];
if (process.argv.indexOf('-p') > -1) { //生产环境
    plugins.push(new webpack.DefinePlugin({ //编译成生产版本
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    publicPath = '/react-cnode/dist/';
    path = __dirname + '/react-cnode/dist/';
}
plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包

plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    filename: '../index.html', //生成的html存放路径，相对于 path
    template: './src/template/index.html', //html模板路径
    hash: true,    //为静态资源生成hash值
}));

module.exports = {
    entry: {
        app: './src/App', //编译的入口文件
    },
    output: {
        publicPath:"dist/", //编译好的文件，在服务器的路径
        path:path.join(__dirname, "dist"), //编译到当前目录
        filename: '[name].js', //编译后的文件名字
        chunkFilename: '[name].chunk.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel?presets=es2015'
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }

        ]
    },
    plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
        alias: {
            jquery: path.join(__dirname, 'dev/jquery/jquery.js'),
            avalon: path.join(__dirname, 'dev/avalon/avalon.shim'), //在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
            '../avalon': path.join(__dirname, 'dev/avalon/avalon.js')//由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
        }
    }
};
