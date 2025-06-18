import { Genkit } from 'genkit'
import { z } from 'zod'

export const createGenkitTemperatureTool = (ai: Genkit) => {
  return ai.defineTool(
    {
      name: 'temperature',
      description: 'Gets current temperature in the given city',
      inputSchema: z.object({
        city: z
          .string()
          .describe('The city to get the current temperature for'),
      }),
      outputSchema: z.string(),
    },
    async ({ city }) => {
      try {
        const min = -10,
          max = 40
        const temperature = (Math.random() * (max - min) + min).toFixed(0)
        return `${temperature}°C`
      } catch (error: any) {
        return error.message
      }
    }
  )
}
