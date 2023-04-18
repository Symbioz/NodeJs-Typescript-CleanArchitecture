import { CommandHandler } from './presentation/CommandHandler'
import { CountryRepository } from './infrastructure/CountryRepository'
import { SearchCountriesByAnimals } from './searchCountriesByAnimals/SearchCountriesByAnimals'

const countryRepository = new CountryRepository()

const searchCountriesByAnimals = new SearchCountriesByAnimals(countryRepository)

const commandHandler = new CommandHandler(
  process.argv.slice(2),
  searchCountriesByAnimals,
)

console.dir(commandHandler.handle(), { depth: null, colors: true })
