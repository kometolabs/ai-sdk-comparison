import { Agent } from '@mastra/core/agent'
import 'dotenv/config'
import { AGENT_NAME, AGENT_SYSTEM_PROMPT } from '../config/main'
import { temperatureTool } from './tools/temperature'

const agent = new Agent({
  id: AGENT_NAME,
  name: AGENT_NAME,
  instructions: AGENT_SYSTEM_PROMPT,
  model: `anthropic/${process.env.ANTHROPIC_MODEL!}`,
  tools: { temperature: temperatureTool },
})

async function main() {
  const result = await agent.generate("What's the temperature in New York?")

  console.log(result.text)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
