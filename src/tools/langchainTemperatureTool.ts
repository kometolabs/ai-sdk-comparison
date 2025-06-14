import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import { getRandomAirTemperature } from '../services/weather'

export const langchainTemperatureTool = tool(
  async ({ city }) => {
    console.log('city', city)
    try {
      // const temperature = await getAirTemperature(city)
      const temperature = await getRandomAirTemperature(city)

      return `${temperature}°C`
    } catch (error: any) {
      return error.message
    }
  },
  {
    name: 'temperature',
    description: 'Gets current temperature in the given city',
    schema: z.object({
      city: z.string().describe('The city to get the current weather for'),
    }),
    responseFormat: 'content',
  }
)
