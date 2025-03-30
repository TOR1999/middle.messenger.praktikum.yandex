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
    {{> Input variant="text" textLabel="${getLang("common.login")}"}}
  </div>
  <div class=${s["input-password"]}>
    {{> Input variant="password" textLabel="${getLang("common.password")}"}}
  </div>
    <div class=${s["button-auth"]}>
      {{> Button text="${getLang("authorizationModal.buttonsText.auth")}"}}
    </div>
  {{> Link 
      href="#"
      variant="text" 
      text="${getLang("authorizationModal.buttonsText.registration")}"
  }}
</div>
`;
