import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    name: 'app/custom-rules',
    rules: {
      'no-console': 'error',
      'vue/v-slot-style': [
        'error',
        { atComponent: 'shorthand', default: 'shorthand', named: 'shorthand' },
      ],
    },
  },

  // Turn off ESLint rules that oxlint already covers (oxlint runs first via `lint:oxlint`)
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // Disable stylistic rules that conflict with Prettier — must stay last
  skipFormatting,
)
