import { Store } from "../../../8_utils/helpers/store";

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

export const AuthStore = new Store(initialState);
