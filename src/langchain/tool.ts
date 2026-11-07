import { ChatAnthropic } from '@langchain/anthropic'
import {
  BaseMessage,
  HumanMessage,
  ToolMessage,
} from '@langchain/core/messages'
import { createAgent } from 'langchain'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from '../config/main'
import { temperatureTool } from './tools/temperature'

async function main() {
  const ai = new ChatAnthropic({
    model: process.env.ANTHROPIC_MODEL,
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
    const message = result.messages[i]
    if (ToolMessage.isInstance(message) || !message.text) {
      continue
    }

    console.log(message.text)
  }
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
