import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from './config/main'
import { vercelTemperatureTool } from './tools/vercelTemperatureTool'

async function main() {
  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-latest'),
    // We're plugging in the temperature tool here:
    tools: { temperature: vercelTemperatureTool },
    maxSteps: 5,
    system: AGENT_SYSTEM_PROMPT,
    prompt: "What's the temperature in New York?",
  })

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
