import { Country } from '@entities/Country'
import { GetCountriesPort } from 'src/searchCountriesByAnimals/GetCountriesPort'
import { data as countries } from './data'

export class CountryRepository implements GetCountriesPort {
  getCountries = (): Country[] => countries
}
