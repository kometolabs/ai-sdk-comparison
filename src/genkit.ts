import chalk from 'chalk'
import 'dotenv/config'
import { genkit, MessageData } from 'genkit'
import { anthropic, claude35Sonnet } from 'genkitx-anthropic'
import * as readline from 'node:readline/promises'
import { createGenkitTemperatureTool } from './tools/genkitTemperatureTool'

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const messages: MessageData[] = []

const AGENT_NAME = 'Amy'

async function main() {
  process.stdout.write(
    chalk.cyan(`\n${AGENT_NAME} is online and ready to talk...\n\n`)
  )

  const ai = genkit({
    plugins: [anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })],
    model: claude35Sonnet,
  })

  while (true) {
    const userInput = await terminal.question(chalk.green('You: '))

    messages.push({ role: 'user', content: [{ text: userInput }] })

    const result = ai.generateStream({
      messages,
      tools: [createGenkitTemperatureTool(ai)],
      maxTurns: 5,
      system: `You are ${AGENT_NAME}, a friendly young lady, which can discuss everyday news and provide weather forecast.`,
      onError: ({ error }) => {
        process.stdout.write(
          chalk.red(`\nError: ${(error as Error)?.message}\n`)
        )
      },
    })

    let fullResponse = ''
    process.stdout.write(`\n${chalk.cyan(`${AGENT_NAME}: `)}`)
    for await (const delta of result?.stream ?? []) {
      const content = delta.content[0]

      if (!content?.text) {
        continue
      }

      fullResponse += content.text
      process.stdout.write(content.text)
    }
    process.stdout.write('\n\n')

    messages.push({ role: 'model', content: [{ text: fullResponse }] })
  }
}

main().catch((error) => {
  console.error(chalk.red('🚨 Fatal error:'), error)
})
