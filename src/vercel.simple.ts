import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from './config/main'

async function main() {
  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-latest'),
    system: AGENT_SYSTEM_PROMPT,
    prompt: "What's your name?",
    maxSteps: 1,
    temperature: 0,
  })

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
