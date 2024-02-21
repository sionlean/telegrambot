// External Modules
require("dotenv").config();

// Local Modules
import AdminBot from "./bots/adminBot";
import AIBot from "./bots/aiBot";
import MapBot from "./bots/mapBot";

// Initialize bots

AdminBot.getInstance(process.env.SION_ADMIN_BOT_API_TOKEN!).start();
AIBot.getInstance(process.env.SION_AI_BOT_API_TOKEN!).start();
MapBot.getInstance(process.env.SION_MAP_BOT_API_TOKEN!).start();

console.log("started");

// const bots = [
//   new AdminBot(process.env.SION_ADMIN_BOT_API_TOKEN!),
//   new AIBot(process.env.SION_AI_BOT_API_TOKEN!),
//   new MapBot(process.env.SION_MAP_BOT_API_TOKEN!),
// ];

// bots.forEach((bot) => {
//   bot.start();
// });
