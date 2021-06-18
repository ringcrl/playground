module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
  },
  globals: {
    PIXI: true,
  },
  ignorePatterns: ['**/libs/*.js'],
  rules: {
    'global-require': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-use-before-define': 0,
    'no-alert': 0,
    camelcase: 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'func-names': 0,
    'import/extensions': 0,
    'no-restricted-syntax': 0,
    'no-loop-func': 0,
    'import/no-dynamic-require': 0,
    '@typescript-eslint/no-loop-func': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-new': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'max-len': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-await-in-loop': 0,
    'no-continue': 0,
    'no-async-promise-executor': 0,
    'no-mixed-operators': 0,
    'consistent-return': 0,
  },
};
