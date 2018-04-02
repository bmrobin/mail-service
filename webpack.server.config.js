module.exports = {
	entry: {
		server: "./src/app/server/server.js"
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
			}
		]
	},
	target: 'node',
	stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
		modules: false,
		moduleTrace: false,
    reasons: true,
    errors: true,
    warnings: true,
  },
	resolve: {
		extensions: ['.js']
	}
};
