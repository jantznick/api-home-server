const webpack = require('webpack');
const path = require('path');

// const oldBrowserConfig = {
// 	entry: "./clientRender.js",
// 	target: "node",
// 	externals: [nodeExternals()],
// 	output: {
// 	  path: __dirname,
// 	  filename: "./public/bundle.js"
// 	},
// 	devtool: "cheap-module-source-map",
// 	module: {
// 		rules: [
// 			{
// 				test: /js$/,
// 				exclude: path.resolve(__dirname, "node_modules"),
// 				loader: "babel-loader",
// 				query: { presets: ["react-app"] }
// 			}
// 		]
// 	},
// 	mode: "development"
// };

const browserConfig = {
	mode: 'development',
	entry: './clientRender.js',
	output: {
		path: __dirname,
		filename: "./public/bundle.js"
	},
};

// const oldServerConfig = {
// 	entry: "./serverRender.js",
// 	target: "node",
// 	externals: [nodeExternals()],
// 	output: {
// 	  path: __dirname,
// 	  filename: "server.js",
// 	  libraryTarget: "commonjs2"
// 	},
// 	devtool: "cheap-module-source-map",
// 	module: {
// 		rules: [
// 			{
// 				test: /js$/,
// 				exclude: path.resolve(__dirname, "node_modules"),
// 				loader: "babel-loader",
// 				query: { presets: ["react-app"] }
// 			}
// 		]
// 	},
// 	mode: "development"
// };

const serverConfig = {
	mode: 'development',
	entry: './app.js',
	output: {
		path: __dirname,
		filename: "server.js",
	},
};

module.exports = [browserConfig, serverConfig];