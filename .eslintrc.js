module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
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
  },
};
