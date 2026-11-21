<script setup lang="ts">
import type { ILeague } from '@/interfaces/league.interface.ts'

defineProps<{ league: ILeague }>()
</script>

<template>
  <v-card>
    <v-card-title>{{ league.strLeague }}</v-card-title>
    <v-card-text>
      <v-chip>{{ league.strSport }}</v-chip>
    </v-card-text>
  </v-card>
</template>
