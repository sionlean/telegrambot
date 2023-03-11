// External Modules
import { Message } from "node-telegram-bot-api";

// Local Modules
import BaseBot from "./baseBot";
import OpenAIClient from "../apis/openAIClient";

// Utils
import { checkIsAdminUsername } from "../utils";

// Constants
import { COMMANDS_ADMIN_AI, TYPE_AI_QUERY } from "../constants";

export default class OpenAIBot extends BaseBot {
  private openAIClient: OpenAIClient = new OpenAIClient();
  constructor(token: string) {
    super(token);
  }

  protected customStart = async (): Promise<void> => {};

  protected executeCommand = async (
    chatId: number,
    message: Message
  ): Promise<void> => {
    const textWithoutMention = this.getTextWithoutMention(message?.text!);
    const isAdminAICommand = this.isAdminAICommand(textWithoutMention);
    const isAdminUser = checkIsAdminUsername(message?.from?.username);

    if (isAdminAICommand) {
      isAdminUser
        ? this.executeAdminAICommand(chatId, textWithoutMention)
        : this.sendNoPermissionMessage(chatId);
    } else {
      this.generateResponse(chatId, textWithoutMention);
    }
  };

  private changeModel = async (chatId: number, text: string): Promise<void> => {
    const model = text.split(" ")[1];
    try {
      await this.openAIClient.changeModel(model);
      this.sendText(chatId, `AI Model changed to: ${model} successfully`);
    } catch (err) {
      this.sendText(chatId, `Failed to change to ${model}`);
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private currentModel = async (chatId: number): Promise<void> => {
    try {
      const resp = await this.openAIClient.currentModel();
      const model = resp.data.model;
      this.sendText(chatId, `The current AI model used is ${model}`);
    } catch (err) {
      this.sendText(chatId, "Failed to get current model");
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private executeAdminAICommand = (chatId: number, text: string): void => {
    const adminCommand = Object.values(COMMANDS_ADMIN_AI).find(command => {
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
      const resp = await this.openAIClient.generateResponse(
        text,
        includePrevResp,
        type
      );
      const reply = resp.data.reply;
      this.sendText(chatId, reply);
    } catch (err) {
      this.sendText(chatId, JSON.stringify(err));
    }
  };

  private isAdminAICommand = (text: string): boolean => {
    const adminAICommands: string[] = Object.values(COMMANDS_ADMIN_AI);
    return adminAICommands.some(command => text.startsWith(command));
  };

  private listAvailableModels = async (chatId: number): Promise<void> => {
    try {
      const resp = await this.openAIClient.listAvailableModels();
      const models = resp.data.models;
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
      const resp = await this.openAIClient.listOpenAIModels();
      const models = resp.data.models;
      const textModels = models.map(model => `${model.id}`).join(",\n");

      const reply = `Here are the current list of all openAI models:\n${textModels}`;
      this.sendText(chatId, reply);
    } catch (err) {
      this.sendText(chatId, JSON.stringify(err));
    }
  };
}
