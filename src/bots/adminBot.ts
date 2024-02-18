// External Modules
import { Message } from "node-telegram-bot-api";

// Local Modules
import BaseBot from "./baseBot";

// Utils
import { checkIsAdminUsername } from "../utils";

// Constants
import { BOT_IDENTIFIER } from "../constants";

// Constants

export default class AdminBot extends BaseBot {
  private static instance: AdminBot | null = null;

  private constructor(token: string) {
    super(token, BOT_IDENTIFIER.ADMIN);
  }

  public static getInstance(token: string): AdminBot {
    if (!AdminBot.instance) {
      AdminBot.instance = new AdminBot(token);
    }

    return AdminBot.instance;
  }

  protected customStart = (): void => {
    this.sendToAdmin("Bot started");
  };

  protected executeCommand = (chatId: number, message: Message): void => {};

  private sendToAdmin = (text: string): void => {
    this.getBot().sendMessage(+process.env.ADMIN_CHAT_ID!, text);
  };
}
