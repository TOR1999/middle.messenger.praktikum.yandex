export enum NamePages {
  AUTHORIZATION = "authorization",
  REGISTRATION = "registration",
  CHATS = "chats",
  PROFILE = "profile",
  NOTFOUND = "notFound",
  SERVERERROR = "serverError",
  PROFILE_PAGE_EDITOR_INFO = "ProfilePageEditorInfo",
  PROFILE_PAGE_EDITOR_PASSWORD = "ProfilePageEditorPassword",
}

export type TState = {
  currentPage: NamePages;
};

export type TLinkData = {
  href: string;
  text: string;
  dataPage: string;
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

export type TNewPasswordData = {
  valueOldPassword: string;
  valueNewPassword: string;
  valueRepeatNewPassword: string;
};

export type TMessage = {
  text: string;
  dataSend: string;
  timeSend: string;
  senderName: string;
  myMessage: boolean;
};

export type TChat = {
  name: string;
  unreadMessagesCount: number;
  lastMessage: TMessage;
  messages: TMessage[];
};

export type TDataChats = {
  chats: TChat[];
};
