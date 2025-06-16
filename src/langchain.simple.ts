import { ChatAnthropic } from '@langchain/anthropic'
import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages'
import 'dotenv/config'
import { AGENT_SYSTEM_PROMPT } from './config/main'

async function main() {
  const ai = new ChatAnthropic({
    model: 'claude-3-5-sonnet-20241022',
    maxRetries: 1,
  })

  const messages: BaseMessage[] = [
    new SystemMessage(AGENT_SYSTEM_PROMPT),
    new HumanMessage("What's your name?"),
  ]

  const response = await ai.invoke(messages)

  console.log(response.content)
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
