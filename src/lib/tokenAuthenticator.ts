// External Modules
const fetch = require("node-fetch");

// Constants
import { HTTP_METHOD } from "../constants";

export default class TokenAuthenticator {
  private static _instance: TokenAuthenticator;
  private static _token: string;
  private static _expiry: number;

  private constructor() {
    TokenAuthenticator.checkAndSetToken();
  }

  static getInstance = (): TokenAuthenticator => {
    if (!TokenAuthenticator._instance) {
      TokenAuthenticator._instance = new TokenAuthenticator();
    }

    return TokenAuthenticator._instance;
  };

  getToken = async (): Promise<string> => {
    await TokenAuthenticator.checkAndSetToken();
    return TokenAuthenticator._token;
  };

  private static checkAndSetToken = async (): Promise<void> => {
    if (!TokenAuthenticator.checkExpiration()) {
      await TokenAuthenticator.updateToken();
    }
  };

  private static checkExpiration = (): boolean => {
    if (TokenAuthenticator._expiry) {
      const oneDayMilliseconds = 24 * 60 * 60 * 1000;
      return (
        TokenAuthenticator._expiry >= new Date().getTime() + oneDayMilliseconds
      );
    }
    return false;
  };

  private static onTokenError = (err: unknown): void => {
    console.error(err);

    if (err instanceof Object && "code" in err) {
      const code = err.code;

      switch (code) {
        case "INVALID_PASSWORD":
          this.checkAndSetToken();
      }
    }
  };

  private static updateToken = async (): Promise<void> => {
    const url = `${process.env.SERVER_URL}/auth/getToken`;

    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: HTTP_METHOD.POST,
        body: JSON.stringify({ password: process.env.SERVER_PASSWORD }),
      });
      const jsonResponse = await response.json();

      TokenAuthenticator._token = jsonResponse.access_token;
      TokenAuthenticator._expiry = jsonResponse.expiry;
    } catch (err: unknown) {
      TokenAuthenticator.onTokenError(err);
    }
  };
}
