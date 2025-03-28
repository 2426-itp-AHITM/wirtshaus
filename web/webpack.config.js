const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'target'),
        filename: '[name].js',
    },
    devtool: "cheap-source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'target'),
            publicPath: '/',
        },
        open: true,
        host: 'localhost',
        port: 4200,
        proxy: [
            {
                context: ["/api"],
                target: "http://localhost:8080",
                changeOrigin: true,
                logLevel: 'debug',
                secure: false,
                ws: true,
                historyApiFallback: true
            }
        ],
        headers: {
            "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline' 'unsafe-eval'; font-src 'self' data:;"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: true,
            scriptLoading: "module"
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, "src/assets/images"),
                    to: path.resolve(__dirname, "target/images")
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                include: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};