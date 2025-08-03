import HTTPTransport from "../../../8_utils/api/HTTPTransport";
import { TSigInRequest, TUserRegistrationRequest } from "./types";

class AuthAPI {
  __basePath = "";
  constructor() {
    this.__basePath = "auth";
  }

  signUp(data: TUserRegistrationRequest) {
    //   alert("Успех!");
    // };
    // AuthStore.setState({ 1: "успех" });

    HTTPTransport.post(`${this.__basePath}/signup`, { data })
      .then(({ response }: any) => {
        console.log("Sucssesful signup");
        console.log("response:", response);
      })
      .catch(() => {
        console.log("Error");
      });
  }

  signIn(data: TSigInRequest) {
    HTTPTransport.post(`${this.__basePath}/signin`, { data })
      .then(() => {
        console.log("Sucssesful sigin");
      })
      .catch(() => {
        console.log("Error");
      });
  }

  getUserInfo() {
    HTTPTransport.get(`${this.__basePath}/user`)
      .then(({ response }: any) => {
        console.log("response:", response);
      })
      .catch(() => {
        console.log("Error");
      });
  }

  logout() {
    HTTPTransport.post(`${this.__basePath}/logout`)
      .then(() => {
        console.log("Sucssesful logout");
      })
      .catch(() => {
        console.log("Error");
      });
  }
}

export default new AuthAPI();
