import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from './config/main'

async function main() {
  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-latest'),
    maxSteps: 1,
    system: AGENT_SYSTEM_PROMPT,
    prompt: "What's your name?",
  })

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
