module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['standard', 'standard-jsx', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['html', 'react-refresh', 'prettier'],
};
