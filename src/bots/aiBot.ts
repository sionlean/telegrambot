// External Modules
import { Message } from "node-telegram-bot-api";

// Local Modules
import AIClient from "../apis/aiClient";
import BaseBot from "./baseBot";

// Utils
import { checkIsAdminUsername } from "../utils";

// Constants
import { BOT_IDENTIFIER, COMMANDS_ADMIN_AI, TYPE_AI_QUERY } from "../constants";

export default class AIBot extends BaseBot {
  private static instance: AIBot | null = null;
  private AIClient: AIClient = new AIClient();

  private constructor(token: string) {
    super(token, BOT_IDENTIFIER.AI);
  }

  public static getInstance(token: string): AIBot {
    if (!AIBot.instance) {
      AIBot.instance = new AIBot(token);
    }

    return AIBot.instance;
  }

  protected customStart = (): void => {};

  protected executeCommand = async (
    chatId: number,
    message: Message
  ): Promise<void> => {
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
  };

  private changeModel = async (chatId: number, text: string): Promise<void> => {
    const model = text.split(" ")[1];
    try {
      await this.AIClient.changeModel(model);
      this.sendText(chatId, `AI Model changed to: ${model} successfully`);
    } catch (err) {
      this.sendText(chatId, `Failed to change to ${model}`);
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private currentModel = async (chatId: number): Promise<void> => {
    try {
      const resp = await this.AIClient.currentModel();
      const model = resp.model;
      this.sendText(chatId, `The current AI model used is ${model}`);
    } catch (err) {
      this.sendText(chatId, "Failed to get current model");
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private executeAdminBotCommand = (chatId: number, text: string): void => {
    const adminCommand = Object.values(COMMANDS_ADMIN_AI).find((command) => {
      return text.startsWith(command);
    });

    if (!adminCommand) return;

    switch (adminCommand) {
      case COMMANDS_ADMIN_AI.CHANGE_MODEL:
        this.changeModel(chatId, text);
        break;
      case COMMANDS_ADMIN_AI.CURRENT_MODEL:
        this.currentModel(chatId);
        break;
      case COMMANDS_ADMIN_AI.GET_ESIMATED_COST:
        this.getEstimatedCost(chatId);
        break;
      case COMMANDS_ADMIN_AI.LIST_AVAILABLE_MODELS:
        this.listAvailableModels(chatId);
        break;
      case COMMANDS_ADMIN_AI.LIST_OPEN_AI_MODELS:
        this.listOpenAIModels(chatId);
        break;
    }
  };

  private generateResponse = async (
    chatId: number,
    textWithoutMention: string
  ): Promise<void> => {
    const includePrevResp = textWithoutMention.startsWith("+");
    const text = includePrevResp
      ? textWithoutMention.slice(1)
      : textWithoutMention;
    const type = textWithoutMention.includes("code:")
      ? TYPE_AI_QUERY.CODE
      : TYPE_AI_QUERY.ASSIT;

    try {
      const resp = await this.AIClient.generateResponse(
        text,
        includePrevResp,
        type
      );

      this.sendText(chatId, resp.reply);
    } catch (err) {
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private getEstimatedCost = async (chatId: number): Promise<void> => {
    try {
      const resp = await this.AIClient.getEstimatedCost();
      const text = `The current estimated cost from startup is ${resp.cost}`;
      this.sendText(chatId, text);
    } catch (err) {
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private isBotSpecificAdminCommand = (text: string): boolean => {
    const adminAICommands: string[] = Object.values(COMMANDS_ADMIN_AI);
    return adminAICommands.some((command) => text.startsWith(command));
  };

  private listAvailableModels = async (chatId: number): Promise<void> => {
    try {
      const resp = await this.AIClient.listAvailableModels();
      const models = resp.models;
      const reply = `Here are the current list of models:\n${models.join(
        ",\n"
      )}`;
      this.sendText(chatId, reply);
    } catch (err) {
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private listOpenAIModels = async (chatId: number): Promise<void> => {
    try {
      const resp = await this.AIClient.listOpenAIModels();
      const models = resp.models;
      const textModels = models.map((model) => `${model.id}`).join(",\n");

      const reply = `Here are the current list of all openAI models:\n${textModels}`;
      this.sendText(chatId, reply);
    } catch (err) {
      this.sendText(chatId, JSON.stringify(err));
    }
  };
}
