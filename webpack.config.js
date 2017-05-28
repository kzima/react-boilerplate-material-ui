const { resolve } = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = {
	entry: [
		// activate HMR for React
		"react-hot-loader/patch",

		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint
		"webpack-dev-server/client?http://localhost:3000",

		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates
		"webpack/hot/only-dev-server",

		// the entry point of our app
		"./index.js",
	],
	resolve: {
		extensions: [".js", ".jsx"],
	},
	output: {
		filename: "bundle.js",

		// the output bundle
		path: resolve(__dirname),

		publicPath: "/",
		// necessary for HMR to know where to load the hot update chunks
	},
	context: resolve(__dirname, "src"),
	devtool: "inline-source-map",
	devServer: {
		hot: true,
		// enable HMR on the server

		contentBase: resolve(__dirname),
		// match the output path

		publicPath: "/",
		// match the output `publicPath`

		// fallback to root for other urls
		historyApiFallback: true,
	},
	module: {
		rules: [
			// Disable require.ensure as it's not a standard language feature.
			{ parser: { requireEnsure: false } },

			// ** ADDING/UPDATING LOADERS **
			// The "url" loader handles all assets unless explicitly excluded.
			// The `exclude` list *must* be updated with every change to loader extensions.
			// When adding a new loader, you must add its `test`
			// as a new entry in the `exclude` list for "url" loader.

			// "file" loader makes sure those assets get served by WebpackDevServer.
			// When you `import` an asset, you get its (virtual) filename.
			// In production, they would get copied to the `build` folder.
			{
				exclude: [
					/\.html$/,
					/\.(js|jsx)$/,
					/\.css$/,
					/\.json$/,
					/\.bmp$/,
					/\.gif$/,
					/\.jpe?g$/,
					/\.png$/,
				],
				loader: "file-loader",
				options: {
					name: "static/media/[name].[hash:8].[ext]",
				},
			},
			// "url" loader works like "file" loader except that it embeds assets
			// smaller than specified limit in bytes as data URLs to avoid requests.
			// A missing `test` is equivalent to a match.
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "static/media/[name].[hash:8].[ext]",
				},
			},
					// Process JS with Babel.
			{
				test: /\.(js|jsx)$/,
				include: resolve(__dirname, "src"),
				loader: "babel-loader",
				options: {

					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					cacheDirectory: true,
				},
			},
			// "postcss" loader applies autoprefixer to our CSS.
			// "css" loader resolves paths in CSS and adds assets as dependencies.
			// "style" loader turns CSS into JS modules that inject <style> tags.
			// In production, we use a plugin to extract that CSS to a file, but
			// in development "style" loader enables hot editing of CSS.
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: true,
							localIdentName: "[path][name]__[local]--[hash:base64:5]",
						},
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
							plugins: () => [
								autoprefixer({
									browsers: [
										">1%",
										"last 4 versions",
										"Firefox ESR",
										"not ie < 9", // React doesn't support IE8 anyway
									],
								}),
							],
						},
					},
				],
			},
			// ** STOP ** Are you adding a new loader?
			// Remember to add the new extension(s) to the "url" loader exclusion list.
		],
	},
	plugins: [
		// Makes some environment variables available in index.html.
		// The public URL is available as %PUBLIC_URL% in index.html, e.g.:
		// <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
		// In development, this will be an empty string.
		// new InterpolateHtmlPlugin([{"PUBLIC_URL": "/"}]),

		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			template: resolve(__dirname, "public/index.html"),
		}),

		// enable HMR globally
		new webpack.HotModuleReplacementPlugin(),

		// prints more readable module names in the browser console on HMR updates
		// Makes some environment variables available to the JS code, for example:
		// if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
		// new webpack.NamedModulesPlugin(),

		// Watcher doesn't work well if you mistype casing in a path so we use
		// a plugin that prints an error when you attempt to do this.
		// See https://github.com/facebookincubator/create-react-app/issues/240
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		}),

		// If you require a missing module and then `npm install` it, you still have
		// to restart the development server for Webpack to discover it. This plugin
		// makes the discovery automatic so you don't have to restart.
		// See https://github.com/facebookincubator/create-react-app/issues/186
		new CaseSensitivePathsPlugin(),

		new WatchMissingNodeModulesPlugin(resolve(__dirname, "node_modules")),
	],
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty",
	},
	// Turn off performance hints during development because we don't do any
	// splitting or minification in interest of speed. These warnings become
	// cumbersome.
	performance: {
		hints: false,
	},
};
