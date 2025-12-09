// import the Genkit and Google AI plugin libraries
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { configure, defineFlow, startFlows } from 'genkit';
import * as z from 'zod';

// configure a Genkit instance
configure({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const helloFlow = defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (name) => {
    // make a generation request
    const llmResponse = await generate({
      model: gemini15Flash,
      prompt: `Hello Gemini, my name is ${name}`,
    });
    
    return llmResponse.text();
  }
);

startFlows();
