// External Modules
import { Message } from "node-telegram-bot-api";

// Local Modules
import BaseBot from "./baseBot";

// Utils
import { checkIsAdminUsername } from "../utils";

// Constants
import { COMMANDS_ADMIN_AI } from "../constants";

export default class AdminBot extends BaseBot {
  constructor(token: string) {
    super(token);
  }

  protected customStart(): void {
    this.sendToAdmin("Bot started");
  }

  protected executeCommand = (chatId: number, message: Message): void => {};

  private sendToAdmin = (text: string): void => {
    this.getBot().sendMessage(+process.env.ADMIN_CHAT_ID!, text);
  };
}
