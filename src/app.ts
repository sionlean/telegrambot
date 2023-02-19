// External Modules
require("dotenv").config();

// Local Modules
import OpenAIBot from "./bots/openAiBot";

// Initialize bots
const openAiBot = new OpenAIBot(process.env.SION_AI_BOT_API_TOKEN!);
openAiBot.start();
