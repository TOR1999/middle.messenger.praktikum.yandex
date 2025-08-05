import HTTPTransport from "../../../8_utils/api/HTTPTransport";
import { URL_NAMES } from "../../../8_utils/constants/type";
import router from "../../../8_utils/helpers/router";
import { getLang } from "../../../8_utils/langs/getLang";
import { ProfileStore } from "./store";
import {
  TChangeUserInfoRequest,
  TChangeUserPasswordRequest,
  TFindUserRequest,
} from "./types";

class ProfileAPI {
  __basePath = "";
  constructor() {
    this.__basePath = "user";
  }

  changeAvatar(data: FormData) {
    HTTPTransport.put(`${this.__basePath}/profile/avatar`, { data })
      .then(({ response }: any) => {
        const data = JSON.parse(response);

        ProfileStore.setState({ ...data });
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  changeUserInfo(data: TChangeUserInfoRequest) {
    HTTPTransport.put(`${this.__basePath}/profile`, { data })
      .then(({ response }: any) => {
        const data = JSON.parse(response);

        ProfileStore.setState({ ...data });
        router.go(URL_NAMES.SETTINGS);
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  changeUserPassword(data: TChangeUserPasswordRequest) {
    HTTPTransport.put(`${this.__basePath}/password`, { data })
      .then(() => {
        ProfileStore.setState(ProfileStore.getState());
        router.go(URL_NAMES.SETTINGS);
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
        router.go(URL_NAMES.SERVER_ERROR);
      });
  }

  searchUserByLogin(data: TFindUserRequest) {
    HTTPTransport.post(`${this.__basePath}/search`, { data })
      .then(() => {})
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }
}

export default new ProfileAPI();
