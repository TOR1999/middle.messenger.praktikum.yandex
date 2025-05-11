import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
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
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyNewPassword}}}
      <div class=${s["info"]}>
        {{{InputNewPassword}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyRepeatNewPassword}}}
      <div class=${s["info"]}>
        {{{InputRepeatNewPassword}}}
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
};

export class ProfilePageEditorPassword extends Block {
  constructor(props: TProps) {
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
        variant: "password",
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
        variant: "password",
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
        variant: "password",
        value: props.valueRepeatNewPassword,
      }),
      ButtonSaveNewPassword: new Button({
        id: "editProfileId",
        text: getLang("common.buttons.save"),
        disabled: false,
        onClick: () => {
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
