import { getLang } from "../../8_utils/langs/getLang";
import s from "./AuthorizationModal.module.scss";

export const AuthorizationModal = `
<form class=${s["content"]}>
  <div class=${s["tittle"]}> 
    {{> Typography 
        variant="b1" 
        text="${getLang("authorizationModal.tittle")}" 
    }}
  </div>
  <div class=${s["input-login"]}>
    {{> Input 
        inputId="loginId"
        nameInput="login"
        variant="text"
        textLabel="${getLang("common.login")}"
        value=valueLogin
    }}
  </div>
  <div class=${s["input-password"]}>
    {{> Input 
        inputId="passwordId"
        nameInput="password"
        variant="password"
        textLabel="${getLang("common.password")}"
        value=valuePassword
    }}
  </div>
    <div class=${s["button-auth"]}>
      {{> Button 
          id="button-auth"
          text="${getLang("authorizationModal.buttonsText.auth")}"
      }}
    </div>
  {{> Link 
      href="#"
      variant="text" 
      text="${getLang("authorizationModal.buttonsText.registration")}"
  }}
</form>
`;
