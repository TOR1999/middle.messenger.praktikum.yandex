import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { validatePassword } from "../../8_utils/helpers/validatePassword";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorPassword.module.scss";

const profilePageEditorPasswordTemplate = `
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
      {{{TypographyOldPassword}}}
      <div class=${s["info"]}>
        {{{InputOldPassword}}}
        {{{TypographyOldPasswordError}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyNewPassword}}}
      <div class=${s["info"]}>
        {{{InputNewPassword}}}
        {{{TypographyNewPasswordError}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyRepeatNewPassword}}}
      <div class=${s["info"]}>
        {{{InputRepeatNewPassword}}}
        {{{TypographyRepeatNewPasswordError}}}
      </div>
    </div>
   
    <div class=${s["button-save"]}>
      {{{ButtonSaveNewPassword}}}
    </div>
  </form>
</div>
`;

type TProps = {
  valueOldPassword: string;
  valueNewPassword: string;
  valueRepeatNewPassword: string;
  onClick?: (e: Event) => void;
};

export class ProfilePageEditorPassword extends Block {
  textError = false;

  constructor(props: TProps) {
    const TypographyOldPasswordError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographyNewPasswordError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
    });
    const TypographyRepeatNewPasswordError = new Typography({
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
      TypographyOldPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.old"),
      }),
      InputOldPassword: new Input({
        inputId: "oldPasswordId",
        classStyle: "textRight",
        nameInput: "oldPassword",
        variant: "text",
        value: props.valueOldPassword,
      }),
      TypographyNewPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.new"),
      }),
      InputNewPassword: new Input({
        inputId: "newPasswordId",
        classStyle: "textRight",
        nameInput: "newPassword",
        variant: "text",
        value: props.valueNewPassword,
      }),
      TypographyRepeatNewPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.repeatNew"),
      }),
      InputRepeatNewPassword: new Input({
        inputId: "repeatNewPasswordId",
        classStyle: "textRight",
        nameInput: "repeatNewPassword",
        variant: "text",
        value: props.valueRepeatNewPassword,
        onBlur: (e: Event) => console.log("e input", e),
      }),
      TypographyOldPasswordError,
      TypographyNewPasswordError,
      TypographyRepeatNewPasswordError,
      ButtonSaveNewPassword: new Button({
        id: "editProfileId",
        text: getLang("common.buttons.save"),
        disabled: false,
        onClick: (e: Event) => {
          e.preventDefault();

          const inputOldPassword = document.getElementById(
            "oldPasswordId",
          ) as HTMLInputElement;
          const oldPassword = inputOldPassword?.value;

          const inputNewPassword = document.getElementById(
            "newPasswordId",
          ) as HTMLInputElement;
          const newPassword = inputNewPassword?.value;

          const inputRepeatNewPassword = document.getElementById(
            "repeatNewPasswordId",
          ) as HTMLInputElement;
          const repeatNewPassword = inputRepeatNewPassword?.value;

          if (oldPassword !== props.valueOldPassword) {
            TypographyOldPasswordError.setProps({
              text: getLang("validateText.oldPassword"),
            });
          } else {
            TypographyOldPasswordError.setProps({ text: "" });
          }

          if (newPassword !== repeatNewPassword) {
            TypographyRepeatNewPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });
            TypographyNewPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });
          } else {
            if (validatePassword(newPassword)) {
              TypographyRepeatNewPasswordError.setProps({
                text: "",
              });
              TypographyNewPasswordError.setProps({
                text: "",
              });
            } else {
              TypographyRepeatNewPasswordError.setProps({
                text: getLang("validateText.password"),
              });
              TypographyNewPasswordError.setProps({
                text: getLang("validateText.password"),
              });
            }
          }

          console.log({
            oldPassword: props.valueOldPassword,
            newPassword: props.valueNewPassword,
          });
        },
      }),
    });
  }

  override render() {
    return this.compile(profilePageEditorPasswordTemplate, this.props);
  }
}
