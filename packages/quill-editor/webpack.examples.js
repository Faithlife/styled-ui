'use strict';

const path = require('path');
const tools = require('faithlife-html-component-tools');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign({}, webpackConfig, {
	entry: tools.getExamplesEntries(),
	output: {
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
		path: path.resolve(__dirname, './examples/__build__'),
		publicPath: '/__build__/',
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	node: {},
	externals: {},
	devServer: {
		host: 'localhost',
		port: '8086',
		historyApiFallback: {
			index: '/basic/index.html',
		},
		overlay: true,
		stats: {
			all: false,
			assets: true,
			errors: true,
			errorDetails: true,
			timings: true,
			warnings: true,
			excludeAssets: assetName => assetName.startsWith('dist') || assetName.startsWith('locales'),
		},
	},
});
