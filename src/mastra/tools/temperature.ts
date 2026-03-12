import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

export const temperatureTool = createTool({
  id: 'temperature',
  description: 'Gets current temperature in the given city',
  inputSchema: z.object({
    city: z.string().describe('The city to get the current temperature for'),
  }),
  outputSchema: z.object({
    temperature: z.string(),
  }),
  execute: async ({ city: _city }) => {
    try {
      const min = -10
      const max = 40
      const temperature = (Math.random() * (max - min) + min).toFixed(0)

      return { temperature: `${temperature}°C` }
    } catch (error: any) {
      return { temperature: error.message }
    }
  },
})
