import { ProfileStore } from "../../6_entites/Profile/model/store";
import profileApi from "../../6_entites/Profile/model/profileApi";
import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import router from "../../8_utils/helpers/router";
import { StoreEvents } from "../../8_utils/helpers/store";
import { validateEmail } from "../../8_utils/helpers/validateEmail";
import { validateLogin } from "../../8_utils/helpers/validateLogin";
import { validateName } from "../../8_utils/helpers/validateName";
import { validatePhone } from "../../8_utils/helpers/validatePhone";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorInfo.module.scss";
import { URL_NAMES } from "../../8_utils/constants/type";
import { BASE_URLS } from "../../8_utils/constants/constants";

const profilePageEditorInfoTemplate = (props: TProps) => {
  const imgAvatar = props.valueAvatar
    ? `${BASE_URLS.RESOURCES}${props.valueAvatar}`
    : "/icons/imageProfile.svg";

  return `
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{{CircleIconButtonArrowBack}}}
    </div>
  </div>
  <form class=${s["content"]}>
      <img
      class=${s["image-profile"]}
      src=${imgAvatar}
      alt="${getLang("profilePage.altImageProfile")}"
      />
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
};

type TProps = {
  valueAvatar: string;
  valueEmail: string;
  valueLogin: string;
  valueFirstName: string;
  valueSecondName: string;
  valueNickName: string;
  valuePhone: string;
};

export class ProfilePageEditorInfo extends Block<TProps> {
  constructor() {
    ProfileStore.on(StoreEvents.UPDATE, () => {
      const storeState = ProfileStore.getState().myUser;
      this.setProps({
        valueAvatar: storeState.avatar || "",
        valueEmail: storeState.email,
        valueFirstName: storeState.first_name,
        valueLogin: storeState.login,
        valueNickName: storeState.display_name ?? "",
        valuePhone: storeState.phone,
        valueSecondName: storeState.second_name,
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
      TypographyEmail: new Typography({
        variant: "h3",
        text: getLang("profilePage.email"),
      }),
      TypographyLogin: new Typography({
        variant: "h3",
        text: getLang("common.login"),
      }),
      TypographyUserName: new Typography({
        variant: "h3",
        text: getLang("profilePage.name"),
      }),
      TypographyNickName: new Typography({
        variant: "h3",
        text: getLang("profilePage.nickName"),
      }),
      TypographyPhone: new Typography({
        variant: "h3",
        text: getLang("profilePage.phone"),
      }),
    });
  }

  override render() {
    const props = this.props;

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

    this.children = {
      ...this.children,
      InputEmail: new Input({
        value: props.valueEmail,
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
      InputLogin: new Input({
        value: props.valueLogin,
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
      InputUserName: new Input({
        value: props.valueFirstName,
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
        value: props.valueSecondName,
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
      InputNickName: new Input({
        value: props.valueNickName,
        inputId: "displayNameId",
        textPosition: "right",
        nameInput: "display_name",
        variant: "text",
        textPlaceholder: props.valueNickName,
      }),
      InputPhone: new Input({
        value: props.valuePhone,
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
          const nickName = getValueById("displayNameId");

          const isValidEmail = validateEmail(email);
          const isValidLogin = validateLogin(login);
          const isValidFistName = validateName(firstName);
          const isValidSecondName = validateName(secondName);
          const isValidPhone = validatePhone(phone);

          const isValidForm =
            isValidEmail &&
            isValidLogin &&
            isValidFistName &&
            isValidSecondName &&
            isValidPhone;

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

          if (isValidFistName) {
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

          if (isValidForm) {
            profileApi.changeUserInfo({
              first_name: firstName,
              second_name: secondName,
              display_name: nickName,
              login: login,
              email: email,
              phone: phone,
            });
          }
        },
      }),
    };

    return this.compile(
      profilePageEditorInfoTemplate(this.props as TProps),
      this.props,
    );
  }
}
