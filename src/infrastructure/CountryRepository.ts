import { GetCountriesPort } from 'src/searchCountriesByAnimals/GetCountriesPort'
import { data } from './data'

export class CountryRepository implements GetCountriesPort {
  getCountries = () => data
}
