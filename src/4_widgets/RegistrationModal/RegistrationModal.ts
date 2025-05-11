import { Button } from "../../7_shared/Button/Button";
import { Input } from "../../7_shared/Input/Input";
import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./RegistrationModal.module.scss";

export const registrationModalTemplate = `
<form class=${s["content"]}>
  <div class=${s["tittle"]}> 
    {{{TypographyTitle}}}
  </div>
  <div class=${s["input"]}>
    {{{InputEmail}}}
  </div>
  <div class=${s["input"]}>
    {{{InputLogin}}}
  </div>
  <div class=${s["input"]}>
    {{{InputFirstName}}}
  </div>
  <div class=${s["input"]}>
    {{{InputSecondName}}}
  </div>
  <div class=${s["input"]}>
    {{{InputPhone}}}
  </div>
  <div class=${s["input"]}>
    {{{InputPassword}}}
  </div>
  <div class=${s["input"]}>
    {{{InputRepeatPassword}}}
  </div>
    <div class=${s["button-registration"]}>
      {{{ButtonRegistration}}}
    </div>
  {{{LinkAuth}}}
</form>
`;

export type TProps = {
  valueEmail: string;
  valueLogin: string;
  valueFirstName: string;
  valueSecondName: string;
  valuePhone: string;
  valuePassword: string;
  valueRepeatPassword: string;
};

export class RegistrationModal extends Block {
  constructor(props: TProps) {
    super("div", {
      TypographyTitle: new Typography({
        variant: "b1",
        text: getLang("registrationModal.tittle"),
      }),
      InputEmail: new Input({
        inputId: "emailId",
        nameInput: "email",
        variant: "text",
        textLabel: getLang("profilePage.email"),
        value: props.valueEmail,
      }),
      InputLogin: new Input({
        inputId: "loginId",
        nameInput: "login",
        variant: "text",
        textLabel: getLang("common.login"),
        value: props.valueLogin,
      }),
      InputFirstName: new Input({
        inputId: "firstNameId",
        nameInput: "first_name",
        variant: "text",
        textLabel: getLang("profilePage.name"),
        value: props.valueFirstName,
      }),
      InputSecondName: new Input({
        inputId: "secondNameId",
        nameInput: "second_name",
        variant: "text",
        textLabel: getLang("profilePage.secondName"),
        value: props.valueSecondName,
      }),
      InputPhone: new Input({
        inputId: "phoneId",
        nameInput: "phone",
        variant: "text",
        textLabel: getLang("profilePage.phone"),
        value: props.valuePhone,
      }),
      InputPassword: new Input({
        inputId: "passwordId",
        nameInput: "password",
        variant: "password",
        textLabel: getLang("common.password"),
        value: props.valuePassword,
      }),
      InputRepeatPassword: new Input({
        inputId: "repeatPasswordId",
        nameInput: "repeatPassword",
        variant: "password",
        textLabel: getLang("profilePage.repeatPassword"),
        value: props.valueRepeatPassword,
      }),
      ButtonRegistration: new Button({
        id: "ButtonRegistration",
        text: getLang("registrationModal.buttonsText.registration"),
        disabled: false,
        onClick: () => {
          console.log({
            first_name: props.valueFirstName,
            second_name: props.valueSecondName,
            login: props.valueLogin,
            email: props.valueEmail,
            password: props.valuePassword,
            phone: props.valuePhone,
          });
        },
      }),
      LinkAuth: new Link({
        href: "#",
        variant: "text",
        text: getLang("registrationModal.buttonsText.auth"),
      }),
    });
  }

  override render() {
    return this.compile(registrationModalTemplate, this.props);
  }
}
