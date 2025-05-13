export enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type TOptions = {
  timeout: number;
  data: any;
  headers: { [key: string]: string };
  method: METHODS;
};

export type TBlockProps = Record<string, unknown>;
