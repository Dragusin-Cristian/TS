const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
//   mode:  "development",
  mode:  "production", //* production
  entry: "./src/section_11_Webpack/app.ts",
  output: {
    filename: "bundle.js", //* or bundle.[contenthash].js to create a unique hash foreach build
    path: path.resolve(__dirname, "dist"), //* has to be the same as in outdir field from tsconfig, but we use the absolute path here
    // publicPath: "dist", //* where to search for the build in live server mode (used for development)
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
//   devtool: "inline-source-map", //* this need "sourceMap": true in tsconfig (really helps for debugging, when using the debugger in browser) // it seems it works without it too (used for development)
devtool: "none", //* production
  module: {
    rules: [
      {
        test: /\.ts$/, //* check if this rule applies to every file in the project (if they end with .ts)
        use: "ts-loader", //* use tells what webpack should do with those files (they should be handled by the ts-loader)
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    //* what extensions should use on imports (by default is .js)
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin() //* for production // it deletes everything in the dist folder before writing something new 
  ]
};
