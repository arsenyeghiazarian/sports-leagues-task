<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLeaguesStore } from '@/store/leagues.store.ts'
import LeagueCard from '@/components/LeagueCard.vue'
import LeagueCardSkeleton from '@/components/LeagueCardSkeleton.vue'
import { usePageTitle } from '@/composables/usePageTitle.ts'

const SKELETON_COUNT = 6

usePageTitle()

const leaguesStore = useLeaguesStore()
const { leaguesData, isLeaguesLoading } = storeToRefs(leaguesStore)

onMounted(() => leaguesStore.getLeaguesData())
</script>

<template>
  <v-container>
    <v-row>
      <template v-if="isLeaguesLoading">
        <v-col cols="12" sm="6" v-for="n in SKELETON_COUNT" :key="`skeleton-${n}`">
          <league-card-skeleton></league-card-skeleton>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" sm="6" v-for="league in leaguesData" :key="league.idLeague">
          <league-card :league></league-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
