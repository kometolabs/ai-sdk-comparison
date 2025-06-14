export const getRandomAirTemperature = (city: string) => {
  const min = -10,
    max = 40
  return (Math.random() * (max - min) + min).toFixed(0)
}

export const getAirTemperature = async (city: string) => {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`

  let response = await fetch(geoUrl)
  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`)
  }

  let data = (await response.json()) as any

  if (data?.results == null || data.results.length === 0) {
    throw new Error(`Can't provide weather forecast for ${city}`)
  }

  const latitude = data.results[0].latitude
  const longitude = data.results[0].longitude

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    latitude
  )}&longitude=${encodeURIComponent(longitude)}&current_weather=true`

  response = await fetch(weatherUrl)
  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`)
  }

  data = (await response.json()) as any
  const currentWeather = data.current_weather

  return currentWeather.temperature
}
