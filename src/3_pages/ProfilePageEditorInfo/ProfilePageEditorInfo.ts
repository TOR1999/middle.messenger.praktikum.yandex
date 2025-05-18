import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import { validateEmail } from "../../8_utils/helpers/validateEmail";
import { validateLogin } from "../../8_utils/helpers/validateLogin";
import { validateName } from "../../8_utils/helpers/validateName";
import { validatePhone } from "../../8_utils/helpers/validatePhone";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorInfo.module.scss";

const profilePageEditorInfoTemplate = `
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{{CircleIconButtonArrowBack}}}
    </div>
  </div>
  <form class=${s["content"]}>
    <div class=${s["image-profile-container"]}>
      <img 
      src="/icons/imageProfile.svg"
      alt="${getLang("profilePage.altImageProfile")}"
      />
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyEmail}}}
      <div class=${s["info"]}>
        {{{InputEmail}}}
        {{{TypographyEmailError}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyLogin}}}
      <div class=${s["info"]}>
        {{{InputLogin}}}
        {{{TypographyLoginError}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyUserName}}}
      <div class=${s["info"]}>
        {{{InputUserName}}}
        {{{TypographyFirstNameError}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographySecondName}}}
      <div class=${s["info"]}>
        {{{InputSecondName}}}
        {{{TypographySecondNameError}}}
        {{{TypographySecondNameError}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyNickName}}}
      <div class=${s["info"]}>
        {{{InputNickName}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyPhone}}}
      <div class=${s["info"]}>
        {{{InputPhone}}}
        {{{TypographyPhoneError}}}
      </div>
    </div>
    <div class=${s["button-save"]}>
      {{{ButtonSaveInfoProfile}}}
    </div>
  </form>
`;

type TProps = {
  valueEmail: string;
  valueLogin: string;
  valueFirstName: string;
  valueSecondName: string;
  valueNickName: string;
  valuePhone: string;
};

export class ProfilePageEditorInfo extends Block {
  constructor(props: TProps) {
    const TypographyEmailError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
      textAlign: "right",
    });
    const TypographyLoginError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
      textAlign: "right",
    });
    const TypographyFirstNameError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
      textAlign: "right",
    });
    const TypographySecondNameError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
      textAlign: "right",
    });
    const TypographyPhoneError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
      textAlign: "right",
    });

    super("div", {
      attr: {
        class: `${s["container"]}`,
      },
      CircleIconButtonArrowBack: new CircleIconButton({
        id: "arrowBackId",
        iconSrc: "/icons/arrowBack.svg",
        altText: getLang("common.buttons.altBack"),
      }),
      TypographyEmail: new Typography({
        variant: "h3",
        text: getLang("profilePage.email"),
      }),
      InputEmail: new Input({
        value: "",
        inputId: "emailId",
        textPosition: "right",
        nameInput: "email",
        variant: "text",
        textPlaceholder: props.valueEmail,
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
      TypographyLogin: new Typography({
        variant: "h3",
        text: getLang("common.login"),
      }),
      InputLogin: new Input({
        value: "",
        inputId: "loginId",
        textPosition: "right",
        nameInput: "login",
        variant: "text",
        textPlaceholder: props.valueLogin,
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
      TypographyUserName: new Typography({
        variant: "h3",
        text: getLang("profilePage.name"),
      }),
      InputUserName: new Input({
        value: "",
        inputId: "firstNameId",
        textPosition: "right",
        nameInput: "first_name",
        variant: "text",
        textPlaceholder: props.valueFirstName,
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
      TypographySecondName: new Typography({
        variant: "h3",
        text: getLang("profilePage.secondName"),
      }),
      InputSecondName: new Input({
        value: "",
        inputId: "secondNameId",
        textPosition: "right",
        nameInput: "second_name",
        variant: "text",
        textPlaceholder: props.valueSecondName,
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
      TypographyNickName: new Typography({
        variant: "h3",
        text: getLang("profilePage.nickName"),
      }),
      InputNickName: new Input({
        value: "",
        inputId: "displayNameId",
        textPosition: "right",
        nameInput: "display_name",
        variant: "text",
        textPlaceholder: props.valueNickName,
      }),
      TypographyPhone: new Typography({
        variant: "h3",
        text: getLang("profilePage.phone"),
      }),
      InputPhone: new Input({
        value: "",
        inputId: "phoneId",
        textPosition: "right",
        nameInput: "phone",
        variant: "text",
        textPlaceholder: props.valuePhone,
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
      ButtonSaveInfoProfile: new Button({
        id: "buttonSaveProfile",
        text: getLang("common.buttons.save"),
        disabled: false,
        typeSubmit: true,
        onClick: (e: Event) => {
          e.preventDefault();

          const email = getValueById("emailId");
          const login = getValueById("loginId");
          const firstName = getValueById("firstNameId");
          const secondName = getValueById("secondNameId");
          const phone = getValueById("phoneId");

          if (validateEmail(email)) {
            TypographyEmailError.setProps({ text: "" });
          } else {
            TypographyEmailError.setProps({
              text: getLang("validateText.email"),
            });
          }

          if (validateLogin(login)) {
            TypographyLoginError.setProps({ text: "" });
          } else {
            TypographyLoginError.setProps({
              text: getLang("validateText.login"),
            });
          }

          if (validateName(firstName)) {
            TypographyFirstNameError.setProps({ text: "" });
          } else {
            TypographyFirstNameError.setProps({
              text: getLang("validateText.name"),
            });
          }

          if (validateName(secondName)) {
            TypographySecondNameError.setProps({ text: "" });
          } else {
            TypographySecondNameError.setProps({
              text: getLang("validateText.name"),
            });
          }

          if (validatePhone(phone)) {
            TypographyPhoneError.setProps({ text: "" });
          } else {
            TypographyPhoneError.setProps({
              text: getLang("validateText.phone"),
            });
          }

          console.log({
            first_name: props.valueFirstName,
            second_name: props.valueSecondName,
            display_name: props.valueNickName,
            login: props.valueLogin,
            email: props.valueEmail,
            phone: props.valuePhone,
          });
        },
      }),
    });
  }

  override render() {
    return this.compile(profilePageEditorInfoTemplate, this.props);
  }
}
