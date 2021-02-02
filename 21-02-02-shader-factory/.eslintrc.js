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
  rules: {
    'import/no-cycle': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
  },
};
