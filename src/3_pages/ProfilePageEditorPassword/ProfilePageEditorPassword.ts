import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import { validatePassword } from "../../8_utils/helpers/validatePassword";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorPassword.module.scss";

const profilePageEditorPasswordTemplate = `
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
      textAlign: "right",
    });
    const TypographyNewPasswordError = new Typography({
      variant: "b7",
      text: "",
      color: "red",
      textAlign: "right",
    });
    const TypographyRepeatNewPasswordError = new Typography({
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
      TypographyOldPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.old"),
      }),
      InputOldPassword: new Input({
        inputId: "oldPasswordId",
        textPosition: "right",
        nameInput: "oldPassword",
        variant: "text",
        value: props.valueOldPassword,
        onBlur: () => {
          const oldPassword = getValueById("oldPasswordId");

          if (oldPassword !== props.valueOldPassword) {
            TypographyOldPasswordError.setProps({
              text: getLang("validateText.oldPassword"),
            });
          } else {
            TypographyOldPasswordError.setProps({ text: "" });
          }
        },
      }),
      TypographyNewPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.new"),
      }),
      InputNewPassword: new Input({
        inputId: "newPasswordId",
        textPosition: "right",
        nameInput: "newPassword",
        variant: "text",
        value: props.valueNewPassword,
        onBlur: () => {
          const repeatNewPassword = getValueById("repeatNewPasswordId");
          const newPassword = getValueById("newPasswordId");

          if (newPassword !== repeatNewPassword) {
            TypographyNewPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });
          } else {
            if (validatePassword(newPassword)) {
              TypographyNewPasswordError.setProps({
                text: "",
              });
            } else {
              TypographyNewPasswordError.setProps({
                text: getLang("validateText.password"),
              });
            }
          }
        },
      }),
      TypographyRepeatNewPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.repeatNew"),
      }),
      InputRepeatNewPassword: new Input({
        inputId: "repeatNewPasswordId",
        textPosition: "right",
        nameInput: "repeatNewPassword",
        variant: "text",
        value: props.valueRepeatNewPassword,
        onBlur: () => {
          const repeatNewPassword = getValueById("repeatNewPasswordId");
          const newPassword = getValueById("newPasswordId");

          if (newPassword !== repeatNewPassword) {
            TypographyRepeatNewPasswordError.setProps({
              text: getLang("validateText.repeatPassword"),
            });
          } else {
            if (validatePassword(newPassword)) {
              TypographyRepeatNewPasswordError.setProps({
                text: "",
              });
            } else {
              TypographyRepeatNewPasswordError.setProps({
                text: getLang("validateText.password"),
              });
            }
          }
        },
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

          const oldPassword = getValueById("oldPasswordId");
          const newPassword = getValueById("newPasswordId");
          const repeatNewPassword = getValueById("repeatNewPasswordId");

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
