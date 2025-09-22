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

export type TMessage = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
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
};

export type TInitialStateChats = {
  chats: TChat[];
  selectedChatIndex: number | undefined;
  selectedChatId: number | null;
  listUsersFromChat: TUserFromChat[];
  messages?: TMessage[];
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
