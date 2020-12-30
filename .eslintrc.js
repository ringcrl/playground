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
  },
};
