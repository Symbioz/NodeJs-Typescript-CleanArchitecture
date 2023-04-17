import { Country } from '@entities/Country'

export interface GetCountriesPort {
  getCountries: () => Country[]
}
