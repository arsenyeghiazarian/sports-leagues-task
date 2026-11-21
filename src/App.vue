<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import GlobalError from '@/components/GlobalError.vue'

const { locale } = useI18n()

// Keep <html lang> in sync with the selected language (screen readers, SEO)
watchEffect(() => {
  document.documentElement.lang = locale.value
})
</script>
<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <app-footer />

    <global-error />
  </v-app>
</template>
