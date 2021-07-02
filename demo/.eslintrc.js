export default {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es2021: true
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
      files: 'cypress/**',
      extends: ['plugin:cypress/recommended']
    },
    {
      files: 'src/assets/**',
      env: {
        node: false,
        browser: true
      }
    }
  ]
}
