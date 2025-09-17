import { ChooseAvatarModal } from "../../4_widgets/ChooseAvatarModal/ChooseAvatarModal";
import authApi from "../../6_entites/Auth/model/authApi";
import chatApi from "../../6_entites/Chat/chatApi";
import { ChatStore } from "../../6_entites/Chat/store";
import { ProfileStore } from "../../6_entites/Profile/model/store";
import { Button } from "../../7_shared/Button/Button";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { BASE_URLS } from "../../8_utils/constants/constants";
import { URL_NAMES } from "../../8_utils/constants/type";
import { Block } from "../../8_utils/helpers/block";
import { checkAuth } from "../../8_utils/helpers/checkAuth";
import router from "../../8_utils/helpers/router";
import { StoreEvents } from "../../8_utils/helpers/store";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePage.module.scss";

const profilePageTemplate = (props: TProps) => {
  const showChooseAvatarModal = props.openedChooseAvatarModal
    ? "{{{ChooseAvatarModalComponent}}}"
    : "";

  const avatarImg = props.valueAvatar
    ? `${BASE_URLS.RESOURCES}${props.valueAvatar}`
    : "/icons/imageProfile.svg";

  return `
  ${showChooseAvatarModal}
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{{CircleIconButtonArrowBack}}}
    </div>
  </div>
  <div class=${s["content"]}>
    <img
    class=${s["image-profile"]} 
    src=${avatarImg}
    alt="${getLang("profilePage.altImageProfile")}"
    />
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
  valueAvatar: string;
  openedChooseAvatarModal?: boolean;
};

export class ProfilePage extends Block<TProps> {
  constructor() {
    if (checkAuth()) {
      authApi.getUserInfo();
    }

    const ChooseAvatarModalComponent = new ChooseAvatarModal({
      onClickCancel: () => {
        this.setProps({ openedChooseAvatarModal: false });
      },
    });

    ProfileStore.on(StoreEvents.UPDATE, () => {
      const storeState = ProfileStore.getState().myUser;
      this.setProps({
        valueAvatar: storeState.avatar || "",
        valueEmail: storeState.email,
        valueFirstName: storeState.first_name,
        valueLogin: storeState.login,
        valueNickName: storeState.display_name,
        valuePhone: storeState.phone,
        valueSecondName: storeState.second_name,
      });
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
          ChatStore.setState({ selectedChatId: null });
          chatApi.getChats({ offset: 0, limit: 10, title: "" });
          router.go(URL_NAMES.MESSAGER);
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
      TypographySecondName: new Typography({
        variant: "h3",
        text: getLang("profilePage.secondName"),
      }),
      TypographyNickNameData: new Typography({
        variant: "h3",
        text: getLang("profilePage.nickName"),
      }),
      TypographyPhone: new Typography({
        variant: "h3",
        text: getLang("profilePage.phone"),
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
          authApi.logout();
        },
      }),
    });
  }

  override render() {
    const props = this.props;

    this.children = {
      ...this.children,
      TypographyValueEmail: new Typography({
        variant: "h3",
        text: props.valueEmail,
      }),
      TypographyNickName: new Typography({
        variant: "h2",
        text: props.valueNickName,
      }),
      TypographyValueLogin: new Typography({
        variant: "h3",
        text: props.valueLogin,
      }),
      TypographyValueFirstName: new Typography({
        variant: "h3",
        text: props.valueFirstName,
      }),
      TypographyValueSecondName: new Typography({
        variant: "h3",
        text: props.valueSecondName,
      }),
      TypographyValueNickName: new Typography({
        variant: "h3",
        text: props.valueNickName,
      }),
      TypographyValuePhone: new Typography({
        variant: "h3",
        text: props.valuePhone,
      }),
    };

    return this.compile(profilePageTemplate(this.props as TProps), this.props);
  }
}
