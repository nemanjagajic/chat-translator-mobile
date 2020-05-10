module.exports = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 10,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'object-curly-spacing': [2, 'always']
  }
}
