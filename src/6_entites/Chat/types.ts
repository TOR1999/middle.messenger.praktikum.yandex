import { TUserInfo } from "../Auth/model/types";

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

export type TChats = {
  chats: TChat[];
};
