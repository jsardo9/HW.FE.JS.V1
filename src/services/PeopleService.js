// Api call to retreive people's information
export function getPeople() {
  return fetch(`src/data/people.json`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`)
      }
      const apiResponse = await res.json()
      if (!apiResponse['response']['success']) {
        throw new Error(`Api response was not successful`)
      }
      // Adding timeout to Simulate Slow Api Call to demonstrate loading screen
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return apiResponse['response']['data']
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}
