# AI SDK Comparison

[![Typecheck](https://github.com/kometolabs/ai-sdk-comparison/actions/workflows/typecheck.yml/badge.svg)](https://github.com/kometolabs/ai-sdk-comparison/actions/workflows/typecheck.yml)

Code examples implemented with different AI frameworks, such as [Vercel AI SDK](https://ai-sdk.dev/), [Mastra](https://mastra.ai), [Langchain.js](https://js.langchain.com), and [Firebase Genkit](https://firebase.google.com/products/genkit).

The main aim is to compare the frameworks and decide which one to choose for next projects.

All of the examples use the same model (Anthropic Claude Sonnet 4.6 by default, configurable through the `ANTHROPIC_MODEL` env var) for cleaner comparison.

Check out [@kkomelin](https://github.com/kkomelin)'s [companion post on his blog](https://komelin.com/blog/ai-framework-comparison).

## Installation

Clone the repo:

```bash
git clone git@github.com:kometolabs/ai-sdk-comparison.git
cd ai-sdk-comparison
```

Install dependencies:

```bash
pnpm i
```

Configure environment variables:

```bash
cp .env.example .env
```

Then set your `ANTHROPIC_API_KEY` in `.env`.

## Usage

### Simple non-interactive example without tools plugged:

```bash
# src/vercel/simple.ts
pnpm vercel:simple
# src/genkit/simple.ts
pnpm genkit:simple
# src/langchain/simple.ts
pnpm langchain:simple
# src/mastra/simple.ts
pnpm mastra:simple
```

### Simple non-interactive example with a Temperature tool plugged:

```bash
# src/vercel/tool.ts
pnpm vercel:tool
# src/genkit/tool.ts
pnpm genkit:tool
# src/langchain/tool.ts
pnpm langchain:tool
# src/mastra/tool.ts
pnpm mastra:tool
```

### Interactive Chat example with a Temperature tool plugged:

```bash
# src/vercel/chat.ts
pnpm vercel:chat
# src/genkit/chat.ts
pnpm genkit:chat
# src/langchain/chat.ts
pnpm langchain:chat
# src/mastra/chat.ts
pnpm mastra:chat
```

Ask something like this to run the temperature tool:

```
What's the temperature in New York?
```

## Contribute

If you see ways to improve the examples, e.g. adapt them to the latest framework updates, shoot a PR.
