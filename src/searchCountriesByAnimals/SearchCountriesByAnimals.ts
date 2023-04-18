import { Animal } from '@entities/Animal'
import { Country } from '@entities/Country'
import { GetCountriesPort } from './GetCountriesPort'
import { Person } from '@entities/Person'
import { SearchCountriesByAnimalsRequest } from './SearchCountriesByAnimalsRequest'
import { Usecase } from 'src/usecase/Usecase'

export class SearchCountriesByAnimals
  implements Usecase<SearchCountriesByAnimalsRequest, Country[] | void>
{
  constructor(private readonly getCountriesPort: GetCountriesPort) {}

  execute = (
    animalNameFilter: SearchCountriesByAnimalsRequest,
  ): Country[] | void => {
    const countries = this.getCountriesPort.getCountries()

    const result = countries.reduce((filteredCountries, currentCountry) => {
      const matchingAnimalPeople = this.getPeopleWithMatchingAnimal(
        currentCountry.people,
        animalNameFilter,
      )

      matchingAnimalPeople.length &&
        filteredCountries.push({
          ...currentCountry,
          people: matchingAnimalPeople,
        })

      return filteredCountries
    }, [] as Country[])

    if (result.length) {
      return result
    }
  }

  private getPeopleWithMatchingAnimal = (
    people: Person[],
    animalName: string,
  ): Person[] => {
    return people.reduce((matchingPeople, currentPerson) => {
      const animals = this.getMatchingAnimals(currentPerson, animalName)

      if (animals.length) {
        matchingPeople.push({
          ...currentPerson,
          animals,
        })
      }
      return matchingPeople
    }, [] as Person[])
  }

  private getMatchingAnimals(
    currentPerson: Person,
    animalName: string,
  ): Animal[] {
    return currentPerson.animals.filter(({ name }) => name.includes(animalName))
  }
}
