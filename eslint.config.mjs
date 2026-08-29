// @ts-check
import { globalIgnores } from 'eslint/config'
import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'

export default withNuxt(
  globalIgnores(['**/coverage/**']),

  {
    ...pluginVitest.configs.recommended,
    files: ['**/__tests__/**/*', '**/*.{test,spec}.{ts,tsx,js,mjs}'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
)