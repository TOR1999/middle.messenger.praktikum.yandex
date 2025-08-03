import authApi from "../../6_entites/Auth/model/authApi";
import { Button } from "../../7_shared/Button/Button";
import { Input } from "../../7_shared/Input/Input";
import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { URL_NAMES } from "../../8_utils/constants/type";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import router from "../../8_utils/helpers/router";
import { validateLogin } from "../../8_utils/helpers/validateLogin";
import { validatePassword } from "../../8_utils/helpers/validatePassword";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./AuthorizationModal.module.scss";

const authorizationModalTemplate = `
  <div class=${s["tittle"]}> 
    {{{TypographyTitle}}}
  </div>
  <div class="${`${s["input"]} ${s["input_login"]}`}">
    {{{InputLogin}}}
    {{{TypographyLoginError}}}
  </div>
  <div class="${`${s["input"]} ${s["input_password"]}`}">
   {{{InputPassword}}}
   {{{TypographyPasswordError}}}
  </div>
  <div class=${s["button-auth"]}>
   {{{ButtonAuth}}}
  </div>
  {{{LinkRegistration}}}
`;

type TProps = {
  valueLogin: string;
  valuePassword: string;
};

export class AuthorizationModal extends Block {
  constructor(props: TProps) {
    const TypographyLoginError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographyPasswordError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });

    super("form", {
      attr: {
        class: `${s["content"]}`,
      },
      TypographyTitle: new Typography({
        variant: "b1",
        text: getLang("authorizationModal.tittle"),
      }),
      InputLogin: new Input({
        inputId: "loginId",
        nameInput: "login",
        variant: "text",
        textLabel: getLang("common.login"),
        value: props.valueLogin,
        onBlur: () => {
          const login = getValueById("loginId");

          if (validateLogin(login)) {
            TypographyLoginError.setProps({ text: "" });
          } else {
            TypographyLoginError.setProps({
              text: getLang("validateText.login"),
            });
          }
        },
      }),
      InputPassword: new Input({
        inputId: "passwordId",
        nameInput: "password",
        variant: "password",
        textLabel: getLang("common.password"),
        value: props.valuePassword,
        onBlur: () => {
          const password = getValueById("passwordId");

          if (validatePassword(password)) {
            TypographyPasswordError.setProps({ text: "" });
          } else {
            TypographyPasswordError.setProps({
              text: getLang("validateText.password"),
            });
          }
        },
      }),
      ButtonAuth: new Button({
        id: "button-auth",
        text: getLang("authorizationModal.buttonsText.auth"),
        disabled: false,
        typeSubmit: true,
        onClick: (e: Event) => {
          e.preventDefault();

          const login = getValueById("loginId");
          const password = getValueById("passwordId");

          const isValidLogin = validateLogin(login);
          const isValidPassword = validatePassword(password);
          const isValidForm = isValidLogin && isValidPassword;

          if (isValidLogin) {
            TypographyLoginError.setProps({ text: "" });
          } else {
            TypographyLoginError.setProps({
              text: getLang("validateText.login"),
            });
          }

          if (isValidPassword) {
            TypographyPasswordError.setProps({ text: "" });
          } else {
            TypographyPasswordError.setProps({
              text: getLang("validateText.password"),
            });
          }

          if (isValidForm) {
            authApi.signIn({
              login: login,
              password: password,
            });
          }
        },
      }),
      LinkRegistration: new Link({
        href: "#",
        variant: "text",
        text: getLang("authorizationModal.buttonsText.registration"),
        dataPage: "iliya",
        onClick: (e: Event) => {
          e.preventDefault();
          router.go(URL_NAMES.SIGNUP);
        },
      }),
      TypographyLoginError,
      TypographyPasswordError,
    });
  }

  override render() {
    return this.compile(authorizationModalTemplate, this.props);
  }
}
