import { TUserInfo } from "../../../6_entites/Auth/model/types";
import { ProfileStore } from "../../../6_entites/Profile/model/store";
import { getLang } from "../../../8_utils/langs/getLang";

type TLastMessage = {
  user: TUserInfo;
  time: string;
  content: string;
} | null;

export const getDisplayNameLastMessages = (lastMessage: TLastMessage) => {
  const myUserId = ProfileStore.getState().id;
  if (!lastMessage || !myUserId) return "";

  if (myUserId === lastMessage.user.id) {
    return getLang("common.you");
  }

  return lastMessage.user.display_name;
};
