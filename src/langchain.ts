import { ChatAnthropic } from '@langchain/anthropic'
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages'
import chalk from 'chalk'
import 'dotenv/config'
import * as readline from 'node:readline/promises'
import { AGENT_NAME, AGENT_SYSTEM_PROMPT } from './config/main'
import { langchainTemperatureTool } from './tools/langchainTemperatureTool'

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const messages: BaseMessage[] = []

async function main() {
  process.stdout.write(
    chalk.cyan(`\n${AGENT_NAME} is online and ready to talk...\n\n`)
  )

  const ai = new ChatAnthropic({
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0,
    maxRetries: 5,
    streaming: true,
    onFailedAttempt: ({ error }) => {
      process.stdout.write(chalk.red(`\nError: ${(error as Error)?.message}\n`))
    },
  })
  ai.bindTools([langchainTemperatureTool])

  messages.push(new SystemMessage(AGENT_SYSTEM_PROMPT))

  while (true) {
    const userInput = await terminal.question(chalk.green('You: '))

    messages.push(new HumanMessage(userInput))

    const stream = await ai.stream(messages)

    let fullResponse = ''
    process.stdout.write(`\n${chalk.cyan(`${AGENT_NAME}: `)}`)
    for await (const delta of stream) {
      const content = delta?.content.toString()

      if (!content) {
        continue
      }

      fullResponse += content
      process.stdout.write(content)
    }
    process.stdout.write('\n\n')

    messages.push(new AIMessage(fullResponse))
  }
}

main().catch((error) => {
  console.error(chalk.red('🚨 Fatal error:'), error)
})
