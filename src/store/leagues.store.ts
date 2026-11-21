import { defineStore } from 'pinia'
import { ref } from 'vue'
import LeaguesService from '@/services/leagues.service.ts'
import { handleError } from '@/utils/errorHandler.ts'
import type { ILeague } from '@/interfaces/league.interface.ts'
import type { ISeason } from '@/interfaces/season.interface.ts'

type LeagueId = ILeague['idLeague']

export const useLeaguesStore = defineStore('leagues', () => {
  const leaguesData = ref<ILeague[]>([])
  const isLeaguesLoading = ref<boolean>(false)

  const seasonsByLeague = ref<Record<LeagueId, ISeason[]>>({})
  const isSeasonsLoading = ref<boolean>(false)

  const pendingSeasons = new Map<LeagueId, Promise<void>>()

  const getLeaguesData = async (force = false) => {
    if (leaguesData.value.length && !force) return

    isLeaguesLoading.value = true
    try {
      const response = await LeaguesService.getAllLeagues()
      leaguesData.value = response.leagues
    } catch (error) {
      handleError(error)
    } finally {
      isLeaguesLoading.value = false
    }
  }

  const getLeagueSeasons = async (leagueId: LeagueId) => {
    if (seasonsByLeague.value[leagueId]) return

    let request = pendingSeasons.get(leagueId)
    if (!request) {
      request = LeaguesService.getLeagueSeasons(leagueId)
        .then((response) => {
          seasonsByLeague.value[leagueId] = response.seasons ?? []
        })
        .finally(() => pendingSeasons.delete(leagueId))
      pendingSeasons.set(leagueId, request)
    }

    isSeasonsLoading.value = true
    try {
      await request
    } catch (error) {
      handleError(error)
    } finally {
      isSeasonsLoading.value = pendingSeasons.size > 0
    }
  }

  const getSeasons = (leagueId: LeagueId): ISeason[] => seasonsByLeague.value[leagueId] ?? []

  return {
    leaguesData,
    isLeaguesLoading,
    getLeaguesData,
    seasonsByLeague,
    isSeasonsLoading,
    getLeagueSeasons,
    getSeasons,
  }
})
