import { TFoundUserInfo, TUserInfo } from "../../Auth/model/types";

export type TChangeUserInfoRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TChangeUserPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TFindUserRequest = {
  login: string;
};

export type TInitialStateProfileStore = {
  myUser: TUserInfo;
  searchingUsers: TFoundUserInfo[];
};
