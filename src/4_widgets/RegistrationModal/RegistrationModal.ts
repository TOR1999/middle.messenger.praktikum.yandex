import { getLang } from "../../8_utils/langs/getLang";
import s from "./RegistrationModal.module.scss";

export const RegistrationModal = `
<div class=${s["content"]}>
  <div class=${s["tittle"]}> 
    {{> Typography variant="b1" text="${getLang("registrationModal.tittle")}" }}
  </div>
  <div class=${s["input"]}>
    {{> Input variant="text" textLabel="${getLang("profilePage.email")}"}}
  </div>
  <div class=${s["input"]}>
    {{> Input variant="text" textLabel="${getLang("common.login")}"}}
  </div>
  <div class=${s["input"]}>
    {{> Input variant="text" textLabel="${getLang("profilePage.name")}"}}
  </div>
  <div class=${s["input"]}>
    {{> Input variant="text" textLabel="${getLang("profilePage.secondName")}"}}
  </div>
  <div class=${s["input"]}>
    {{> Input variant="text" textLabel="${getLang("profilePage.telephone")}"}}
  </div>
  <div class=${s["input"]}>
    {{> Input variant="password" textLabel="${getLang("common.password")}"}}
  </div>
  <div class=${s["input"]}>
    {{> Input variant="password" textLabel="${getLang(
      "profilePage.repeatPassword"
    )}"}}
  </div>
    <div class=${s["button-registration"]}>
      {{> Button text="${getLang(
        "registrationModal.buttonsText.registration"
      )}"}}
    </div>
  {{> Link 
      href="#"
      variant="text" 
      class=this.variant 
      text="${getLang("registrationModal.buttonsText.auth")}"
  }}
</div>
`;
