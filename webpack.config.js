const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './components/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve('./dist'),
		libraryTarget: 'commonjs-module',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader?modules', 'less-loader'],
					fallback: 'style-loader',
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			disable: process.env.NODE_ENV === 'dev',
			filename: '[name].css',
		}),
	],
};
