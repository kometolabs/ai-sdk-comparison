import 'dotenv/config'
import { genkit } from 'genkit'
import { anthropic, claude45Sonnet } from 'genkitx-anthropic'
import { AGENT_SYSTEM_PROMPT } from '../config/main'

async function main() {
  const ai = genkit({
    plugins: [anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })],
    model: claude45Sonnet,
  })

  const result = await ai.generate({
    system: AGENT_SYSTEM_PROMPT,
    prompt: "What's your name?",
    maxTurns: 1,
    config: {
      version: process.env.ANTHROPIC_MODEL,
      temperature: 0,
    },
  })

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
