// External Modules
import TelegramBot, { SendMessageOptions } from "node-telegram-bot-api";

// Utils
import { checkIsAdminUsername } from "../utils";

// Constants
import { COMMANDS_ADMIN } from "../constants";

type Options = NonNullable<ConstructorParameters<typeof TelegramBot>[1]>;

export default abstract class BaseBot {
  private bot: TelegramBot;
  private botInfo: TelegramBot.User | undefined = undefined;
  private started = false;
  private tries = 3;
  private botIdentifier: string;
  constructor(token: string, identifier: string) {
    const options = this.setBotOptions();
    this.bot = new TelegramBot(token, options);
    this.botIdentifier = identifier;
  }

  public start = async (chatId?: number): Promise<void> => {
    // Get and save bot info to be used next time
    this.botInfo = await this.getBot().getMe();

    // Proceed when there is info, with up to 3 tries
    if (this.botInfo) {
      // Bot specific starting operations
      this.customStart();

      // Listen for messages
      this.getBot().onText(this.getBotMentionRegex(), this.onReceivedText);

      this.setStartState(true);
    } else if (this.tries) {
      this.tries--;
      this.start(chatId);
    } else {
      // Todo: Send message to admin to say bot have error
    }
  };

  protected abstract customStart(): void;

  protected abstract executeCommand(
    chatId: number,
    message: TelegramBot.Message
  ): void;

  protected getBot = (): TelegramBot => {
    return this.bot;
  };

  protected getBotInfo = (): TelegramBot.User | undefined => {
    return this.botInfo;
  };

  protected getTextInfo = (text: string): { mention: string; text: string } => {
    const [mention, ...rest] = text.split(" ");
    return { mention, text: rest.join(" ").trim() };
  };

  protected getTextInfoParams = (text: string): string => {
    const [mention, ..._] = text.split(" ");
    return mention.substring(1);
  };

  protected sendNoPermissionMessage = (chatId: number): void => {
    this.sendText(
      chatId,
      "Sorry, you currently do not have the permission to run this command."
    );
  };

  protected sendText = (
    chatId: number,
    text: string,
    options?: SendMessageOptions
  ): void => {
    this.getBot().sendMessage(chatId, text, options);
  };

  private executeAdminCommand = (chatId: number, text: string): void => {
    switch (text) {
      case COMMANDS_ADMIN.START:
        if (!this.started) this.start(chatId);
        break;
      case COMMANDS_ADMIN.STOP:
        if (this.started) this.stop(chatId);
        break;
    }
  };

  private getBotMentionRegex = (): RegExp => {
    return new RegExp("^" + this.botIdentifier, "i");
  };

  private isAdminCommand = (text: string): boolean => {
    const adminCommands: string[] = Object.values(COMMANDS_ADMIN);
    return adminCommands.some((command) => command === text);
  };

  private onReceivedText = (message: TelegramBot.Message): void => {
    const { chat, from, text = "" } = message;
    const { id: chatId } = chat;
    const textInfo = this.getTextInfo(text);

    // Ignore empty text
    if (textInfo.mention || textInfo.text) {
      if (this.isAdminCommand(textInfo.mention)) {
        checkIsAdminUsername(from?.username) &&
          this.executeAdminCommand(chatId, textInfo.mention);
      } else {
        this.executeCommand(chatId, message);
      }
    }
  };

  private setBotOptions = (): Options => {
    return { polling: true };
  };

  private setStartState = (start: boolean): void => {
    this.started = start;
  };

  private stop = (chatId: number): void => {
    if (this.started) {
      this.setStartState(false);
      this.getBot().stopPolling();
      this.getBot().sendMessage(chatId, "Bot has stopped successfully");
    }
  };
}
