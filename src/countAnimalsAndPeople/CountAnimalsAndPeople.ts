import type { Country } from '@entities/Country'
import { GetCountriesPort } from './GetCountriesPort'
import type { Person } from '@entities/Person'
import type { Usecase } from 'src/usecase/Usecase'

export class CountAnimalsAndPeople implements Usecase<undefined, Country[]> {
  constructor(private readonly getCountriesPort: GetCountriesPort) {}

  execute = (): Country[] => {
    const countries = this.getCountriesPort.getCountries()

    return countries.map(this.mapCountryToCountryWithCount)
  }

  private mapCountryToCountryWithCount = ({
    name,
    people,
  }: Country): Country => {
    return {
      name: `${name} [${people.length}]`,
      people: people.map(this.mapPeopleToPeopleWithCount),
    }
  }

  private mapPeopleToPeopleWithCount = (people: Person): Person => {
    return {
      ...people,
      name: `${people.name} [${people.animals.length}]`,
    }
  }
}
