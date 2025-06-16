import { ChatAnthropic } from '@langchain/anthropic'
import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from './config/main'
import { langchainTemperatureTool } from './tools/langchainTemperatureTool'

async function main() {
  const ai = new ChatAnthropic({
    model: 'claude-3-5-sonnet-20241022',
  })

  const messages: BaseMessage[] = [
    new SystemMessage(AGENT_SYSTEM_PROMPT),
    new HumanMessage("What's the temperature in New York?"),
  ]

  const agent = createReactAgent({
    llm: ai,
    tools: [langchainTemperatureTool],
  })

  const result = await agent.invoke({
    messages,
  })

  for (let i = messages.length; i < result.messages.length; i++) {
    if (result.messages[i].getType() === 'tool') {
      continue
    }

    if (typeof result.messages[i].content !== 'string') {
      continue
    }

    console.log(result.messages[i].content)
  }
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
