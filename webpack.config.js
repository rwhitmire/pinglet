module.exports = {
  context: __dirname,
  entry: "./client/main",
  output: {
    path: __dirname + "/public/javascripts",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.hbs?$/, exclude: /node_modules/, loader: 'handlebars-loader' },
    ]
  }
};
