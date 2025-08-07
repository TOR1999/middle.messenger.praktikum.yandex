import { BASE_URLS } from "../constants/constants";
import { METHODS, TOptions } from "../constants/type";

enum REQUEST_STATUSES {
  "OK" = 200,
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "SERVER_ERROR" = 500,
}

const queryStringify = (
  data: Record<string, string | boolean | number>,
): string => {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
};

class HTTPTransport {
  get = (url: string, options?: TOptions) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (url: string, options?: TOptions) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url: string, options?: TOptions) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (url: string, options?: TOptions) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: TOptions) => {
    const { method, data } = options;
    const timeout = 10000;
    const baseUrl = BASE_URLS.API;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${baseUrl}/${url}${queryStringify(data as Record<string, string | boolean | number>)}`
          : `${baseUrl}/${url}`,
      );

      xhr.withCredentials = true;

      xhr.onload = function () {
        if (xhr.status === REQUEST_STATUSES.OK) {
          resolve(xhr);
        }

        reject(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (data?.constructor.name === "FormData") {
        xhr.send(data as Document | XMLHttpRequestBodyInit);
      } else if (isGet || !data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data) as Document | XMLHttpRequestBodyInit);
      }
    });
  };
}

export default new HTTPTransport();
