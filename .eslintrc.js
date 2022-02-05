module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: '0',
        jsx: '0',
        ts: '0',
        tsx: '0',
      },
    ],
  },
  overrides: [
    {
      files: ['packages/front-end/**/*.js', 'packages/front-end/**/*.jsx'],
      extends: ['plugin:react/recommended'],
      parserOptions: {
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
