<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

const theme = useTheme()
const { t } = useI18n()
const isDark = computed(() => theme.global.name.value === 'dark')
</script>

<template>
  <v-app-bar :elevation="1" height="60">
    <v-container fluid class="py-0">
      <div class="d-flex align-center">
        <router-link to="/" class="app-title text-h6 text-high-emphasis">
          {{ t('header.title') }}
        </router-link>
        <v-spacer></v-spacer>
        <language-switch></language-switch>
        <v-btn
          :icon="isDark ? mdiWeatherSunny : mdiWeatherNight"
          :aria-label="t(isDark ? 'header.lightTheme' : 'header.darkTheme')"
          size="small"
          @click="theme.toggle()"
        ></v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.app-title {
  text-decoration: none;
}
</style>
