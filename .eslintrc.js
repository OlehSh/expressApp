module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    'func-names': ['error', 'never'],
    'require-await': 'error',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'linebreak-style': 'off',
    'no-extra-parens': 'error',
    'no-else-return': 'error',
    'no-param-reassign': ['error', { "props": false }],
    'array-bracket-spacing': 'error',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'max-len': ['error', 180]
  },
  overrides: [
    {
      files: ["./**/*.js"],
    }
  ]
}
