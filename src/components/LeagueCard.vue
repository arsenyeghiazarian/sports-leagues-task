<script setup lang="ts">
import type { ILeague } from '@/interfaces/league.interface.ts'

defineProps<{ league: ILeague }>()

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <!-- role/tabindex/keydown: a clickable v-card renders a plain <div>, which keyboards can't reach -->
  <v-card
    role="button"
    tabindex="0"
    @click="emit('click')"
    @keydown.enter.prevent="emit('click')"
    @keydown.space.prevent="emit('click')"
  >
    <v-card-title>{{ league.strLeague }}</v-card-title>
    <v-card-text>
      <v-chip>{{ league.strSport }}</v-chip>
    </v-card-text>
  </v-card>
</template>
