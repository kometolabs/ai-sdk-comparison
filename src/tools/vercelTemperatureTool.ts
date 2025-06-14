import { tool } from 'ai'
import { z } from 'zod'
import { getRandomAirTemperature } from '../services/weather'
// import { getAirTemperature } from '../services/weather'

export const vercelTemperatureTool = tool({
  description: 'Gets current temperature in the given city',
  parameters: z.object({
    city: z.string().describe('The city to get the current weather for'),
  }),
  execute: async ({ city }) => {
    try {
      // const temperature = await getAirTemperature(city)
      const temperature = await getRandomAirTemperature(city)

      return {
        temperature: `${temperature}°C`,
      }
    } catch (error: any) {
      return { error: error.message }
    }
  },
})
