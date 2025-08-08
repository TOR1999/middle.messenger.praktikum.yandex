import { Store } from "../../8_utils/helpers/store";
import { TChats } from "./types";

const initialState: TChats = {
  chats: [
    {
      id: 0,
      title: "",
      avatar: null,
      unread_count: 0,
      last_message: {
        content: "",
        // id: 0,
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
      // created_by: 0,
    },
  ],
};

export const ChatStore = new Store<TChats>(initialState);
