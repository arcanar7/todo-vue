module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['sonarjs'],
  extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:sonarjs/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 'off' }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'object-curly-newline': ['off'],
    'max-len': ['off'],
  },
};
