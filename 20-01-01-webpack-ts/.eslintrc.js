const path = require('path');

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  parserOptions: {
    createDefaultProgram: true,
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};
