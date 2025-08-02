import { ChooseAvatarModal } from "../../4_widgets/ChooseAvatarModal/ChooseAvatarModal";
import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { URL_NAMES } from "../../8_utils/constants/type";
import { Block } from "../../8_utils/helpers/block";
import router from "../../8_utils/helpers/router";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePage.module.scss";

const profilePageTemplate = (props: TProps) => {
  const showChooseAvatarModal = props.openedChooseAvatarModal
    ? "{{{ChooseAvatarModalComponent}}}"
    : "";

  return `
  ${showChooseAvatarModal}
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{{CircleIconButtonArrowBack}}}
    </div>
  </div>
  <div class=${s["content"]}>
    <div class=${s["image-profile-container"]}>
      <img 
      src="/icons/imageProfile.svg"
      alt="${getLang("profilePage.altImageProfile")}"
      />
    </div>
    {{{ChangeImageProfileButton}}}
    <div class=${s["user-name"]}>
      {{{TypographyNickName}}}
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyEmail}}}
      <div class=${s["info"]}>
        {{{TypographyValueEmail}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyLogin}}}
      <div class=${s["info"]}>
        {{{TypographyValueLogin}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyUserName}}}
      <div class=${s["info"]}>
        {{{TypographyValueFirstName}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographySecondName}}}
      <div class=${s["info"]}>
        {{{TypographyValueSecondName}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyNickNameData}}}
      <div class=${s["info"]}>
        {{{TypographyValueNickName}}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{{TypographyPhone}}}
      <div class=${s["info"]}>
        {{{TypographyValuePhone}}}
      </div>
    </div>
    <div class=${s["actions-container"]}>
      <div class=${s["info-line-container"]}>
        {{{LinkChangeData}}}
      </div>
       <div class=${s["info-line-container"]}>
        {{{LinkChangePassword}}}
      </div>
       <div class=${s["info-line-container"]}>
        {{{LinkLogOut}}}
      </div>
    </div>
  </div>
`;
};

type TProps = {
  valueEmail: string;
  valueLogin: string;
  valueFirstName: string;
  valueSecondName: string;
  valueNickName: string;
  valuePhone: string;
  openedChooseAvatarModal?: boolean;
};

export class ProfilePage extends Block {
  constructor(props: TProps) {
    const ChooseAvatarModalComponent = new ChooseAvatarModal({
      onClickCancel: () => {
        this.setProps({ openedChooseAvatarModal: false });
      },
    });

    super("div", {
      attr: {
        class: `${s["container"]}`,
      },
      ChooseAvatarModalComponent,
      CircleIconButtonArrowBack: new CircleIconButton({
        id: "arrowBackId",
        iconSrc: "/icons/arrowBack.svg",
        altText: getLang("common.buttons.altBack"),
        onClick: (e: Event) => {
          e.preventDefault();
          router.back();
        },
      }),

      ChangeImageProfileButton: new Button({
        disabled: false,
        id: "buttonsId",
        text: getLang("profilePage.changeImageProfile"),
        variantText: true,
        onClick: () => {
          this.setProps({ openedChooseAvatarModal: true });
        },
      }),

      TypographyNickName: new Typography({
        variant: "h2",
        text: props.valueNickName,
      }),
      TypographyEmail: new Typography({
        variant: "h3",
        text: getLang("profilePage.email"),
      }),
      TypographyValueEmail: new Typography({
        variant: "h3",
        text: props.valueEmail,
      }),
      TypographyLogin: new Typography({
        variant: "h3",
        text: getLang("common.login"),
      }),
      TypographyValueLogin: new Typography({
        variant: "h3",
        text: props.valueLogin,
      }),
      TypographyUserName: new Typography({
        variant: "h3",
        text: getLang("profilePage.name"),
      }),
      TypographyValueFirstName: new Typography({
        variant: "h3",
        text: props.valueFirstName,
      }),
      TypographySecondName: new Typography({
        variant: "h3",
        text: getLang("profilePage.secondName"),
      }),
      TypographyValueSecondName: new Typography({
        variant: "h3",
        text: props.valueSecondName,
      }),
      TypographyNickNameData: new Typography({
        variant: "h3",
        text: getLang("profilePage.nickName"),
      }),
      TypographyValueNickName: new Typography({
        variant: "h3",
        text: props.valueNickName,
      }),
      TypographyPhone: new Typography({
        variant: "h3",
        text: getLang("profilePage.phone"),
      }),
      TypographyValuePhone: new Typography({
        variant: "h3",
        text: props.valuePhone,
      }),
      LinkChangeData: new Link({
        href: "#",
        variant: "text",
        text: getLang("profilePage.changeData"),
        onClick: (e: Event) => {
          e.preventDefault();
          router.go(URL_NAMES.EDIT_SETTINGS);
        },
      }),
      LinkChangePassword: new Link({
        href: "#",
        variant: "text",
        text: getLang("profilePage.changePassword"),
        onClick: (e: Event) => {
          e.preventDefault();
          router.go(URL_NAMES.EDIT_PASSWORD);
        },
      }),
      LinkLogOut: new Link({
        href: "#",
        variant: "text",
        color: "red",
        text: getLang("profilePage.logOut"),
        onClick: (e: Event) => {
          e.preventDefault();
          router.go(URL_NAMES.SIGNIN);
        },
      }),
    });
  }

  override render() {
    return this.compile(profilePageTemplate(this.props as TProps), this.props);
  }
}
