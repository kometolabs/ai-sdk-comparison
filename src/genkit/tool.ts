import 'dotenv/config'
import { genkit } from 'genkit'
import { anthropic } from '@genkit-ai/anthropic'
import { AGENT_SYSTEM_PROMPT } from '../config/main'
import { createTemperatureTool } from './tools/temperature'

async function main() {
  const ai = genkit({
    plugins: [anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })],
    model: anthropic.model(process.env.ANTHROPIC_MODEL!),
  })

  const temperatureTool = createTemperatureTool(ai)

  const result = await ai.generate({
    tools: [temperatureTool],
    system: AGENT_SYSTEM_PROMPT,
    prompt: "What's the temperature in New York?",
    maxTurns: 2,
  })

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
