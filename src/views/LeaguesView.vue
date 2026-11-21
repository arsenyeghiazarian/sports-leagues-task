<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLeaguesStore } from '@/store/leagues.store.ts'
import LeagueCard from '@/components/LeagueCard.vue'
import LeagueCardSkeleton from '@/components/LeagueCardSkeleton.vue'
import LeagueBadge from '@/components/LeagueBadge.vue'
import type { ILeague } from '@/interfaces/league.interface.ts'
import { usePageTitle } from '@/composables/usePageTitle.ts'
import { useLeagueFilters } from '@/composables/useLeagueFilters.ts'
import LeagueFilters from '@/components/LeagueFilters.vue'
import { useI18n } from 'vue-i18n'
import { mdiMagnifyRemoveOutline } from '@mdi/js'

const SKELETON_COUNT = 6

usePageTitle()

const { t } = useI18n()

const dialogState = ref<boolean>(false)
const selectedLeague = ref<ILeague | null>(null)

const openLeague = (league: ILeague) => {
  selectedLeague.value = league
  dialogState.value = true
}

const leaguesStore = useLeaguesStore()
const { leaguesData, isLeaguesLoading } = storeToRefs(leaguesStore)

const {
  searchQuery,
  selectedSport,
  sportOptions,
  hasMultipleSports,
  filteredLeagues,
  hasActiveFilters,
  clearFilters,
} = useLeagueFilters(leaguesData)

onMounted(() => leaguesStore.getLeaguesData())
</script>

<template>
  <v-container>
    <h1 class="d-sr-only">{{ t('pages.leagues') }}</h1>

    <league-filters
      v-model:search="searchQuery"
      v-model:sport="selectedSport"
      :sports="sportOptions"
      :show-sport-filter="hasMultipleSports"
      :disabled="isLeaguesLoading"
      class="mb-2"
    ></league-filters>

    <v-row>
      <template v-if="isLeaguesLoading">
        <v-col cols="12" sm="6" v-for="n in SKELETON_COUNT" :key="`skeleton-${n}`">
          <league-card-skeleton></league-card-skeleton>
        </v-col>
      </template>
      <v-col v-else-if="!filteredLeagues.length && hasActiveFilters" cols="12">
        <div class="text-center text-medium-emphasis py-12">
          <v-icon :icon="mdiMagnifyRemoveOutline" size="48" class="mb-2"></v-icon>
          <p class="mb-4">{{ t('leagues.noResults') }}</p>
          <v-btn variant="tonal" @click="clearFilters">{{ t('leagues.clearFilters') }}</v-btn>
        </div>
      </v-col>
      <template v-else>
        <v-col cols="12" sm="6" v-for="league in filteredLeagues" :key="league.idLeague">
          <league-card :league @click="openLeague(league)"></league-card>
        </v-col>
      </template>
    </v-row>
    <league-badge v-model="dialogState" :league="selectedLeague"></league-badge>
  </v-container>
</template>
