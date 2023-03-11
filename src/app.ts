// External Modules
require("dotenv").config();

// Local Modules
import AdminBot from "./bots/adminBot";
import OpenAIBot from "./bots/openAiBots";

// Initialize bots
const adminBot = new AdminBot(process.env.SION_ADMIN_BOT_API_TOKEN!);
const openAiBot = new OpenAIBot(process.env.SION_AI_BOT_API_TOKEN!);
adminBot.start();
openAiBot.start();
