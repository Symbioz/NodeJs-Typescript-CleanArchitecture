import { CountAnimalsAndPeople } from './CountAnimalsAndPeople'
import { GetCountriesPort } from './GetCountriesPort'
import { expectedResult } from './expectedResult'
import { testData2 } from '../test/testData'

describe('count animals and people', () => {
  const getCountriesMock: jest.MockedObject<GetCountriesPort> = {
    getCountries: jest.fn(),
  }
  const countAnimalsAndPeople = new CountAnimalsAndPeople(getCountriesMock)

  it('should return an updated list with count after names', () => {
    // Given expectedResult

    // When
    getCountriesMock.getCountries.mockReturnValueOnce(testData2)
    const result = countAnimalsAndPeople.execute()

    // Then
    expect(result).toEqual(expectedResult)
  })
})
