// Local Modules
import FetchClient from "./fetchClient";

// Interfaces
import {
  ChangeModelResp,
  CurrentModelResp,
  GenerateResponseResp,
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

  generateResponse = async (text: string): Promise<GenerateResponseResp> => {
    return await this.post(API_OPEN_AI.GENERATE_RESPONSE, { text });
  };

  listAvailableModels = async (): Promise<ListAvailableModelsResp> => {
    return await this.get(API_OPEN_AI.LIST_AVAILABLE_MODELS, {});
  };

  listOpenAIModels = async (): Promise<ListOpenAIModelResp> => {
    return await this.get(API_OPEN_AI.LIST_OPEN_AI_MODELS, {});
  };
}
