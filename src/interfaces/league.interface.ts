export interface ILeague {
  idLeague: string
  strLeague: string
  strSport: string
}

export interface ILeaguesResponse {
  leagues: ILeague[]
}
