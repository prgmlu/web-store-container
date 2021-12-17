const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { loadConfig } = require('../configs');
const deps = require('../package.json').dependencies;

module.exports = {
	entry: './src/index.jsx',
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '../dist'),
		publicPath: 'http://localhost:3000/',
		clean: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json', '.css', '.scss'],
	},
	optimization: {
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
			},
		},
	},
	module: {
		rules: [
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
				// threejs_scene: 'threejs_scene@http://localhost:4000/remoteEntry.js',
				threejs_scene:
					'threejs_scene@https://modules.obsess-vr.com/beta/ObsessVR/npm-modules/threejs-scene/feature/wp-federated/remoteEntry.js',
				base_components:
					'base_components@https://modules.obsess-vr.com/beta/ObsessVR/v2/component-library/base-components/main/remoteEntry.js',
				// 'base_components@http://localhost:3003/remoteEntry.js',
			},
			shared: {
				...deps,
				react: {
					requiredVersion: deps.react,
					import: 'react',
					shareKey: 'react',
					shareScope: 'default',
					singleton: true,
					eager: true,
				},
				'react-dom': {
					requiredVersion: deps['react-dom'],
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
