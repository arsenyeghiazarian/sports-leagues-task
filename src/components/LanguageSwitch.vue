<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { mdiTranslate } from '@mdi/js'

const { locale } = useI18n()

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
]

function changeLanguage(lang: string) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="props" size="small" :icon="mdiTranslate" variant="text"></v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="lang in languages"
        :key="lang.code"
        :active="locale === lang.code"
        @click="changeLanguage(lang.code)"
      >
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
