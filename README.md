# AI SDK Comparison

In this repo, you can find the same CLI AI assistant implemented with different AI frameworks, such as Vercel AI SDK, Firebase Genkit, Langchain.js.

The same provider and model (Anthropic Claude Sonnet 3.5) is used in all examples for better comparison.

Meet Amy. She is a friendly young lady, which can discuss everyday news and provide weather forecast (through a Tool call).

## Installation

```bash
git clone git@github.com:kkomelin/ai-sdk-comparison.git
cd ai-sdk-comparison
```

```bash
pnpm i
```

## Usage

```bash
pnpm start:vercel
pnpm start:genkit
pnpm start:langchain
```

Ask Amy something like this:

```
What's the temperature in New York?
```
