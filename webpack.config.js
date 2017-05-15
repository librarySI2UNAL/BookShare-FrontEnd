var webpack = require( "webpack" );

module.exports = {
    devServer: {
	  host: '0.0.0.0', 
	  port: 8080
	},
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