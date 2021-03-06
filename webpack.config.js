const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack")

const outputDirectory = path.join(__dirname, 'dist');

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    mode: "development",
    entry: ["babel-polyfill", "./src"],
    output: {
        path: outputDirectory,
        filename: "[name].js",
        publicPath: "/"
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            camelCase: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css']
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            title: "My App",
            hash: true,
            template: "src/index.html"
        }),
        new webpack.DefinePlugin({
          BACKEND_URL: '"' + process.env.BACKEND_URL + '"'
        })
    ],
    devServer: {
        contentBase: outputDirectory,
        compress: true,
        historyApiFallback: true,
        port: 9000
    }
};
