<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { mdiClose, mdiImageOffOutline } from '@mdi/js'
import { useLeaguesStore } from '@/store/leagues.store.ts'
import type { ILeague } from '@/interfaces/league.interface.ts'
import type { ISeason } from '@/interfaces/season.interface.ts'

type SeasonWithBadge = ISeason & { strBadge: string }

const dialogModel = defineModel<boolean>({ default: false })
const props = defineProps<{ league: ILeague | null }>()

const { t } = useI18n()
const leaguesStore = useLeaguesStore()
const { isSeasonsLoading } = storeToRefs(leaguesStore)

const selectedSeason = ref<string | null>(null)

const seasonsWithBadge = computed<SeasonWithBadge[]>(() => {
  if (!props.league) return []
  return leaguesStore
    .getSeasons(props.league.idLeague)
    .filter((season): season is SeasonWithBadge => !!season.strBadge)
    .reverse()
})

const selectedBadge = computed(
  () => seasonsWithBadge.value.find((season) => season.strSeason === selectedSeason.value) ?? null,
)

watch(
  [dialogModel, () => props.league?.idLeague],
  async ([isOpen, leagueId]) => {
    if (!isOpen || !leagueId) return
    selectedSeason.value = null
    await leaguesStore.getLeagueSeasons(leagueId)
    selectedSeason.value = seasonsWithBadge.value[0]?.strSeason ?? null
  },
  { immediate: true },
)
</script>

<template>
  <v-dialog v-model="dialogModel" max-width="800">
    <v-card v-if="league">
      <v-card-item>
        <v-card-title class="text-wrap">{{ league.strLeague }}</v-card-title>
        <v-card-subtitle>{{ league.strSport }}</v-card-subtitle>
        <template #append>
          <v-btn
            :icon="mdiClose"
            :aria-label="t('common.close')"
            variant="text"
            size="small"
            @click="dialogModel = false"
          ></v-btn>
        </template>
      </v-card-item>

      <v-card-text>
        <template v-if="isSeasonsLoading">
          <v-skeleton-loader type="chip@4" class="mb-4"></v-skeleton-loader>
          <v-skeleton-loader type="image" height="260"></v-skeleton-loader>
        </template>

        <div v-else-if="!seasonsWithBadge.length" class="text-center text-medium-emphasis py-8">
          <v-icon :icon="mdiImageOffOutline" size="48" class="mb-2"></v-icon>
          <p>{{ t('leagueBadge.noBadges') }}</p>
        </div>

        <template v-else>
          <div class="season-toggle-wrapper">
            <v-btn-toggle
              v-model="selectedSeason"
              :aria-label="t('leagueBadge.seasons')"
              color="primary"
              variant="outlined"
              divided
              mandatory
            >
              <v-btn
                v-for="season in seasonsWithBadge"
                :key="season.strSeason"
                :value="season.strSeason"
                class="text-none"
              >
                {{ season.strSeason }}
              </v-btn>
            </v-btn-toggle>
          </div>

          <v-img
            v-if="selectedBadge"
            :key="selectedBadge.strBadge"
            :src="selectedBadge.strBadge"
            :alt="
              t('leagueBadge.badgeAlt', {
                league: league.strLeague,
                season: selectedBadge.strSeason,
              })
            "
            height="260"
            class="mt-4"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-img>
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Lets the button group scroll sideways when a league has many seasons */
.season-toggle-wrapper {
  overflow-x: auto;
}

/* Vuetify caps the group at 100% width, which clips the buttons instead of scrolling */
.season-toggle-wrapper > .v-btn-toggle {
  max-width: none;
}
</style>
