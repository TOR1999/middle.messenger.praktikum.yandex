export enum NamePages {
  AUTHORIZATION = "authorization",
  REGISTRATION = "registration",
  CHATS = "chats",
  PROFILE = "profile",
  NOTFOUND = "notFound",
  SERVERERROR = "serverError",
}

enum NameFonts {
  BODY_1 = "b1",
  BODY_2 = "b2",
  BODY_3 = "b3",
  BODY_4 = "b4",
  BODY_5 = "b5",
  BODY_6 = "b6",
  BODY_7 = "b7",
  BODY_8 = "b8",
  HEADER_1 = "h1",
  HEADER_2 = "h2",
  HEADER_3 = "h3",
  HEADER_4 = "h4",
  HEADER_5 = "h5",
  HEADER_6 = "h6",
  HEADER_7 = "h7",
  HEADER_8 = "h8",
}

export type TState = {
  currentPage: NamePages;
};

export type TLinkData = {
  text: string;
  dataPages: string;
  variant: "underline" | "text";
};

export type TAuthData = {
  valueLogin: string;
  valuePassword: string;
};

export type TTypographyData = {
  text: string;
  variant:
    | "b1"
    | "b2"
    | "b3"
    | "b4"
    | "b5"
    | "b6"
    | "b7"
    | "b8"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h8";
};
