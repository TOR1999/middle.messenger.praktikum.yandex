export enum NamePages {
  AUTHORIZATION = "authorization",
  REGISTRATION = "registration",
  CHATS = "chats",
  PROFILE = "profile",
  NOTFOUND = "notFound",
  SERVERERROR = "serverError",
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

export type TRegistrationData = {
  valueEmail: string;
  valueLogin: string;
  valueFirstName: string;
  valueSecondName: string;
  valuePhone: string;
  valuePassword: string;
  valueRepeatPassword: string;
};

export type TProfileData = Omit<
  TRegistrationData,
  "valueRepeatPassword" | "valuePassword"
> & {
  valueNickName: string;
};
