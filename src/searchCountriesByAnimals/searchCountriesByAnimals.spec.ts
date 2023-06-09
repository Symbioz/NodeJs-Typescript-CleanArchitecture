import type { Country } from '@entities/Country'
import { GetCountriesPort } from './GetCountriesPort'
import { SearchCountriesByAnimals } from './SearchCountriesByAnimals'
import { testData1 } from '../test/testData'

describe('search countries by animals usecase', () => {
  const getCountriesMock: jest.MockedObject<GetCountriesPort> = {
    getCountries: jest.fn(),
  }
  const searchCountriesByAnimals = new SearchCountriesByAnimals(
    getCountriesMock,
  )

  it('should return the right list of countries', () => {
    // Given
    const animalName = 'ry'
    const expectedResult: Country[] = [
      {
        name: 'Uzuzozne',
        people: [
          {
            name: 'Lillie Abbott',
            animals: [
              {
                name: 'John Dory',
              },
            ],
          },
        ],
      },
      {
        name: 'Satanwi',
        people: [
          {
            name: 'Anthony Bruno',
            animals: [
              {
                name: 'Oryx',
              },
              {
                name: 'Ota-ry',
              },
            ],
          },
        ],
      },
    ]

    // When
    getCountriesMock.getCountries.mockReturnValueOnce(testData1)
    const result = searchCountriesByAnimals.execute(animalName)

    // Then
    expect(result).toEqual(expectedResult)
  })

  it('should not return empty array when no countries are found', () => {
    // Given
    const animalName = 'no-matching-animals'

    // When
    getCountriesMock.getCountries.mockReturnValueOnce(testData1)
    const result = searchCountriesByAnimals.execute(animalName)

    // Then
    expect(result).toEqual(undefined)
  })
})
