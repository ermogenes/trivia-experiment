module.exports = {
  publicPath: '/trivia-experiment/',

  // https://github.com/vuejs/vue-cli/issues/6394
  chainWebpack: (config) => {
    // fix publicPath for assets
    config.module
      .rule('images')
      .use('url-loader')
      .tap((options) => {
        const newOptions = options;
        newOptions.publicPath = '/trivia-experiment/';
        return newOptions;
      });
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap((options) => {
        const newOptions = options;
        newOptions.publicPath = '/trivia-experiment/';
        return newOptions;
      });
    config.module
      .rule('svg')
      .use('file-loader')
      .tap((options) => {
        const newOptions = options;
        newOptions.publicPath = '/trivia-experiment/';
        return newOptions;
      });
  },
};
