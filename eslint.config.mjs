// @ts-check
import { globalIgnores } from 'eslint/config'
import eslintConfig from './.nuxt/eslint.config.mjs'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'

export default eslintConfig(
        {
        rules: {
            "vue/html-self-closing": [
                "error",
                {
                    html: {
                        void: "always",
                    },
                },
            ],
        },
    },

  globalIgnores(['**/coverage/**']),

  {
    ...pluginVitest.configs.recommended,
    files: ['**/__tests__/**/*', '**/*.{test,spec}.{ts,tsx,js,mjs}'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
)