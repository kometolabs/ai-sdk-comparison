import { ChatAnthropic } from '@langchain/anthropic'
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  ToolMessage,
} from '@langchain/core/messages'
import { createAgent } from 'langchain'
import 'dotenv/config'
import * as readline from 'node:readline/promises'
import { AGENT_NAME, AGENT_SYSTEM_PROMPT } from '../config/main'
import { temperatureTool } from './tools/temperature'

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  terminal.write(`\n${AGENT_NAME} is online and ready to talk...\n\n`)

  const ai = new ChatAnthropic({
    model: process.env.ANTHROPIC_MODEL,
    onFailedAttempt: ({ error }) => {
      terminal.write(`\nError: ${error?.message}\n`)
    },
    temperature: 0,
  })

  const agent = createAgent({
    model: ai,
    tools: [temperatureTool],
    systemPrompt: AGENT_SYSTEM_PROMPT,
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
        ToolMessage.isInstance(result.messages[i]) ||
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
  console.error('🚨 Fatal error:', error)
})
