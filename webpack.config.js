const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');

// plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
	devtool: IS_DEV ? 'source-map' : null,
	entry: {
		bundle: [
			'./src/js/index.js',
			'./src/scss/main.scss'
		]
	},
	output: {
        path: path.join(__dirname, 'public'),
        filename: IS_DEV ? 'js/[name].js' : 'js/[name].min.js',
    },
	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader'
			},
			{ 
				test: /\.scss$/, 
				loader: ExtractTextPlugin.extract('style-loader', `css-loader${IS_DEV ? '?sourceMap' : ''}!sass-loader?outputStyle=compressed`)
			}
		]
	},
	plugins: IS_DEV ? 
	[
		new ExtractTextPlugin('css/[name].css')
	] : [
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		new ExtractTextPlugin('css/[name].min.css'),
		new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        })
	],
	resolve: {
		extensions: ['', '.js', '.css', '.scss'],
		alias: {
            bourbon: path.join(__dirname, 'node_modules/bourbon/app/assets/stylesheets/_bourbon.scss'),
            typi: path.join(__dirname, 'node_modules/typi/scss/_typi.scss'),
            normalize: path.join(__dirname, 'node_modules/normalize.css/normalize.css')
        }
	}
};