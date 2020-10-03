'use strict';
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    {
      name: 'scss',
      options: {
        postcss: {
          dev: {
            sourceMap: true,
            ident: 'postcss',
          },
          prod: {
            sourceMap: false,
            ident: 'postcss',
          },
          plugins: [
            autoprefixer({
              overrideBrowserslist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    },
  ],
};
