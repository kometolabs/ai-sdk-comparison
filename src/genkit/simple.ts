import 'dotenv/config'
import { genkit } from 'genkit'
import { anthropic } from '@genkit-ai/anthropic'
import { AGENT_SYSTEM_PROMPT } from '../config/main'

async function main() {
  const ai = genkit({
    plugins: [anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })],
    model: anthropic.model(process.env.ANTHROPIC_MODEL!),
  })

  const result = await ai.generate({
    system: AGENT_SYSTEM_PROMPT,
    prompt: "What's your name?",
    maxTurns: 1,
  })

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
