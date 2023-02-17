export interface ChangeModelResp {
  data: { message: string };
}

export interface CurrentModelResp {
  data: { model: string };
}

export interface ListAvailableModelsResp {
  data: { models: string[] };
}

export interface ListOpenAIModelResp {
  data: {
    models: { id: string; object: string; created: number; owned_by: string }[];
  };
}

export interface GenerateResponseResp {
  data: { reply: string };
}
