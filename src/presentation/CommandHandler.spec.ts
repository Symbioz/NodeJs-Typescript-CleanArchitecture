import { resetAllWhenMocks, when } from 'jest-when'

import { CommandHandler } from './CommandHandler'
import { CountAnimalsAndPeople } from './../countAnimalsAndPeople/CountAnimalsAndPeople'
import type { Country } from '@entities/Country'
import { SearchCountriesByAnimals } from 'src/searchCountriesByAnimals/SearchCountriesByAnimals'

describe('Command handler test', () => {
  let searchCountriesByAnimals: jest.MockedObject<SearchCountriesByAnimals>
  let countAnimalsAndPeople: jest.MockedObject<CountAnimalsAndPeople>

  beforeEach(() => {
    searchCountriesByAnimals = {
      execute: jest.fn(),
    } as jest.MockedObject<SearchCountriesByAnimals>

    countAnimalsAndPeople = {
      execute: jest.fn(),
    } as jest.MockedObject<CountAnimalsAndPeople>
  })

  afterEach(() => {
    resetAllWhenMocks()
  })

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

    const commandHandler = new CommandHandler(
      args,
      searchCountriesByAnimals,
      countAnimalsAndPeople,
    )

    // When
    when(searchCountriesByAnimals.execute)
      .calledWith(filter)
      .mockReturnValue(expectedCountries)

    const result = commandHandler.handle()

    // Then
    expect(result).toBe(expectedCountries)
  })

  it('should throw an error when command does not exist', () => {
    // Given
    const args: string[] = ['--unknown=test']

    const commandHandler = new CommandHandler(
      args,
      searchCountriesByAnimals,
      countAnimalsAndPeople,
    )
    const usecaseSpy = jest.spyOn(searchCountriesByAnimals, 'execute')

    // when
    const handling = commandHandler.handle

    // Then
    expect(usecaseSpy).not.toBeCalled()
    expect(() => handling()).toThrow(
      new Error('Invalid arguments, command not found'),
    )
  })

  it('should throw an error when arguments are not formatted', () => {
    // Given
    const args: string[] = ['filter=test']

    const commandHandler = new CommandHandler(
      args,
      searchCountriesByAnimals,
      countAnimalsAndPeople,
    )
    const usecaseSpy = jest.spyOn(searchCountriesByAnimals, 'execute')

    // when
    const handling = commandHandler.handle

    // Then
    expect(usecaseSpy).not.toBeCalled()
    expect(() => handling()).toThrow(
      new Error("Invalid arguments, should start with '--'"),
    )
  })

  it('should throw an error when send several arguments', () => {
    // Given
    const args: string[] = ['--filter=test', '--count']

    const commandHandler = new CommandHandler(
      args,
      searchCountriesByAnimals,
      countAnimalsAndPeople,
    )
    const usecaseSpy = jest.spyOn(searchCountriesByAnimals, 'execute')

    // when
    const handling = commandHandler.handle

    // Then
    expect(usecaseSpy).not.toBeCalled()
    expect(() => handling()).toThrow(
      new Error('Invalid command, only one argument allow'),
    )
  })

  it('should throw an error when send no arguments', () => {
    // Given
    const args: string[] = []

    const commandHandler = new CommandHandler(
      args,
      searchCountriesByAnimals,
      countAnimalsAndPeople,
    )
    const usecaseSpy = jest.spyOn(searchCountriesByAnimals, 'execute')

    // when
    const handling = commandHandler.handle

    // Then
    expect(usecaseSpy).not.toBeCalled()
    expect(() => handling()).toThrow(
      new Error('Invalid command, at least one argument required'),
    )
  })
})
