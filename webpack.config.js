const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		main: './components/main.js',
		deprecated: './components/deprecated/index.js',
		'ag-grid': './components/grid/index.js',
		'text-input': './components/text-input/index.js',
	},
	devtool: 'sourcemap',
	output: {
		filename: '[name].js',
		path: path.resolve('./dist'),
		libraryTarget: 'commonjs-module',
	},
	externals: [nodeExternals()],
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.scss?$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [
									{ cleanupAttrs: true },
									{ removeDoctype: true },
									{ removeComments: true },
									{ removeMetadata: true },
									{ removeTitle: true },
									{ removeDesc: true },
									{ removeEditorsNSData: true },
									{ removeUselessStrokeAndFill: true },
									{ cleanupIDs: true },
									{ collapseGroups: true },
									{ convertShapeToPath: true },
								],
							},
						},
					},
					{
						loader: 'svg-colorize-loader',
						options: {
							color1: '#000000',
							color2: '#FFFFFF',
						},
					},
				],
			},
		],
	},
};
