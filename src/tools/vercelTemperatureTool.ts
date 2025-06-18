import { tool } from 'ai'
import { z } from 'zod'

export const vercelTemperatureTool = tool({
  description: 'Gets current temperature in the given city',
  parameters: z.object({
    city: z.string().describe('The city to get the current temperature for'),
  }),
  execute: async ({ city }) => {
    try {
      const min = -10,
        max = 40
      const temperature = (Math.random() * (max - min) + min).toFixed(0)
      return `${temperature}°C`
    } catch (error: any) {
      return { error: error.message }
    }
  },
})
