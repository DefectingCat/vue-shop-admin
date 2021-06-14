/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
  // chainWebpack: (config) => {
  //   config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
  // },
};
