import HTTPTransport from "../../8_utils/api/HTTPTransport";
import { getLang } from "../../8_utils/langs/getLang";
import { ChatStore } from "./store";
import {
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
        console.log({ data });
        ChatStore.setState({ chats: data });
      })
      .catch((e) => {
        console.log(e);
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
}

export default new ChatAPI();
