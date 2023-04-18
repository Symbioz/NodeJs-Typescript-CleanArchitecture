import type { Country } from '@entities/Country'

export interface GetCountriesPort {
  getCountries: () => Country[]
}
