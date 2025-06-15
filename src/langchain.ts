import { ChatAnthropic } from '@langchain/anthropic'
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from '@langchain/core/messages'
import { concat } from '@langchain/core/utils/stream'
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
  }).bindTools([langchainTemperatureTool])

  messages.push(new SystemMessage(AGENT_SYSTEM_PROMPT))

  while (true) {
    const userInput = await terminal.question(chalk.green('You: '))

    messages.push(new HumanMessage(userInput))

    const stream = await ai.stream(messages)

    let fullResponse = ''

    process.stdout.write(`\n${chalk.cyan(`${AGENT_NAME}: `)}`)

    let toolCallsCombined: any = undefined

    for await (const chunk of stream) {
      toolCallsCombined =
        toolCallsCombined !== undefined
          ? concat(toolCallsCombined, chunk)
          : chunk

      const content = chunk?.content[0]
      if (!content?.text) {
        continue
      }

      fullResponse += content.text
      process.stdout.write(content.text)
    }

    if (toolCallsCombined && toolCallsCombined.tool_calls.length > 0) {
      const aiMessage = new AIMessage({
        content: fullResponse,
        tool_calls: toolCallsCombined.tool_calls,
      })
      messages.push(aiMessage)

      try {
        const toolCallArgs = toolCallsCombined.tool_calls[0].args
        const toolCallsId = toolCallsCombined.tool_calls[0].id

        const toolResult = await langchainTemperatureTool.invoke(toolCallArgs)
        process.stdout.write(
          `\nTemperature in ${toolCallArgs.city}: ${toolResult}\n`
        )

        messages.push(
          new ToolMessage({
            content: toolResult,
            tool_call_id: toolCallsId,
          })
        )
      } catch (error) {
        console.error(chalk.red('Tool error:'), error)
      }
    } else {
      messages.push(new AIMessage(fullResponse))
    }

    process.stdout.write('\n\n')
  }
}

main().catch((error) => {
  console.error(chalk.red('🚨 Fatal error:'), error)
})
