// External Modules
require("dotenv").config();

// Local Modules
import AdminBot from "./bots/adminBot";
import AIBot from "./bots/aiBot";

// Initialize bots
const adminBot = new AdminBot(process.env.SION_ADMIN_BOT_API_TOKEN!);
const aiBot = new AIBot(process.env.SION_AI_BOT_API_TOKEN!);

adminBot.start();
aiBot.start();
