const path = require('path');

module.exports = {
  // ...другие настройки конфигурации Webpack...

  module: {
    rules: [
      // ...другие правила...

      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  // ...другие настройки конфигурации Webpack...

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'), // Пример псевдонима для удобного импорта компонентов
    },
  },
};
