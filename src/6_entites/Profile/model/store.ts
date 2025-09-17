import { Store } from "../../../8_utils/helpers/store";
import { TInitialStateProfileStore } from "./types";

export const initialStateProfileStore: TInitialStateProfileStore = {
  myUser: {
    id: 0,
    first_name: "",
    second_name: "",
    display_name: "",
    login: "",
    email: "",
    phone: "",
    avatar: "",
  },
  searchingUsers: [],
};

export const ProfileStore = new Store<TInitialStateProfileStore>(
  initialStateProfileStore,
);
