import { Store } from "../../8_utils/helpers/store";
import { TInitialStateChats } from "./types";

export const initialStateChatStore: TInitialStateChats = {
  chats: [
    {
      id: 0,
      title: "",
      avatar: null,
      unread_count: 0,
      last_message: {
        content: "",
        time: "",
        user: {
          avatar: "",
          display_name: "",
          email: "",
          first_name: "",
          login: "",
          phone: "",
          second_name: "",
          id: 0,
        },
      },
    },
  ],
  selectedChatIndex: undefined,
  selectedChatId: null,
  listUsersFromChat: [],
};

export const ChatStore = new Store<TInitialStateChats>(initialStateChatStore);
