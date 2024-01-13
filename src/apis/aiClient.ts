// Local Modules
import FetchClient from "./fetchClient";

// Interfaces
import {
  AIResp,
  ChangeModelResp,
  CurrentModelResp,
  GetEstimatedCostResp,
  ListAvailableModelsResp,
  ListOpenAIModelResp,
} from "../interfaces/AIApiInterfaces";

// Constants
import { API_AI, TYPE_AI_QUERY } from "../constants";

export default class AIClient extends FetchClient {
  constructor() {
    super(`${process.env.SERVER_URL}/ai`);
  }

  changeModel = async (model: string): Promise<ChangeModelResp> => {
    return await this.post(API_AI.CHANGE_MODEL, { model });
  };

  currentModel = async (): Promise<CurrentModelResp> => {
    return await this.get(API_AI.CURRENT_MODEL, {});
  };

  generateResponse = async (
    text: string,
    includePrevResp?: boolean,
    type?: TYPE_AI_QUERY
  ): Promise<AIResp> => {
    return await this.post(API_AI.GENERATE_RESPONSE, {
      includePrevResp,
      text,
      type,
    });
  };

  getEstimatedCost = async (): Promise<GetEstimatedCostResp> => {
    return await this.get(API_AI.GET_ESIMATED_COST, {});
  };

  listAvailableModels = async (): Promise<ListAvailableModelsResp> => {
    return await this.get(API_AI.LIST_AVAILABLE_MODELS, {});
  };

  listOpenAIModels = async (): Promise<ListOpenAIModelResp> => {
    return await this.get(API_AI.LIST_OPEN_AI_MODELS, {});
  };
}
