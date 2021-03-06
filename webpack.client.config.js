const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		app: "./src/app/client/index.jsx"
	},
	output: {
		path: __dirname + "/src/dist",
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				// Before running any of our loaders, lint our code with ESLint
				enforce: "pre",
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
					configFile: "./.eslintrc.json"
				}
			},
			{
				// transpile our ES6 code with Babel
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				// enable source maps for our transpiled code
				test: /\.jsx?$/,
				loader: 'source-map-loader'
			},
			{
				// extract the CSS we imported as modules and inject it into the transpiled JS code
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: [/\.eot$/, /\.ttf$/, /\.woff2?$/, /\.png$/, /\.svg$/],
				loader: 'file-loader',
				exclude: [/\.js$/, /\.html$/, /\.json$/],
				options: {
					name: 'static/media/[name].[ext]'
				},
			}
		]
	},
	plugins: [
		// injects our bundled JS code into our HTML file inside a <script> tag
		new HtmlWebpackPlugin({
			inject: true,
			template: './src/app/client/index.html',
			favicon: './src/app/client/favicon.ico'
		}),
		// enable hot replacement on our dev server
		new webpack.HotModuleReplacementPlugin()
	],
	target: 'web',
	stats: {
		modules: true,
		reasons: true
	},
	resolve: {
		alias: {
			'components': path.resolve(__dirname, './src/app/client/components'),
			'frames': path.resolve(__dirname, './src/app/client/frames'),
			'utils': path.resolve(__dirname, './src/app/client/utils')
		},
		extensions: ['.jsx', '.js']
	},
	devtool: 'source-map',
	// configure a dev server that can watch and reload when files change
	devServer: {
		port: 3000,
		compress: true,
		contentBase: __dirname + '/src/dist',
		watchContentBase: true,
		hot: true
	}
};
