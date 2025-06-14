# AI SDK Comparison

In this repo, you can find the same CLI AI assistant implemented with different AI frameworks, such as Vercel AI SDK, Firebase Genkit, Langchain.js.

The same provider and model (Anthropic Claude Sonnet 3.5) is used in all examples for better comparison.

## Installation

Clone the repo:

```bash
git clone git@github.com:kkomelin/ai-sdk-comparison.git
cd ai-sdk-comparison
```

Install dependencies:

```bash
pnpm i
```

## Usage

Run the assistant:

```bash
pnpm start:vercel
# or
pnpm start:genkit
# or
pnpm start:langchain
```

Ask something like this to run the temperature tool:

```
What's the temperature in New York?
```
