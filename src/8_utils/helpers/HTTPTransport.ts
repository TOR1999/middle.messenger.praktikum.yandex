import { METHODS, TOptions } from "../constants/type";

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

export class HTTPTransport {
  get = (url: string, options: TOptions) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (url: string, options: TOptions) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url: string, options: TOptions) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (url: string, options: TOptions) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: TOptions) => {
    const { headers = {}, method, data, timeout } = options;

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
          ? `${url}${queryStringify(data as Record<string, string | boolean | number>)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit);
      }
    });
  };
}
