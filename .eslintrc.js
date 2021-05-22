export default {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es2020: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  overrides: [
    {
      files: '*.cjs',
      env: {
        node: true
      }
    },
    {
      files: 'demo/public/**',
      env: {
        node: false,
        browser: true
      }
    }
  ]
}
