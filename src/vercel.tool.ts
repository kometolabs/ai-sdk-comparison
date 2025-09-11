import { anthropic } from '@ai-sdk/anthropic'
import { generateText, stepCountIs } from 'ai';
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from './config/main'
import { vercelTemperatureTool } from './tools/vercelTemperatureTool'

async function main() {
  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-latest'),
    system: AGENT_SYSTEM_PROMPT,
    prompt: "What's the temperature in New York?",
    tools: { temperature: vercelTemperatureTool },
    stopWhen: stepCountIs(2),
    temperature: 0
  })

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
