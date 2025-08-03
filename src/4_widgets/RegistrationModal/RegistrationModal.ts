import authApi from "../../6_entites/Auth/model/authApi";
import { Button } from "../../7_shared/Button/Button";
import { Input } from "../../7_shared/Input/Input";
import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { URL_NAMES } from "../../8_utils/constants/type";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import router from "../../8_utils/helpers/router";
import { validateEmail } from "../../8_utils/helpers/validateEmail";
import { validateLogin } from "../../8_utils/helpers/validateLogin";
import { validateName } from "../../8_utils/helpers/validateName";
import { validatePassword } from "../../8_utils/helpers/validatePassword";
import { validatePhone } from "../../8_utils/helpers/validatePhone";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./RegistrationModal.module.scss";

const registrationModalTemplate = `
  <div class=${s["tittle"]}> 
    {{{TypographyTitle}}}
  </div>
  <div class=${s["input"]}>
    {{{InputEmail}}}
    {{{TypographyEmailError}}}
  </div>
  <div class=${s["input"]}>
    {{{InputLogin}}}
    {{{TypographyLoginError}}}
  </div>
  <div class=${s["input"]}>
    {{{InputFirstName}}}
    {{{TypographyFirstNameError}}}
  </div>
  <div class=${s["input"]}>
    {{{InputSecondName}}}
    {{{TypographySecondNameError}}}
  </div>
  <div class=${s["input"]}>
    {{{InputPhone}}}
    {{{TypographyPhoneError}}}
  </div>
  <div class=${s["input"]}>
    {{{InputPassword}}}
    {{{TypographyPasswordError}}}
  </div>
  <div class=${s["input"]}>
    {{{InputRepeatPassword}}}
    {{{TypographyRepeatPasswordError}}}
  </div>
    <div class=${s["button-registration"]}>
      {{{ButtonRegistration}}}
    </div>
  {{{LinkAuth}}}
`;

type TProps = {
  valueEmail: string;
  valueLogin: string;
  valueFirstName: string;
  valueSecondName: string;
  valuePhone: string;
  valuePassword: string;
  valueRepeatPassword: string;
};

export class RegistrationModal extends Block<TProps> {
  constructor(props: TProps) {
    const TypographyEmailError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographyLoginError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographyFirstNameError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographySecondNameError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographyPhoneError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });

    const TypographyPasswordError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographyRepeatPasswordError = new Typography({
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
        text: getLang("registrationModal.tittle"),
      }),
      InputEmail: new Input({
        inputId: "emailId",
        nameInput: "email",
        variant: "text",
        textLabel: getLang("profilePage.email"),
        value: props.valueEmail,
        onBlur: () => {
          const email = getValueById("emailId");

          if (validateEmail(email)) {
            TypographyEmailError.setProps({ text: "" });
          } else {
            TypographyEmailError.setProps({
              text: getLang("validateText.email"),
            });
          }
        },
      }),
      TypographyEmailError,
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
      TypographyLoginError,
      InputFirstName: new Input({
        inputId: "firstNameId",
        nameInput: "first_name",
        variant: "text",
        textLabel: getLang("profilePage.name"),
        value: props.valueFirstName,
        onBlur: () => {
          const firstName = getValueById("firstNameId");

          if (validateName(firstName)) {
            TypographyFirstNameError.setProps({ text: "" });
          } else {
            TypographyFirstNameError.setProps({
              text: getLang("validateText.name"),
            });
          }
        },
      }),
      TypographyFirstNameError,
      InputSecondName: new Input({
        inputId: "secondNameId",
        nameInput: "second_name",
        variant: "text",
        textLabel: getLang("profilePage.secondName"),
        value: props.valueSecondName,
        onBlur: () => {
          const secondName = getValueById("secondNameId");

          if (validateName(secondName)) {
            TypographySecondNameError.setProps({ text: "" });
          } else {
            TypographySecondNameError.setProps({
              text: getLang("validateText.name"),
            });
          }
        },
      }),
      TypographySecondNameError,
      InputPhone: new Input({
        inputId: "phoneId",
        nameInput: "phone",
        variant: "text",
        textLabel: getLang("profilePage.phone"),
        value: props.valuePhone,
        onBlur: () => {
          const phone = getValueById("phoneId");

          if (validatePhone(phone)) {
            TypographyPhoneError.setProps({ text: "" });
          } else {
            TypographyPhoneError.setProps({
              text: getLang("validateText.phone"),
            });
          }
        },
      }),
      TypographyPhoneError,
      InputPassword: new Input({
        inputId: "passwordId",
        nameInput: "password",
        variant: "password",
        textLabel: getLang("common.password"),
        value: props.valuePassword,
        onBlur: () => {
          const password = getValueById("passwordId");
          const repeatPassword = getValueById("repeatPasswordId");

          if (password !== repeatPassword) {
            TypographyPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });

            TypographyRepeatPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });
          } else {
            if (validatePassword(password)) {
              TypographyPasswordError.setProps({
                text: "",
              });
              TypographyRepeatPasswordError.setProps({ text: "" });
            } else {
              TypographyPasswordError.setProps({
                text: getLang("validateText.password"),
              });
            }
          }
        },
      }),
      TypographyPasswordError,
      InputRepeatPassword: new Input({
        inputId: "repeatPasswordId",
        nameInput: "repeatPassword",
        variant: "password",
        textLabel: getLang("profilePage.repeatPassword"),
        value: props.valueRepeatPassword,
        onBlur: () => {
          const password = getValueById("passwordId");
          const repeatPassword = getValueById("repeatPasswordId");

          if (password !== repeatPassword) {
            TypographyPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });

            TypographyRepeatPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });
          } else {
            TypographyPasswordError.setProps({
              text: "",
            });
            TypographyRepeatPasswordError.setProps({ text: "" });
          }
        },
      }),
      TypographyRepeatPasswordError,
      ButtonRegistration: new Button({
        id: "ButtonRegistration",
        text: getLang("registrationModal.buttonsText.registration"),
        disabled: false,
        typeSubmit: true,
        onClick: (e: Event) => {
          e.preventDefault();

          const email = getValueById("emailId");
          const login = getValueById("loginId");
          const firstName = getValueById("firstNameId");
          const secondName = getValueById("secondNameId");
          const phone = getValueById("phoneId");
          const password = getValueById("passwordId");
          const repeatPassword = getValueById("repeatPasswordId");

          const isValidEmail = validateEmail(email);
          const isValidLogin = validateLogin(login);
          const isValidFirstName = validateName(firstName);
          const isValidSecondName = validateName(secondName);
          const isValidPhone = validatePhone(phone);
          const isValidPassword = validatePassword(password);
          const isNotValidRepeatPassword = password !== repeatPassword;
          const isValidForm =
            isValidEmail &&
            isValidLogin &&
            isValidFirstName &&
            isValidSecondName &&
            isValidPhone &&
            isValidPassword &&
            !isNotValidRepeatPassword;

          if (isValidEmail) {
            TypographyEmailError.setProps({ text: "" });
          } else {
            TypographyEmailError.setProps({
              text: getLang("validateText.email"),
            });
          }

          if (isValidLogin) {
            TypographyLoginError.setProps({ text: "" });
          } else {
            TypographyLoginError.setProps({
              text: getLang("validateText.login"),
            });
          }

          if (isValidFirstName) {
            TypographyFirstNameError.setProps({ text: "" });
          } else {
            TypographyFirstNameError.setProps({
              text: getLang("validateText.name"),
            });
          }

          if (isValidSecondName) {
            TypographySecondNameError.setProps({ text: "" });
          } else {
            TypographySecondNameError.setProps({
              text: getLang("validateText.name"),
            });
          }

          if (isValidPhone) {
            TypographyPhoneError.setProps({ text: "" });
          } else {
            TypographyPhoneError.setProps({
              text: getLang("validateText.phone"),
            });
          }

          if (isNotValidRepeatPassword) {
            TypographyPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });

            TypographyRepeatPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });
          } else {
            if (isValidPassword) {
              TypographyPasswordError.setProps({
                text: "",
              });
              TypographyRepeatPasswordError.setProps({ text: "" });
            } else {
              TypographyPasswordError.setProps({
                text: getLang("validateText.password"),
              });
            }
          }

          if (isValidForm) {
            authApi.signUp({
              first_name: firstName,
              second_name: secondName,
              login: login,
              email: email,
              password: password,
              phone: phone,
            });
          }
        },
      }),
      LinkAuth: new Link({
        href: "#",
        variant: "text",
        text: getLang("registrationModal.buttonsText.auth"),
        onClick: (e: Event) => {
          e.preventDefault();
          router.go(URL_NAMES.SIGNIN);
        },
      }),
    });
  }

  override render() {
    return this.compile(registrationModalTemplate, this.props);
  }
}
