import { GetCountriesPort } from './GetCountriesPort'
import { SearchCountriesByAnimals } from './SearchCountriesByAnimals'
import { testData } from '../test/testData'

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
    const expectedResult = [
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
            ],
          },
        ],
      },
    ]

    // When
    getCountriesMock.getCountries.mockReturnValueOnce(testData)
    const result = searchCountriesByAnimals.execute({ animalName })

    // Then
    expect(result).toEqual(expectedResult)
  })
})
