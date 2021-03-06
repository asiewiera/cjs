module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      // "prettier/prettier" rule from "eslint-plugin-prettier"
      'error', // violation of the rule will cause an error
      {
        singleQuote: true, // option that sets single quotes as the valid quotes
      },
    ],
    'react/jsx-filename-extension': [
      // "react/jsx-filename-extension" rule from "eslint-plugin-react"
      'warn', // violation of the rule will cause a warning
      {
        extensions: ['.js', '.jsx'], // option to allow using JSX syntax within both ".js" and ".jsx" file extensions
      },
    ],
    'react/button-has-type': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
