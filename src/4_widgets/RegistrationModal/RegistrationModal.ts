import { getLang } from "../../8_utils/langs/getLang";
import s from "./RegistrationModal.module.scss";

export const RegistrationModal = `
<form class=${s["content"]}>
  <div class=${s["tittle"]}> 
    {{> Typography
        variant="b1"
        text="${getLang("registrationModal.tittle")}"
     }}
  </div>
  <div class=${s["input"]}>
    {{> Input
        inputId="emailId"
        nameInput="email"
        variant="text" 
        textLabel="${getLang("profilePage.email")}"
        value=valueEmail
     }}
  </div>
  <div class=${s["input"]}>
    {{> Input
        inputId="loginId"
        nameInput="login"
        variant="text"
        textLabel="${getLang("common.login")}"
        value=valueLogin
     }}
  </div>
  <div class=${s["input"]}>
    {{> Input
        inputId="firstNameId"
        nameInput="first_name"
        variant="text"
        textLabel="${getLang("profilePage.name")}"
        value=valueFirstName
     }}
  </div>
  <div class=${s["input"]}>
    {{> Input
        inputId="secondNameId"
        nameInput="second_name"
        variant="text"
        textLabel="${getLang("profilePage.secondName")}"
        value=valueSecondName
     }}
  </div>
  <div class=${s["input"]}>
    {{> Input
        inputId="phoneId"
        nameInput="phone"
        variant="text"
        textLabel="${getLang("profilePage.phone")}"
        value=valuePhone
     }}
  </div>
  <div class=${s["input"]}>
    {{> Input
        inputId="passwordId"
        nameInput="password"
        variant="password"
        textLabel="${getLang("common.password")}"
        value=valuePassword
     }}
  </div>
  <div class=${s["input"]}>
    {{> Input
        inputId="repeatPasswordId"
        nameInput="repeatPassword"
        variant="password"
        textLabel="${getLang("profilePage.repeatPassword")}"
        value=valueRepeatPassword
    }}
  </div>
    <div class=${s["button-registration"]}>
      {{> Button
          id="ButtonRegistration"
          text="${getLang("registrationModal.buttonsText.registration")}"}}
    </div>
  {{> Link 
      href="#"
      variant="text" 
      class=this.variant 
      text="${getLang("registrationModal.buttonsText.auth")}"
  }}
</form>
`;
