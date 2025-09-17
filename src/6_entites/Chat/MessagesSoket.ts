import { BASE_URLS } from "../../8_utils/constants/constants";
import { getLang } from "../../8_utils/langs/getLang";
import { ChatStore } from "./store";
import {
  ACTIONS_WEBSOCKET,
  TInitialStateChats,
  TMessage,
  TYPES_MESSAGE_WEBSOCKET,
} from "./types";

class MessagesSoket {
  private _userId: string | number = "";
  private _chatId: string | number = "";
  private _token: string = "";
  private _wss: WebSocket | null = null;
  private _ping: NodeJS.Timeout | null = null;

  constructor() {
    this._wss = null;
    this._handleOpen = this._handleOpen.bind(this);
    this._handleMessage = this._handleMessage.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  private _setListeners() {
    if (this._wss) {
      this._wss.addEventListener(ACTIONS_WEBSOCKET.OPEN, this._handleOpen);
      this._wss.addEventListener(ACTIONS_WEBSOCKET.CLOSE, this._handleClose);
      this._wss.addEventListener(
        ACTIONS_WEBSOCKET.MESSAGE,
        this._handleMessage,
      );
      this._wss.addEventListener(ACTIONS_WEBSOCKET.ERROR, this._handleError);
    }
  }

  private _removeListeners() {
    if (this._wss) {
      this._wss.removeEventListener(ACTIONS_WEBSOCKET.OPEN, this._handleOpen);
      this._wss.removeEventListener(ACTIONS_WEBSOCKET.CLOSE, this._handleClose);
      this._wss.removeEventListener(
        ACTIONS_WEBSOCKET.MESSAGE,
        this._handleMessage,
      );
      this._wss.removeEventListener(ACTIONS_WEBSOCKET.ERROR, this._handleError);
    }
  }

  private _handleOpen() {
    if (this._wss) {
      this.getMessages();
      this._ping = setInterval(() => {
        this._wss?.send(JSON.stringify({ type: TYPES_MESSAGE_WEBSOCKET.PING }));
      }, 5000);
    }
  }

  private _handleClose(ev: CloseEvent) {
    this._removeListeners();
    if (!ev.wasClean) {
      alert(`${getLang("errorRequest.badRequest")} : Ошибка закрытия сокета`);
    }
  }

  private _handleMessage(evt: MessageEvent<string>) {
    try {
      type TMessageFromSocket = {
        id: number;
        user_id: number;
        chat_id: number;
        type: "message";
        time: string;
        content: string;
        is_read: boolean;
        file: null;
      };
      const data = JSON.parse(evt.data) as
        | TMessageFromSocket[]
        | TMessageFromSocket
        | { type: "pong" };

      const transformSocketMessageToLocaleMessage = (
        message: TMessageFromSocket,
      ): TMessage => ({
        chat_id: message.chat_id,
        content: message.content,
        time: message.time,
        type: message.type,
        user_id: String(message.user_id),
      });

      if (Array.isArray(data)) {
        const messages = (data as TMessageFromSocket[])
          .reverse()
          .map(transformSocketMessageToLocaleMessage);
        ChatStore.setState({ messages });
      } else if (data.type === "message") {
        const state = ChatStore.getState() as TInitialStateChats;
        if (state.messages) {
          const message = transformSocketMessageToLocaleMessage(data);
          ChatStore.setState({
            messages: [...state.messages, message],
          });
        }
      }
    } catch (e: unknown) {
      console.error(e);
    }
  }

  private _handleError() {
    alert(`${getLang("errorRequest.badRequest")} `);
  }

  private _leave() {
    if (this._wss) {
      if (this._ping) {
        clearInterval(this._ping);
      }

      this._wss.close();
      this._removeListeners();
    }
  }

  public connect({
    userId,
    chatId,
    token,
  }: {
    userId: number;
    chatId: number;
    token: string;
  }) {
    if (this._chatId !== chatId) {
      this._leave();
      this._userId = userId;
      this._chatId = chatId;
      this._token = token;
      this._wss = new WebSocket(
        `${BASE_URLS.WSS}/${this._userId}/${this._chatId}/${this._token}`,
      );
      this._setListeners();
    }
  }

  public getMessages() {
    if (this._wss) {
      this._wss.send(
        JSON.stringify({
          content: "0",
          type: TYPES_MESSAGE_WEBSOCKET.GET_OLD,
        }),
      );
    }
  }

  public sendMessage(message: string) {
    if (this._wss) {
      this._wss?.send(
        JSON.stringify({
          content: message,
          type: TYPES_MESSAGE_WEBSOCKET.MESSAGE,
        }),
      );
    }
  }
}

export default new MessagesSoket();
