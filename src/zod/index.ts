import { z } from "zod";

export const inputSchema = z.object({
  selectedAPI: z.enum([
    "replicate",
    "stableDiffusion",
    "huggingFace",
    "claude",
    "zeroGPT",
  ]),
  prompt: z.string({
    required_error: "This field can't be empty",
  }),
  output_format: z.string().optional(),
});
