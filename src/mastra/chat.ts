import { Agent } from '@mastra/core/agent'
import type { MessageInput } from '@mastra/core/agent/message-list'
import 'dotenv/config'
import * as readline from 'node:readline/promises'
import { AGENT_NAME, AGENT_SYSTEM_PROMPT } from '../config/main'
import { temperatureTool } from './tools/temperature'

const agent = new Agent({
  id: AGENT_NAME,
  name: AGENT_NAME,
  instructions: AGENT_SYSTEM_PROMPT,
  model: `anthropic/${process.env.ANTHROPIC_MODEL!}`,
  tools: { temperature: temperatureTool },
})

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const messages: MessageInput[] = []

async function main() {
  terminal.write(`\n${AGENT_NAME} is online and ready to talk...\n\n`)

  while (true) {
    const userInput = await terminal.question('You: ')

    messages.push({ role: 'user', content: userInput })

    terminal.write(`\n${AGENT_NAME}: `)

    const result = await agent.generate(messages)

    terminal.write(`${result.text}\n\n`)

    messages.push({ role: 'assistant', content: result.text })
  }
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
