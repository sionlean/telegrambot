// Local Modules
import FetchClient from "./fetchClient";

// Interfaces
import {
  AIResp,
  ChangeModelResp,
  ChangeProviderResp,
  CurrentModelResp,
  GetEstimatedCostResp,
  ListAvailableModelsResp,
  ListOpenAIModelResp,
} from "../interfaces/AIApiInterfaces";

// Constants
import { API_AI, MAIN_ROUTES, TYPE_AI_QUERY } from "../constants";

export default class AIClient extends FetchClient {
  constructor() {
    super(`${process.env.SERVER_URL}${MAIN_ROUTES.AI}`);
  }

  changeModel = async (model: string): Promise<ChangeModelResp> => {
    return await this.post(API_AI.CHANGE_MODEL, { model });
  };

  changeProvider = async (provider: string): Promise<ChangeProviderResp> => {
    return await this.post(API_AI.CHANGE_PROVIDER, { provider });
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
