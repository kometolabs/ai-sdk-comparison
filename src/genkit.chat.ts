import 'dotenv/config'
import { genkit, MessageData } from 'genkit'
import { anthropic, claude45Sonnet } from 'genkitx-anthropic'
import * as readline from 'node:readline/promises'
import { AGENT_NAME, AGENT_SYSTEM_PROMPT } from './config/main'
import { createGenkitTemperatureTool } from './tools/genkitTemperatureTool'

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const messages: MessageData[] = []

async function main() {
  terminal.write(`\n${AGENT_NAME} is online and ready to talk...\n\n`)

  const ai = genkit({
    plugins: [anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })],
    model: claude45Sonnet,
  })

  const genkitTemperatureTool = createGenkitTemperatureTool(ai)

  while (true) {
    const userInput = await terminal.question('You: ')

    messages.push({ role: 'user', content: [{ text: userInput }] })

    terminal.write(`\n${AGENT_NAME}: `)

    const result = await ai.generate({
      messages,
      tools: [genkitTemperatureTool],
      system: AGENT_SYSTEM_PROMPT,
      maxTurns: 2,
      config: {
        version: process.env.ANTHROPIC_MODEL,
        temperature: 0,
      },
    })

    const content = result.message?.content[0]
    if (!content?.text) {
      continue
    }

    terminal.write(`${content.text}\n\n`)

    messages.push({ role: 'model', content: [{ text: content.text }] })
  }
}

main().catch((error) => {
  console.error('🚨 Fatal error:', error)
})
