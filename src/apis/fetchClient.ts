// External Modules
const fetch = require("node-fetch");

// Local Modules
import TokenAuthenticator from "../lib/tokenAuthenticator";

// Constants
import { HTTP_METHOD } from "../constants";

export default abstract class FetchClient {
  private tokenAuthenticator: TokenAuthenticator;
  private serverUrl: string;

  constructor(serverUrl = process.env.SERVER_URL!) {
    this.serverUrl = serverUrl;
    this.tokenAuthenticator = TokenAuthenticator.getInstance();
  }

  protected get = async (endpoint: string, params: Object): Promise<any> => {
    try {
      const cleanedParams = this.cleanUndefinedAndNullParams(params);
      const encoded = this.encodeParams(cleanedParams);
      const newUrl = `${this.serverUrl}${endpoint}?${encoded}`;
      const headers = await this.getFetchHeader();

      const response = await fetch(newUrl, {
        headers,
        method: HTTP_METHOD.GET,
      });

      const jsonResp = await response.json();
      if (jsonResp.error) {
        throw jsonResp.error;
      } else {
        return jsonResp.data;
      }
    } catch (err) {
      throw err;
    }
  };

  protected post = async (endpoint: string, params: Object): Promise<any> => {
    try {
      const cleanedParams = this.cleanUndefinedAndNullParams(params);
      const newUrl = `${this.serverUrl}${endpoint}`;
      const headers = await this.getFetchHeader();

      const response = await fetch(newUrl, {
        headers,
        method: HTTP_METHOD.POST,
        body: JSON.stringify(cleanedParams),
      });

      const jsonResp = await response.json();
      if (jsonResp.error) {
        throw jsonResp.error;
      } else {
        return jsonResp.data;
      }
    } catch (err) {
      throw err;
    }
  };

  private cleanUndefinedAndNullParams = (params: {
    [key: string]: any;
  }): { [key: string]: any } => {
    for (const key in params) {
      if (params[key] === undefined || params[key] === null) {
        delete params[key];
      }
    }
    return params;
  };

  private encodeParams = (params: { [key: string]: any }): string => {
    return Object.keys(params)
      .map(function (key) {
        return [key, params[key]].map(encodeURIComponent).join("=");
      })
      .join("&");
  };

  private getFetchHeader = async (): Promise<HeadersInit> => {
    const token = await this.tokenAuthenticator.getToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };
}
