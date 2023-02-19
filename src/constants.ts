export enum API_DIRECTIONS {}

export enum API_OPEN_AI {
  GENERATE_RESPONSE = "/generateResponse",
  CHANGE_MODEL = "/changeModel",
  CURRENT_MODEL = "/currentModel",
  LIST_AVAILABLE_MODELS = "/listAvailableModels",
  LIST_OPEN_AI_MODELS = "/listOpenAIModels",
}

export enum COMMANDS_ADMIN {
  START = "/start",
  STOP = "/stop",
}

export enum COMMANDS_ADMIN_AI {
  CHANGE_MODEL = "/changeModel",
  CURRENT_MODEL = "/currentModel",
  LIST_AVAILABLE_MODELS = "/listAvailableModels",
  LIST_OPEN_AI_MODELS = "/listOpenAIModels",
}

export enum COMMANDS_ADMIN_DIRECTIONS {}

export enum HTTP_METHOD {
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}
