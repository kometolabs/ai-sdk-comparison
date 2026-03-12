import { anthropic } from '@ai-sdk/anthropic'
import { ModelMessage, generateText, stepCountIs } from 'ai'
import 'dotenv/config'
import * as readline from 'node:readline/promises'
import { AGENT_NAME, AGENT_SYSTEM_PROMPT } from './config/main'
import { vercelTemperatureTool } from './tools/vercelTemperatureTool'

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const messages: ModelMessage[] = []

async function main() {
  terminal.write(`\n${AGENT_NAME} is online and ready to talk...\n\n`)

  while (true) {
    const userInput = await terminal.question('You: ')

    messages.push({ role: 'user', content: userInput })

    terminal.write(`\n${AGENT_NAME}: `)

    const result = await generateText({
      model: anthropic(process.env.ANTHROPIC_MODEL!),
      messages,
      system: AGENT_SYSTEM_PROMPT,
      tools: { temperature: vercelTemperatureTool },
      stopWhen: stepCountIs(2),
      temperature: 0,
    })

    terminal.write(`${result.text}\n\n`)

    messages.push({ role: 'assistant', content: result.text })
  }
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
