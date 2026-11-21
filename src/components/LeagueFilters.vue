<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { mdiMagnify } from '@mdi/js'

const search = defineModel<string | null>('search', { default: '' })
const sport = defineModel<string | null>('sport', { default: null })

defineProps<{
  sports: string[]
  showSportFilter: boolean
  disabled?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <v-row>
    <v-col cols="12" :sm="showSportFilter ? 8 : 12">
      <v-text-field
        v-model="search"
        :label="t('leagues.searchLabel')"
        :prepend-inner-icon="mdiMagnify"
        :disabled="disabled"
        variant="outlined"
        clearable
        hide-details
      ></v-text-field>
    </v-col>
    <v-col v-if="showSportFilter" cols="12" sm="4">
      <v-select
        v-model="sport"
        :items="sports"
        :label="t('leagues.sportLabel')"
        :placeholder="t('leagues.allSports')"
        :disabled="disabled"
        persistent-placeholder
        variant="outlined"
        clearable
        hide-details
      ></v-select>
    </v-col>
  </v-row>
</template>
