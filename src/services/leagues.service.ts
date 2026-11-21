import HttpService from '@/services/http.service.ts'
import type { ILeague, ILeaguesResponse } from '@/interfaces/league.interface.ts'
import type { ISeasonsResponse } from '@/interfaces/season.interface.ts'

const LeaguesService = {
  getAllLeagues: async (): Promise<ILeaguesResponse> => {
    const { data } = await HttpService.get<ILeaguesResponse>('all_leagues.php')
    return data
  },
  getLeagueSeasons: async (leagueId: ILeague['idLeague']): Promise<ISeasonsResponse> => {
    const { data } = await HttpService.get<ISeasonsResponse>('search_all_seasons.php', {
      params: { id: leagueId, badge: 1 },
    })
    return data
  },
}

export default LeaguesService
