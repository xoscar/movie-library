const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  plugins: ['prettier'],
  extends: ['next/core-web-vitals', 'prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  ignorePatterns: ['.eslintrc.js'],
};
