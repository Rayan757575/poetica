// Config "flat" do ESLint 9 (o antigo .eslintrc.json não é mais lido a
// partir da v9). Segue o padrão da doc do Expo:
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', '.expo/*', 'node_modules/*'],
  },
]);
