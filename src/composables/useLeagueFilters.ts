import { computed, ref, watch, type Ref } from 'vue'
import type { ILeague } from '@/interfaces/league.interface.ts'

export function useLeagueFilters(leagues: Ref<ILeague[]>) {
  const searchQuery = ref<string | null>('')
  const selectedSport = ref<string | null>(null)

  const sportOptions = computed(() =>
    [...new Set(leagues.value.map((league) => league.strSport))].sort((a, b) => a.localeCompare(b)),
  )

  const hasMultipleSports = computed(() => sportOptions.value.length > 1)

  const filteredLeagues = computed(() => {
    const query = searchQuery.value?.trim().toLocaleLowerCase() ?? ''

    return leagues.value.filter((league) => {
      const matchesName = !query || league.strLeague.toLocaleLowerCase().includes(query)
      const matchesSport = !selectedSport.value || league.strSport === selectedSport.value
      return matchesName && matchesSport
    })
  })

  const hasActiveFilters = computed(() => !!searchQuery.value?.trim() || !!selectedSport.value)

  const clearFilters = () => {
    searchQuery.value = ''
    selectedSport.value = null
  }

  watch(sportOptions, (options) => {
    if (selectedSport.value && !options.includes(selectedSport.value)) {
      selectedSport.value = null
    }
  })

  return {
    searchQuery,
    selectedSport,
    sportOptions,
    hasMultipleSports,
    filteredLeagues,
    hasActiveFilters,
    clearFilters,
  }
}
