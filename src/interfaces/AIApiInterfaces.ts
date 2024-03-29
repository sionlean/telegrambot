export interface AIResp {
  reply: string;
}

export interface ChangeModelResp {
  reply: string;
}

export interface ChangeProviderResp {
  reply: string;
}

export interface CurrentModelResp {
  model: string;
}

export interface GetEstimatedCostResp {
  cost: string;
}

export interface ListAvailableModelsResp {
  models: string[];
}

export interface ListOpenAIModelResp {
  models: { id: string; object: string; created: number; owned_by: string }[];
}
