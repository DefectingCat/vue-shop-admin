module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 240000,
      },
    },
  },
};
