module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/shop-admin/' : '/',
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 240000,
      },
    },
  },
};
