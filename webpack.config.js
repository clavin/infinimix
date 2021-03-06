const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**
 * Determines various aspects of the bundle, including plugins and minification. Comparison checks the `NODE_ENV`
 * environment variable to be `"production"`; a false negative (i.e. being false when env is something like `"prod"`) is
 * better than a false positive.
 */
const isProduction = process.env.NODE_ENV === 'production';

/** The plugins used to compile the bundle(s). Varies based on `isProduction`. */
const plugins = [
    // Clean up the `public/` directory before outputting.
    new CleanWebpackPlugin(path.resolve(__dirname, 'public')),

    // Generate an html file from the given template. Automatically adds output to html file. The generated file is
    // minified if we're compiling for production.
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'app/index.template.html'),
        minify: isProduction ? {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true,
            useShortDoctype: true
        } : false
    })
];

// Apply different plugins to the bundle(s) based on the target environment. Note that certain production-only changes
// to bundling were made earlier too, i.e. minification of the generated html file.
if (isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = {
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        path.resolve(__dirname, 'app/main.tsx')
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: path.resolve(__dirname, 'app/tsconfig.json')
                }
            }
        ]
    },

    plugins
};
