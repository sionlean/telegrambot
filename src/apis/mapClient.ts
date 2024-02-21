// Local Modules
import FetchClient from "./fetchClient";

// Interfaces
import { GetLocationResp } from "../interfaces/MapApiInterfaces";

// Constants
import { API_MAP, MAIN_ROUTES } from "../constants";

export default class MapClient extends FetchClient {
  constructor() {
    super(`${process.env.SERVER_URL}${MAIN_ROUTES.MAPS}`);
  }

  getLocation = async (query: string): Promise<GetLocationResp> => {
    return await this.post(API_MAP.GET_LOCATION, { query });
  };
}
