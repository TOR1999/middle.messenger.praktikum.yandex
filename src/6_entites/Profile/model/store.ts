import { Store } from "../../../8_utils/helpers/store";
import { TUserInfo } from "../../Auth/model/types";

const initialState = {
  id: 0,
  first_name: "",
  second_name: "",
  display_name: "",
  login: "",
  email: "",
  phone: "",
  avatar: "",
};

export const ProfileStore = new Store<TUserInfo>(initialState);
