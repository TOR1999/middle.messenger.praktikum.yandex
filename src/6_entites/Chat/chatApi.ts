import HTTPTransport, {
  REQUEST_STATUSES,
} from "../../8_utils/api/HTTPTransport";
import { getLang } from "../../8_utils/langs/getLang";
import { ProfileStore } from "../Profile/model/store";
import MessagesSoket from "./MessagesSoket";
import { ChatStore } from "./store";
import {
  TAddUsersToChatRequest,
  TCreateChatRequest,
  TDeleteChatByIdRequest,
  TGetChatsRequest,
} from "./types";

class ChatAPI {
  __basePath = "";
  constructor() {
    this.__basePath = "chats";
  }

  getChats(params: TGetChatsRequest) {
    HTTPTransport.get(`${this.__basePath}`, { data: params })
      .then(({ response }: any) => {
        const data = JSON.parse(response);

        ChatStore.setState({ chats: data });
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  getUsersFromChat(idChat: number | null) {
    HTTPTransport.get(`${this.__basePath}/${idChat}/users`)
      .then(({ response }: any) => {
        const data = JSON.parse(response);
        ChatStore.setState({ listUsersFromChat: data });
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  getChatToken(chatId: number) {
    HTTPTransport.post(`${this.__basePath}/token/${chatId}`)
      .then(({ response }: any) => {
        const { token } = JSON.parse(response);
        const userId = ProfileStore.getState().myUser.id;

        MessagesSoket.connect({ userId, chatId, token });
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  createChat(data: TCreateChatRequest) {
    HTTPTransport.post(`${this.__basePath}`, { data })
      .then(() => {
        this.getChats({ offset: 0, limit: 10, title: "" });
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  deleteChatById(data: TDeleteChatByIdRequest) {
    HTTPTransport.delete(`${this.__basePath}`, { data })
      .then(() => {
        this.getChats({ offset: 0, limit: 10, title: "" });
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  addUsersToChat(data: TAddUsersToChatRequest) {
    HTTPTransport.put(`${this.__basePath}/users`, { data })
      .then((response: any) => {
        if (response.status == REQUEST_STATUSES.OK) {
          alert(getLang("notificationInfo.successfulAddUserToChat"));
        }
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  deleteUsersToChat(data: TAddUsersToChatRequest) {
    HTTPTransport.delete(`${this.__basePath}/users`, { data })
      .then((response: any) => {
        if (response.status == REQUEST_STATUSES.OK) {
          alert(getLang("notificationInfo.successfulDeleteUserToChat"));
        }
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }
}

export default new ChatAPI();
