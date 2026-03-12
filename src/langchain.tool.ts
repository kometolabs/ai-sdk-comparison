import { ChatAnthropic } from '@langchain/anthropic'
import { BaseMessage, HumanMessage } from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from './config/main'
import { langchainTemperatureTool } from './tools/langchainTemperatureTool'

async function main() {
  const ai = new ChatAnthropic({
    model: process.env.ANTHROPIC_MODEL,
    temperature: 0,
  })

  const agent = createReactAgent({
    llm: ai,
    tools: [langchainTemperatureTool],
    prompt: AGENT_SYSTEM_PROMPT,
  })

  const messages: BaseMessage[] = [
    new HumanMessage("What's the temperature in New York?"),
  ]

  const result = await agent.invoke({
    messages,
  })

  for (let i = messages.length; i < result.messages.length; i++) {
    if (
      result.messages[i].getType() === 'tool' ||
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
