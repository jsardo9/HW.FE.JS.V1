import { getPeople } from 'src/services/PeopleService'
import { vi, describe, it, expect } from 'vitest'

describe('PeopleService', () => {
  it('should make a fetch call to get peoples information', async () => {
    // Define the response data for the mocked fetch call
    const responseData = {
      response: {
        success: true,
        data: ['person1', 'person2']
      }
    }
    const response = new Response(JSON.stringify(responseData), { status: 200 })

    // Spying of fetch api call
    const fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve(response))

    // Calling the function to be tested
    const result = await getPeople()

    // Verify that the fetch function was called with the correct arguments
    expect(fetchSpy).toHaveBeenCalledWith('src/data/people.json')

    // Verify that the result matches the expected data
    expect(result).toEqual(responseData.response.data)
  })
})
