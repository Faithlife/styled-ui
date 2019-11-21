const path = require('path');
const merge = require('lodash.merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const GenerateLocalesListPlugin = require('faithlife-html-component-tools/generate-locales-list-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: {
		'quill-editor': './src/index',
	},

	mode: 'development',

	output: {
		path: path.resolve('./dist'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},

	node: false,

	devtool: 'source-map',

	stats: {
		children: false,
		warningsFilter: /export '.*' was not found in/,
	},

	externals: [
		nodeExternals({
			whitelist: [/\.css$/, /\.svg$/, /\.png$/],
		}),
	],

	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			'quill-editor': path.resolve(__dirname, './src'),
		},
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: true,
						},
					},
					'postcss-loader',
				],
			},

			{
				test: /\.less$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
							url: false,
							importLoaders: 2,
							localIdentName: 'quill_editor_[local]_[hash:base64:5]',
						},
					},
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				use: {
					loader: 'ts-loader',
					options: {
						logLevel: 'error',
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'react-svg-loader',
						options: {
							svgo: {
								plugins: [
									{
										cleanupIDs: false,
									},
								],
							},
						},
					},
				],
			},
			{
				test: /\.(png)$/,
				use: ['file-loader'],
			},
		],
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new CopyWebpackPlugin([
			{
				from: './src/locales',
				to: './locales',
				transform: processLocales,
			},
		]),
		new GenerateLocalesListPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
	],
};

function processLocales(content) {
	const enUS = require('./src/locales/en-US/resources.json');
	return JSON.stringify(merge({}, enUS, JSON.parse(content)), null, '\t');
}
