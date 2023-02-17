// External Modules
const { config } = require("dotenv");

// Local Modules
import OpenAIBot from "./bots/openAiBot";

// Initialize tokens
config();

// Initialize bots
const openAiBot = new OpenAIBot(process.env.SION_AI_BOT_API_TOKEN!);
openAiBot.start();
