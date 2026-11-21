export interface ISeason {
  strSeason: string
  strBadge: string | null
}

export interface ISeasonsResponse {
  seasons: ISeason[] | null
}
