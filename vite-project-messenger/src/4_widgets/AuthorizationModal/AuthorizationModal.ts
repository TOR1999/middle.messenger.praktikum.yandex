import { getLang } from "../../8_utils/langs/getLang";
import s from "./AuthorizationModal.module.scss";

export const AuthorizationModal = `
<div class=${s["content"]}>
  <div class=${s["tittle"]}> 
    {{> Typography variant="b1" text="${getLang(
      "authorizationModal.tittle"
    )}" }}
  </div>
  <div class=${s["input-login"]}>
    {{> Input variant="text" textLabel="Логин" placeholderText="Логин"}}
  </div>
  <div class=${s["input-password"]}>
    {{> Input variant="password" textLabel="Пароль" placeholderText="Пароль"}}
  </div>
    <div class=${s["button-auth"]}>
      {{> Button id="add-question" text="${getLang(
        "authorizationModal.buttonsText.auth"
      )}"}}
    </div>
  {{> Link 
      href="#"
      variant="text" 
      class=this.variant 
      text="${getLang("authorizationModal.buttonsText.registration")}"
  }}
</div>
`;
