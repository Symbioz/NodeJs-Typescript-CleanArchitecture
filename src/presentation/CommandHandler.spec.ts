import { CommandHandler } from './CommandHandler'
import type { Country } from '@entities/Country'
import { SearchCountriesByAnimals } from 'src/searchCountriesByAnimals/SearchCountriesByAnimals'
import { when } from 'jest-when'

describe('Command handler test', () => {
  const searchCountriesByAnimals = {
    execute: jest.fn(),
  } as jest.MockedObject<SearchCountriesByAnimals>

  it('should do the searchCountriesByAnimals command', () => {
    // Given
    const filter = 'ry'
    const args: string[] = [`--filter=${filter}`]
    const expectedCountries: Country[] = [
      {
        name: 'Dillauti',
        people: [
          {
            name: 'Winifred Graham',
            animals: [
              { name: 'Anoa' },
              { name: 'Duck' },
              { name: 'Narwhal' },
              { name: 'Badger' },
              { name: 'Cobra' },
              { name: 'Crow' },
            ],
          },
        ],
      },
    ]

    const commandHandler = new CommandHandler(args, searchCountriesByAnimals)

    // When
    when(searchCountriesByAnimals.execute)
      .calledWith(filter)
      .mockReturnValue(expectedCountries)

    const result = commandHandler.handle()

    // Then
    expect(result).toBe(expectedCountries)
  })
})
