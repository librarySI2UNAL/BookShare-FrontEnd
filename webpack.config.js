var webpack = require( "webpack" );

module.exports = {
	entry: "./src/main.ts",
	output: {
		path: "./dist",
		filename: "app.bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ["raw-loader", "sass-loader"]
			}
		]
	}
};