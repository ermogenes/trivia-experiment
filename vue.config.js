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
  pwa: {
    name: 'Trivia Experiment',
    themeColor: '#fb3569',
    msTileColor: '#fb3569',
    iconPaths: {
      maskIcon: null,
      msTileImage: null,
    },
    manifestOptions: {
      description: 'A Vue.js game powered by Open Trivia DB and LibreTranslate',
      categories: ['games', 'trivia', 'pwa', 'vue.js'],
      screenshots: [
        {
          src: 'img/screenshots/home.PNG',
          sizes: '890x479',
          type: 'image/png',
        },
        {
          src: 'img/screenshots/tutorial.PNG',
          sizes: '860x457',
          type: 'image/png',
        },
        {
          src: 'img/screenshots/game.PNG',
          sizes: '846x553',
          type: 'image/png',
        },
      ],
    },
  },
};
