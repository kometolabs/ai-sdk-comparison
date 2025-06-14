import { Genkit } from 'genkit'
import { z } from 'zod'
import { getRandomAirTemperature } from '../services/weather'

export const createGenkitTemperatureTool = (ai: Genkit) => {
  return ai.defineTool(
    {
      name: 'temperature',
      description: 'Gets current temperature in the given city',
      inputSchema: z.object({
        city: z.string().describe('The city to get the current weather for'),
      }),
      outputSchema: z.string(),
    },
    async ({ city }) => {
      try {
        // const temperature = await getAirTemperature(city)
        const temperature = await getRandomAirTemperature(city)

        return `${temperature}°C`
      } catch (error: any) {
        return error.message
      }
    }
  )
}
