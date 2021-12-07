const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { loadConfig } = require('./configs');

module.exports = {
	entry: './src/index.jsx',
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: 'http://localhost:3000/',
		clean: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
	},
	optimization: {
		minimize: true,
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				reactVendor: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'vendor_react',
				},
				utilityVendor: {
					test: /[\\/]node_modules[\\/](axios|react-redux|redux)[\\/]/,
					name: 'vendor_utility',
				},
				bootstrapVendor: {
					test: /[\\/]node_modules[\\/](react-bootstrap|bootstrap)[\\/]/,
					name: 'vendor_bootstrap',
				},
				threejsScene: {
					test: /[\\/]node_modules[\\/](threejs-scene)[\\/]/,
					name: 'vendor_threejsScene',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif|jpeg)$/,
				loader: 'url-loader',
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-react'],
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'web-store-container',
			remotes: {
				threejs_scene: 'threejs_scene@http://localhost:4000/remoteEntry.js',
				obsess_modules: 'obsess_modules@http://localhost:3001/remoteEntry.js',
			},
			shared: {
				react: {
					import: 'react',
					singleton: true,
					shareScope: 'default',
					requiredVersion: '^17.0.2',
				},
				'react-dom': {
					import: 'react-dom',
					shareScope: 'default',
					singleton: true,
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin(),
	],
	devServer: {
		port: 3000,
		historyApiFallback: true,
	},
	externals: {
		config: JSON.stringify(loadConfig('development')),
	},
};
