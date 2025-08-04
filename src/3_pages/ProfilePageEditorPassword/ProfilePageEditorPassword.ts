import profileApi from "../../6_entites/Profile/model/profileApi";
import { ProfileStore } from "../../6_entites/Profile/model/store";
import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { URL_NAMES } from "../../8_utils/constants/type";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import router from "../../8_utils/helpers/router";
import { StoreEvents } from "../../8_utils/helpers/store";
import { validatePassword } from "../../8_utils/helpers/validatePassword";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorPassword.module.scss";

const profilePageEditorPasswordTemplate = (avatar: string) => {
  const imgAvatar = avatar ? avatar : "/icons/imageProfile.svg";
  return `
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{{CircleIconButtonArrowBack}}}
    </div>
  </div>
  <form class=${s["content"]}>
    <div class=${s["image-profile-container"]}>
      <img 
      src=${imgAvatar}
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
};

type TProps = {
  valueAvatar: string;
  valueOldPassword: string;
  valueNewPassword: string;
  valueRepeatNewPassword: string;
  onClick?: (e: Event) => void;
};

export class ProfilePageEditorPassword extends Block<TProps> {
  textError = false;

  constructor() {
    ProfileStore.on(StoreEvents.UPDATE, () => {
      const storeState = ProfileStore.getState();
      this.setProps({
        valueAvatar: storeState.avatar || "",
        valueNewPassword: "",
        valueOldPassword: "",
        valueRepeatNewPassword: "",
      });
    });

    super("div", {
      attr: {
        class: `${s["container"]}`,
      },
      CircleIconButtonArrowBack: new CircleIconButton({
        id: "arrowBackId",
        iconSrc: "/icons/arrowBack.svg",
        altText: getLang("common.buttons.altBack"),
        onClick: (e: Event) => {
          e.preventDefault();
          router.go(URL_NAMES.SETTINGS);
        },
      }),
      TypographyOldPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.old"),
      }),
      TypographyNewPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.new"),
      }),
      TypographyRepeatNewPassword: new Typography({
        variant: "h3",
        text: getLang("profilePage.editPassword.repeatNew"),
      }),
    });
  }

  override render() {
    const props = this.props;

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

    this.children = {
      ...this.children,
      InputOldPassword: new Input({
        inputId: "oldPasswordId",
        textPosition: "right",
        nameInput: "oldPassword",
        variant: "text",
        value: props.valueOldPassword,
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
        typeSubmit: true,
        onClick: (e: Event) => {
          e.preventDefault();
          const oldPassword = getValueById("oldPasswordId");
          const newPassword = getValueById("newPasswordId");
          const repeatNewPassword = getValueById("repeatNewPasswordId");

          const notEmptyForm =
            oldPassword.length > 0 &&
            newPassword.length > 0 &&
            repeatNewPassword.length > 0;
          const isValidForm =
            notEmptyForm &&
            validatePassword(newPassword) &&
            newPassword === repeatNewPassword;

          if (!notEmptyForm) {
            TypographyOldPasswordError.setProps({
              text: getLang("validateText.emtyFields"),
            });
            TypographyRepeatNewPasswordError.setProps({
              text: getLang("validateText.emtyFields"),
            });
            TypographyNewPasswordError.setProps({
              text: getLang("validateText.emtyFields"),
            });
            return;
          } else {
            TypographyOldPasswordError.setProps({
              text: "",
            });
            TypographyRepeatNewPasswordError.setProps({
              text: "",
            });
            TypographyNewPasswordError.setProps({
              text: "",
            });
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

          if (isValidForm) {
            profileApi.changeUserPassword({ oldPassword, newPassword });
          }
        },
      }),
    };

    return this.compile(
      profilePageEditorPasswordTemplate(this.props.valueAvatar),
      this.props,
    );
  }
}
