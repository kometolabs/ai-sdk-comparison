import { ChatAnthropic } from '@langchain/anthropic'
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import 'dotenv/config'
import * as readline from 'node:readline/promises'
import { AGENT_NAME, AGENT_SYSTEM_PROMPT } from './config/main'
import { langchainTemperatureTool } from './tools/langchainTemperatureTool'

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  terminal.write(`\n${AGENT_NAME} is online and ready to talk...\n\n`)

  const ai = new ChatAnthropic({
    model: 'claude-3-5-sonnet-20241022',
    onFailedAttempt: ({ error }) => {
      terminal.write(`\nError: ${(error as Error)?.message}\n`)
    },
  })

  const agent = createReactAgent({
    llm: ai,
    tools: [langchainTemperatureTool],
    prompt: AGENT_SYSTEM_PROMPT,
  })

  const messages: BaseMessage[] = []

  while (true) {
    const userInput = await terminal.question('You: ')

    messages.push(new HumanMessage(userInput))

    terminal.write(`\n${AGENT_NAME}: `)

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

      const content = result.messages[i].content
      if (!content) {
        continue
      }

      messages.push(new AIMessage(content.toString()))

      terminal.write(`${content.toString()}\n\n`)
    }
  }
}

main().catch((error) => {
  terminal.write('🚨 Fatal error:', error)
})
