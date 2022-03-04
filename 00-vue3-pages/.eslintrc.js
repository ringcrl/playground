module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 0,
    'vuejs-accessibility/click-events-have-key-events': 0,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'global-require': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'no-useless-constructor': 0,
    'no-underscore-dangle': 0,
    'vuejs-accessibility/form-control-has-label': 0,
  },
};
