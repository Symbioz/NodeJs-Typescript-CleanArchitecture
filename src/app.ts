import { CommandHandler } from './presentation/CommandHandler'
import { CountAnimalsAndPeople } from './countAnimalsAndPeople/CountAnimalsAndPeople'
import { CountryRepository } from './infrastructure/CountryRepository'
import { SearchCountriesByAnimals } from './searchCountriesByAnimals/SearchCountriesByAnimals'

const countryRepository = new CountryRepository()

const searchCountriesByAnimals = new SearchCountriesByAnimals(countryRepository)
const countAnimalsAndPeople = new CountAnimalsAndPeople(countryRepository)

const commandHandler = new CommandHandler(
  process.argv.slice(2),
  searchCountriesByAnimals,
  countAnimalsAndPeople,
)

console.dir(commandHandler.handle(), { depth: null, colors: true })
