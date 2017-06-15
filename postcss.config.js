const postcssNested = require("postcss-nested");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

module.exports = {
	plugins: [
		autoprefixer({
			browsers: [
				">1%",
				"last 4 versions",
				"Firefox ESR",
				"not ie < 9", // React doesn't support IE8 anyway
			],
		}),
		postcssNested(),
		postcssImport(),
	],
};
