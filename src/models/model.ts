import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    model: {
      type: String,
      enum: ['replicate', 'stableDiffusion', 'zeroGPT'],
      required: true
    },
    prompt: {
      type: String,
      required: true
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  }, { timestamps: true });


export const ResponseSchema = mongoose.model('Response', Schema);
