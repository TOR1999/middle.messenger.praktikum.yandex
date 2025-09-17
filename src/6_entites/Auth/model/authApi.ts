import HTTPTransport from "../../../8_utils/api/HTTPTransport";
import { STORAGE_IS_AUTH } from "../../../8_utils/constants/constants";
import { URL_NAMES } from "../../../8_utils/constants/type";
import { getMessageFromResponse } from "../../../8_utils/helpers/getMessageFromResponse";
import router from "../../../8_utils/helpers/router";
import { getLang } from "../../../8_utils/langs/getLang";
import chatApi from "../../Chat/chatApi";
import { ChatStore, initialStateChatStore } from "../../Chat/store";
import {
  initialStateProfileStore,
  ProfileStore,
} from "../../Profile/model/store";
import { TSigInRequest, TUserRegistrationRequest } from "./types";

class AuthAPI {
  __basePath = "";
  constructor() {
    this.__basePath = "auth";
  }

  signUp(data: TUserRegistrationRequest) {
    HTTPTransport.post(`${this.__basePath}/signup`, { data })
      .then(() => {
        localStorage.setItem(STORAGE_IS_AUTH, "true");
        chatApi.getChats({ offset: 0, limit: 10, title: "" });
        this.getUserInfo();
        router.go(URL_NAMES.MESSAGER);
      })
      .catch((error) => {
        const errorText = getMessageFromResponse(error.responseText);

        if (errorText === "Login already exists") {
          alert(getLang("errorRequest.loginAlreadyExists"));
          return;
        }

        if (errorText === "Email already exists") {
          alert(getLang("errorRequest.emailAlreadyExists"));
          return;
        }

        if (errorText === "User already in system") {
          localStorage.setItem(STORAGE_IS_AUTH, "true");
          chatApi.getChats({ offset: 0, limit: 10, title: "" });
          this.getUserInfo();
          router.go(URL_NAMES.MESSAGER);
          return;
        }

        alert(getLang("errorRequest.badRequest"));
      });
  }

  signIn(data: TSigInRequest) {
    HTTPTransport.post(`${this.__basePath}/signin`, { data })
      .then(() => {
        localStorage.setItem(STORAGE_IS_AUTH, "true");
        chatApi.getChats({ offset: 0, limit: 10, title: "" });
        this.getUserInfo();
        router.go(URL_NAMES.MESSAGER);
      })
      .catch((error) => {
        const errorText = getMessageFromResponse(error.responseText);

        if (errorText === "Login or password is incorrect") {
          alert(getLang("errorRequest.loginOrPasswordIsIncorrect"));
          return;
        }

        if (errorText === "User already in system") {
          localStorage.setItem(STORAGE_IS_AUTH, "true");
          chatApi.getChats({ offset: 0, limit: 10, title: "" });
          this.getUserInfo();
          router.go(URL_NAMES.MESSAGER);
          return;
        }

        alert(getLang("errorRequest.badRequest"));
        router.go(URL_NAMES.SERVER_ERROR);
      });
  }

  getUserInfo() {
    HTTPTransport.get(`${this.__basePath}/user`)
      .then((value: unknown) => {
        const response = (value as { response: string }).response;
        const data = JSON.parse(response);

        ProfileStore.setState({ myUser: { ...data } });
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
        ChatStore.setState(initialStateChatStore);
        ProfileStore.setState(initialStateProfileStore);
      })
      .catch(() => {
        alert(getLang("errorRequest.badRequest"));
        router.go(URL_NAMES.SERVER_ERROR);
      });
  }
}

export default new AuthAPI();
