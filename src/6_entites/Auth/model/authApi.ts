import HTTPTransport from "../../../8_utils/api/HTTPTransport";
import { STORAGE_IS_AUTH } from "../../../8_utils/constants/constants";
import { URL_NAMES } from "../../../8_utils/constants/type";
import router from "../../../8_utils/helpers/router";
import { getLang } from "../../../8_utils/langs/getLang";
import { ProfileStore } from "../../Profile/model/store";
import { TSigInRequest, TUserRegistrationRequest } from "./types";

class AuthAPI {
  __basePath = "";
  constructor() {
    this.__basePath = "auth";
  }

  signUp(data: TUserRegistrationRequest) {
    HTTPTransport.post(`${this.__basePath}/signup`, { data })
      .then(() => {
        router.go(URL_NAMES.MESSAGER);
        this.getUserInfo();
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
      });
  }

  signIn(data: TSigInRequest) {
    HTTPTransport.post(`${this.__basePath}/signin`, { data })
      .then(() => {
        router.go(URL_NAMES.MESSAGER);
        localStorage.setItem(STORAGE_IS_AUTH, "true");
        this.getUserInfo();
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
        router.go(URL_NAMES.SERVER_ERROR);
      });
  }

  getUserInfo() {
    HTTPTransport.get(`${this.__basePath}/user`)
      .then(({ response }: any) => {
        const data = JSON.parse(response);

        ProfileStore.setState({ ...data });
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
        router.go(URL_NAMES.SERVER_ERROR);
      });
  }

  logout() {
    HTTPTransport.post(`${this.__basePath}/logout`)
      .then(() => {
        localStorage.removeItem(STORAGE_IS_AUTH);
        router.go(URL_NAMES.SIGNIN);
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
        router.go(URL_NAMES.SERVER_ERROR);
      });
  }
}

export default new AuthAPI();
