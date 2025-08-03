import { METHODS, TOptions } from "../constants/type";

const getBaseUrl = () => {
  if (window.location.host === "localhost:3000") {
    return "/api/v2";
  }

  return "https://ya-praktikum.tech/api/v2";
};

// const HEADERS = {
//   CONTENT_TYPE_APPLICATION_JSON: { "Content-Type": "application/json" },
// };
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
    const baseUrl = getBaseUrl();

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

      // Object.keys(headers).forEach((key) => {
      //   xhr.setRequestHeader(key, headers[key]);
      // });

      xhr.setRequestHeader("Content-Type", "application/json");

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

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data) as Document | XMLHttpRequestBodyInit);
      }
    });
  };
}

export default new HTTPTransport();
