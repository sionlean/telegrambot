// External Modules
import { Message } from "node-telegram-bot-api";

// Local Modules
import BaseBot from "./baseBot";
import MapClient from "../apis/mapClient";

// Utils
import { checkIsAdminUsername } from "../utils";

// Constants
import { BOT_IDENTIFIER, COMMANDS_ADMIN_MAP } from "../constants";

export default class MapBot extends BaseBot {
  private static instance: MapBot | null = null;
  private MapClient: MapClient = new MapClient();
  constructor(token: string) {
    super(token, BOT_IDENTIFIER.MAP);
  }

  public static getInstance(token: string): MapBot {
    if (!MapBot.instance) {
      MapBot.instance = new MapBot(token);
    }

    return MapBot.instance;
  }

  protected customStart = (): void => {};

  protected executeCommand(chatId: number, message: Message): void {
    const { text } = this.getTextInfo(message?.text!);
    const isAdminCommand = this.isBotSpecificAdminCommand(text);
    const isAdminUser = checkIsAdminUsername(message?.from?.username);

    if (isAdminCommand) {
      isAdminUser
        ? this.executeAdminBotCommand(chatId, text)
        : this.sendNoPermissionMessage(chatId);
    } else {
      this.generateResponse(chatId, text);
    }
  }

  private executeAdminBotCommand = (chatId: number, text: string): void => {
    const adminCommand = Object.values(COMMANDS_ADMIN_MAP).find((command) => {
      return text.startsWith(command);
    });

    if (!adminCommand) return;

    switch (adminCommand) {
      case COMMANDS_ADMIN_MAP.SET_LOCATION:
        return;
    }
  };

  private generateResponse = async (
    chatId: number,
    textWithoutMention: string
  ): Promise<void> => {
    try {
      const resp = await this.MapClient.getLocation(textWithoutMention);
      this.sendText(chatId, JSON.stringify(resp.location));
    } catch (err) {
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private isBotSpecificAdminCommand = (text: string): boolean => {
    const adminAICommands: string[] = Object.values(COMMANDS_ADMIN_MAP);
    return adminAICommands.some((command) => text.startsWith(command));
  };
}
