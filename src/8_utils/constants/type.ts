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
  data?: unknown;
  method?: METHODS;
};

export type TBlockProps = Record<string, unknown> & {
  attr?: Record<string, string>;
};

export type TProps = Record<string, unknown>;

export const URL_NAMES = {
  SIGNIN: "/",
  SIGNUP: "/sign-up",
  SETTINGS: "/settings",
  MESSAGER: "/messenger",
  EDIT_SETTINGS: "/edit-settings",
  EDIT_PASSWORD: "/edit-password",
  NOT_FOUND: "/not-found",
  SERVER_ERROR: "/server-error",
};
