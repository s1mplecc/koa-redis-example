module.exports = {
  extends: 'airbnb-base',
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow unused variables during development
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // disallow trailing commas
    'comma-dangle': ['error', 'never'],
    // disallow trailing semi
    'semi': ['error', 'never'],
    // allow the unary operators ++ and --
    'no-plusplus': 'off',
    'max-len': [0, 150]
  }
}