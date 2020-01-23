const path = require("path");

const optimized = true;

module.exports = {
  entry: `./out/compiled/main.js`,
  output: {
    filename: `main.js`,
    path: path.resolve("out/bundled")
  },
  mode: optimized ? "production" : "development",
  devtool: "source-map"
};
