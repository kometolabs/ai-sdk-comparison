import { anthropic } from '@ai-sdk/anthropic'
import { CoreMessage, streamText } from 'ai'
import chalk from 'chalk'
import 'dotenv/config'
import * as readline from 'node:readline/promises'
import { vercelTemperatureTool } from './tools/vercelTemperatureTool'

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const messages: CoreMessage[] = []

const AGENT_NAME = 'Amy'

async function main() {
  process.stdout.write(
    chalk.cyan(`\n${AGENT_NAME} is online and ready to talk...\n\n`)
  )

  while (true) {
    const userInput = await terminal.question(chalk.green('You: '))

    messages.push({ role: 'user', content: userInput })

    const result = streamText({
      model: anthropic('claude-3-5-sonnet-latest'),
      messages,
      tools: { temperature: vercelTemperatureTool },
      maxSteps: 5,
      system: `You are ${AGENT_NAME}, a friendly young lady, which can discuss everyday news and provide weather forecast.`,
      onError: ({ error }) => {
        process.stdout.write(
          chalk.red(`\nError: ${(error as Error)?.message}\n`)
        )
      },
    })

    let fullResponse = ''
    process.stdout.write(`\n${chalk.cyan(`${AGENT_NAME}: `)}`)
    for await (const delta of result?.textStream ?? []) {
      fullResponse += delta
      process.stdout.write(delta)
    }
    process.stdout.write('\n\n')

    messages.push({ role: 'assistant', content: fullResponse })
  }
}

main().catch((error) => {
  console.error(chalk.red('🚨 Fatal error:'), error)
})
