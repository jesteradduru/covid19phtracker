const Webpack = require("webpack");
module.exports = {
  entry: {
    main: "./src/app.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|pdf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
