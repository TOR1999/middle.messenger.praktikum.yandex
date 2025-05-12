import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { validateEmail } from "../../8_utils/helpers/validateEmail";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorInfo.module.scss";

const profilePageEditorInfoTemplate = `
<div class=${s["container"]}>
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
</div>
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

    super("div", {
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
        classStyle: "textRight",
        nameInput: "email",
        variant: "text",
        textPlaceholder: props.valueEmail,
      }),
      TypographyEmailError,
      TypographyLogin: new Typography({
        variant: "h3",
        text: getLang("common.login"),
      }),
      InputLogin: new Input({
        value: "",
        inputId: "loginId",
        classStyle: "textRight",
        nameInput: "login",
        variant: "text",
        textPlaceholder: props.valueLogin,
      }),
      TypographyLoginError,
      TypographyUserName: new Typography({
        variant: "h3",
        text: getLang("profilePage.name"),
      }),
      InputUserName: new Input({
        value: "",
        inputId: "firstNameId",
        classStyle: "textRight",
        nameInput: "first_name",
        variant: "text",
        textPlaceholder: props.valueFirstName,
      }),
      TypographyFirstNameError,
      TypographySecondName: new Typography({
        variant: "h3",
        text: getLang("profilePage.secondName"),
      }),
      InputSecondName: new Input({
        value: "",
        inputId: "secondNameId",
        classStyle: "textRight",
        nameInput: "second_name",
        variant: "text",
        textPlaceholder: props.valueSecondName,
      }),
      TypographySecondNameError,
      TypographyNickName: new Typography({
        variant: "h3",
        text: getLang("profilePage.nickName"),
      }),
      InputNickName: new Input({
        value: "",
        inputId: "displayNameId",
        classStyle: "textRight",
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
        classStyle: "textRight",
        nameInput: "phone",
        variant: "text",
        textPlaceholder: props.valuePhone,
      }),
      TypographyPhoneError,
      ButtonSaveInfoProfile: new Button({
        id: "buttonSaveProfile",
        text: getLang("common.buttons.save"),
        disabled: false,
        onClick: (e: Event) => {
          e.preventDefault();

          const inputEmail = document.getElementById(
            "emailId",
          ) as HTMLInputElement;
          const email = inputEmail?.value;

          const inputLogin = document.getElementById(
            "loginId",
          ) as HTMLInputElement;
          const login = inputLogin?.value;

          const inputFirstNameId = document.getElementById(
            "firstNameId",
          ) as HTMLInputElement;
          const firstName = inputFirstNameId?.value;

          const inputSecondName = document.getElementById(
            "secondNameId",
          ) as HTMLInputElement;
          const secondName = inputSecondName?.value;

          const inputPhone = document.getElementById(
            "phoneId",
          ) as HTMLInputElement;
          const phone = inputPhone?.value;

          if (validateEmail(email)) {
            TypographyEmailError.setProps({ text: "" });
          } else {
            TypographyEmailError.setProps({
              text: getLang("validateText.email"),
            });
          }

          if (validateEmail(login)) {
            TypographyLoginError.setProps({ text: "" });
          } else {
            TypographyLoginError.setProps({
              text: getLang("validateText.login"),
            });
          }

          if (validateEmail(firstName)) {
            TypographyFirstNameError.setProps({ text: "" });
          } else {
            TypographyFirstNameError.setProps({
              text: getLang("validateText.name"),
            });
          }

          if (validateEmail(secondName)) {
            TypographySecondNameError.setProps({ text: "" });
          } else {
            TypographySecondNameError.setProps({
              text: getLang("validateText.name"),
            });
          }

          if (validateEmail(phone)) {
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
