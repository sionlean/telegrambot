// Local Modules
import FetchClient from "./fetchClient";

// Interfaces
import {
  AIResp,
  ChangeModelResp,
  CurrentModelResp,
  ListAvailableModelsResp,
  ListOpenAIModelResp,
} from "../interfaces/openAIApiInterfaces";

// Constants
import { API_OPEN_AI } from "../constants";

export default class OpenAIClient extends FetchClient {
  constructor() {
    super(`${process.env.SERVER_URL}/openAI`);
  }

  changeModel = async (model: string): Promise<ChangeModelResp> => {
    return await this.post(API_OPEN_AI.CHANGE_MODEL, { model });
  };

  currentModel = async (): Promise<CurrentModelResp> => {
    return await this.get(API_OPEN_AI.CURRENT_MODEL, {});
  };

  generateCode = async (
    text: string,
    includePrevResp: boolean
  ): Promise<AIResp> => {
    return await this.post(API_OPEN_AI.GENERATE_CODE, {
      includePrevResp,
      text,
    });
  };

  generateResponse = async (
    text: string,
    includePrevResp: boolean
  ): Promise<AIResp> => {
    return await this.post(API_OPEN_AI.GENERATE_RESPONSE, {
      includePrevResp,
      text,
    });
  };

  listAvailableModels = async (): Promise<ListAvailableModelsResp> => {
    return await this.get(API_OPEN_AI.LIST_AVAILABLE_MODELS, {});
  };

  listOpenAIModels = async (): Promise<ListOpenAIModelResp> => {
    return await this.get(API_OPEN_AI.LIST_OPEN_AI_MODELS, {});
  };
}
