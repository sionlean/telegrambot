export enum API_DIRECTIONS {}

export enum API_AI {
  CHANGE_MODEL = "/changeModel",
  CURRENT_MODEL = "/currentModel",
  GENERATE_RESPONSE = "/generateResponse",
  GET_ESIMATED_COST = "/getEstimatedCost",
  LIST_AVAILABLE_MODELS = "/listAvailableModels",
  LIST_OPEN_AI_MODELS = "/listOpenAIModels",
}

export enum COMMANDS_ADMIN {
  START = "/start",
  STOP = "/stop",
}

export enum COMMANDS_ADMIN_AI {
  CHANGE_MODEL = "/change",
  CURRENT_MODEL = "/current",
  GET_ESIMATED_COST = "/cost",
  LIST_AVAILABLE_MODELS = "/list",
  LIST_OPEN_AI_MODELS = "/listAll",
}

export enum COMMANDS_ADMIN_DIRECTIONS {}

export enum HTTP_METHOD {
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}

export enum TYPE_AI_QUERY {
  ASSIT = "assit",
  CODE = "code",
}
