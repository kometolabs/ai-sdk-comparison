import { ChatAnthropic } from '@langchain/anthropic'
import { BaseMessage, HumanMessage, ToolMessage } from '@langchain/core/messages'
import { createAgent } from 'langchain'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from '../config/main'
import { temperatureTool } from './tools/temperature'

async function main() {
  const ai = new ChatAnthropic({
    model: process.env.ANTHROPIC_MODEL,
    temperature: 0,
  })

  const agent = createAgent({
    model: ai,
    tools: [temperatureTool],
    systemPrompt: AGENT_SYSTEM_PROMPT,
  })

  const messages: BaseMessage[] = [
    new HumanMessage("What's the temperature in New York?"),
  ]

  const result = await agent.invoke({
    messages,
  })

  for (let i = messages.length; i < result.messages.length; i++) {
    if (
      ToolMessage.isInstance(result.messages[i]) ||
      typeof result.messages[i].content !== 'string'
    ) {
      continue
    }

    console.log(result.messages[i].content)
  }
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
