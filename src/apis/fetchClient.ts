// External Modules
const fetch = require("node-fetch");

// Constants
import { HTTP_METHOD } from "../constants";

export default class FetchClient {
  private access_token: string | undefined = undefined;
  private serverUrl: string;

  constructor(serverUrl = process.env.SERVER_URL!) {
    this.serverUrl = serverUrl;
    this.setToken();
  }

  protected get = async (endpoint: string, params: Object): Promise<any> => {
    try {
      const cleanedParams = this.cleanUndefinedAndNullParams(params);
      const encoded = this.encodeParams(cleanedParams);
      const newUrl = `${this.serverUrl}${endpoint}?${encoded}`;

      const response = await fetch(newUrl, {
        headers: this.getFetchHeader(),
        method: HTTP_METHOD.GET,
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  protected post = async (endpoint: string, params: Object): Promise<any> => {
    try {
      const cleanedParams = this.cleanUndefinedAndNullParams(params);
      const newUrl = `${this.serverUrl}${endpoint}`;

      const response = await fetch(newUrl, {
        headers: this.getFetchHeader(),
        method: HTTP_METHOD.POST,
        body: JSON.stringify(cleanedParams),
      });

      return await response.json();
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

  private customFetch = async (
    method: HTTP_METHOD,
    url: string,
    params: Object
  ) => {
    const cleanedParams = this.cleanUndefinedAndNullParams(params);
    const newUrl =
      method === HTTP_METHOD.GET
        ? `${url}?${this.encodeParams(cleanedParams)}`
        : url;

    const response = await fetch(newUrl, {
      headers: this.getFetchHeader(),
      method: method,
      body:
        method === HTTP_METHOD.POST ? JSON.stringify(cleanedParams) : undefined,
    });

    return await response.json();
  };

  private encodeParams = (params: { [key: string]: any }): string => {
    return Object.keys(params)
      .map(function (key) {
        return [key, params[key]].map(encodeURIComponent).join("=");
      })
      .join("&");
  };

  private getFetchHeader = (): HeadersInit => {
    return {
      Authorization: `Bearer ${this.access_token}`,
      "Content-Type": "application/json",
    };
  };

  private setToken = async (): Promise<void> => {
    const url = `${process.env.SERVER_URL}/auth/getToken`;
    try {
      const response = await this.customFetch(HTTP_METHOD.POST, url, {
        password: process.env.SERVER_PASSWORD,
      });

      if (response.error) throw response.error;

      this.access_token = response.access_token;
    } catch (err: unknown) {
      this.onTokenError(err);
    }
  };

  private onTokenError = (err: unknown): void => {
    console.error(err);

    if (err instanceof Object && "code" in err) {
      const code = err.code;

      switch (code) {
        case "INVALID_PASSWORD":
          this.setToken();
      }
    }
  };
}
