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
  },
};
