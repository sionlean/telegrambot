export enum API_MAP {
  GET_LOCATION = "/getLocation",
}

export enum API_AI {
  CHANGE_MODEL = "/changeModel",
  CHANGE_PROVIDER = "/changeProvider",
  CURRENT_MODEL = "/currentModel",
  GENERATE_RESPONSE = "/generateResponse",
  GET_ESIMATED_COST = "/getEstimatedCost",
  LIST_AVAILABLE_MODELS = "/listAvailableModels",
  LIST_OPEN_AI_MODELS = "/listOpenAIModels",
}

export enum BOT_IDENTIFIER {
  ADMIN = "%admin",
  AI = "%ai",
  MAP = "%map",
}

export enum COMMANDS_ADMIN {
  START = "/start",
  STOP = "/stop",
}

export enum COMMANDS_ADMIN_AI {
  CHANGE_MODEL = "/changeModel",
  CHANGE_PROVIDER = "changeProvider",
  CURRENT_MODEL = "/current",
  GET_ESIMATED_COST = "/cost",
  LIST_AVAILABLE_MODELS = "/list",
  LIST_OPEN_AI_MODELS = "/listAll",
}

// TODO: To be implemented
export enum COMMANDS_ADMIN_MAP {
  SET_LOCATION = "/setLocation",
}

export enum HTTP_METHOD {
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}

export enum MAIN_ROUTES {
  AI = "/ai",
  AUTHENTICATION = "/auth",
  MAPS = "/maps",
}

export enum TYPE_AI_QUERY {
  ASSIT = "assit",
  CODE = "code",
}
