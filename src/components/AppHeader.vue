<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'dark')
</script>

<template>
  <v-app-bar :elevation="1" height="60">
    <v-container fluid class="py-0">
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <language-switch></language-switch>
        <v-btn
          :icon="isDark ? mdiWeatherSunny : mdiWeatherNight"
          size="small"
          @click="theme.toggle()"
        ></v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>
