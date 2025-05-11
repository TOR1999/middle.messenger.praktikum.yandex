import { Button } from "../../7_shared/Button/Button";
import { Input } from "../../7_shared/Input/Input";
import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./AuthorizationModal.module.scss";

const authorizationModalTemplate = `
<form class=${s["content"]}>
  <div class=${s["tittle"]}> 
    {{{TypographyTitle}}}
  </div>
  <div class="${`${s["input"]} ${s["input_login"]}`}">
    {{{InputLogin}}}
  </div>
  <div class="${`${s["input"]} ${s["input_password"]}`}">
   {{{InputPassword}}}
  </div>
  <div class=${s["button-auth"]}>
   {{{ButtonAuth}}}
  </div>
  {{{LinkRegistration}}}
</form>
`;

type TProps = {
  valueLogin: string;
  valuePassword: string;
};

export class AuthorizationModal extends Block {
  constructor(props: TProps) {
    super("div", {
      Typography: new Typography({
        variant: "b1",
        text: getLang("authorizationModal.tittle"),
      }),
      InputLogin: new Input({
        inputId: "loginId",
        nameInput: "login",
        variant: "text",
        textLabel: getLang("common.login"),
        value: props.valueLogin,
      }),
      InputPassword: new Input({
        inputId: "passwordId",
        nameInput: "password",
        variant: "password",
        textLabel: getLang("common.password"),
        value: props.valuePassword,
      }),
      ButtonAuth: new Button({
        id: "button-auth",
        text: getLang("authorizationModal.buttonsText.auth"),
        disabled: false,
        onClick: () => {
          console.log({
            login: props.valueLogin,
            password: props.valuePassword,
          });
        },
      }),
      LinkRegistration: new Link({
        href: "#",
        variant: "text",
        text: getLang("authorizationModal.buttonsText.registration"),
      }),
    });
  }

  override render() {
    return this.compile(authorizationModalTemplate, this.props);
  }
}
