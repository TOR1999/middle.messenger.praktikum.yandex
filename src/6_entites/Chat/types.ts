import { TUserFromChat, TUserInfo } from "../Auth/model/types";

export type TGetChatsRequest = {
  offset: number;
  limit: number;
  title: string;
};

export type TCreateChatRequest = {
  title: string;
};

export type TDeleteChatByIdRequest = {
  chatId: string;
};

export type TAddUsersToChatRequest = {
  users: number[];
  chatId: number | null;
};

type TMessage = {
  text: string;
  dataSend: string;
  timeSend: string;
  senderName: string;
  myMessage: boolean;
};

export type TChat = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: TUserInfo;
    time: string;
    content: string;
  } | null;
  // messages: TMessage[];
};

export type TInitialStateChats = {
  chats: TChat[];
  selectedChatId: number | null;
  listUsersFromChat: TUserFromChat[];
  messages?: any;
};

export enum ACTIONS_WEBSOCKET {
  OPEN = "open",
  CLOSE = "close",
  MESSAGE = "message",
  ERROR = "error",
}

export enum TYPES_MESSAGE_WEBSOCKET {
  PING = "ping",
  PONG = "pong",
  MESSAGE = "message",
  GET_OLD = "get old",
}
