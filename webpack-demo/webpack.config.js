const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development', 
entry: './js/main.js',
output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'app'),
    publicPath: ''
},
devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'app'),
    open: true,
    compress: true,
    hot: true,
    port: 3001,
},
plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        minify: {
            collapseWhitespace: isProd
        }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: `./css/${filename('css')}`
    }),
    
    new CopyWebpackPlugin({
        patterns: [
            {from: path.resolve(__dirname, 'src/assets') , to: path.resolve(__dirname, 'app')}        
        ]
    }),   
],
module: {    
    rules: [ 
        
        {
            test: /\.html$/,
            loader: 'html-loader',
        },
        {
            test: /\.ts$/,
            use: {
                loader: 'ts-loader'
            }
        },
    {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: (resourcePath, context) => {
                        return path.relative(path.dirname(resourcePath), context) + '/';
                },
            }
            },       
        'css-loader', 
        'sass-loader'
        ],
    },
    {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
    },     
    {
    test: /\.(?:|png|jpg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: `/img/${filename('[ext]')}`,
                publicPath: '/src/img',
            }
        }],
    }     
    ]
}
};