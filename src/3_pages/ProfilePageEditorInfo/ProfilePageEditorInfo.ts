import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
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
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyLogin}}}
      <div class=${s["info"]}>
        {{{InputLogin}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyUserName}}}
      <div class=${s["info"]}>
        {{{InputUserName}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographySecondName}}}
      <div class=${s["info"]}>
        {{{InputSecondName}}}
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
      ButtonSaveInfoProfile: new Button({
        id: "buttonSaveProfile",
        text: getLang("common.buttons.save"),
        disabled: false,
        onClick: () => {
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
