import { tool } from '@langchain/core/tools'
import { z } from 'zod'

export const langchainTemperatureTool = tool(
  async ({ city }) => {
    try {
      const min = -10
      const max = 40
      const temperature = (Math.random() * (max - min) + min).toFixed(0)

      return `${temperature}°C`
    } catch (error: any) {
      return error.message
    }
  },
  {
    name: 'temperature',
    description: 'Gets current temperature in the given city',
    schema: z.object({
      city: z.string().describe('The city to get the current temperature for'),
    }),
    responseFormat: 'content',
  }
)
