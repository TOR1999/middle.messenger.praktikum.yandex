import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePage.module.scss";

export const ProfilePage = `
<div class=${s["container"]}>
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{> CircleIconButton 
       iconSrc="/icons/arrowBack.svg"
       altText="${getLang("common.buttons.altBack")}"
       }}
    </div>
  </div>
  <div class=${s["content"]}>
    <div class=${s["image-profile-container"]}>
      <img 
      src="/icons/imageProfile.svg"
      alt="${getLang("profilePage.altImageProfile")}"
      />
    </div>
    {{> Link href="#"
        variant="text"
        text="${getLang("profilePage.changeImageProfile")}"
      }}
    <div class=${s["user-name"]}>
      {{> Typography
          variant="h2"
          text=valueNickName
       }}
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.email")}"
       }}
      <div class=${s["info"]}>
        {{> Typography
            variant="h3"
            text=valueEmail
         }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("common.login")}"
       }}
      <div class=${s["info"]}>
        {{> Typography
            variant="h3"
            text=valueLogin
         }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.name")}"
       }}
      <div class=${s["info"]}>
        {{> Typography
            variant="h3"
            text=valueFirstName
         }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.secondName")}"
       }}
      <div class=${s["info"]}>
        {{> Typography
            variant="h3"
            text=valueSecondName
         }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.nickName")}"
       }}
      <div class=${s["info"]}>
        {{> Typography
            variant="h3"
            text=valueNickName
         }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.phone")}"
       }}
      <div class=${s["info"]}>
        {{> Typography
            variant="h3"
            text=valuePhone
         }}
      </div>
    </div>
    <div class=${s["actions-container"]}>
      <div class=${s["info-line-container"]}>
        {{> Link
            href="#"
            variant="text"
            text="${getLang("profilePage.changeData")}"
        }}
      </div>
       <div class=${s["info-line-container"]}>
        {{> Link
            href="#"
            variant="text"
            text="${getLang("profilePage.changePassword")}"
        }}
      </div>
       <div class=${s["info-line-container"]}>
        {{> Link
            href="#"
            variant="text"
            color="red"
            text="${getLang("profilePage.logOut")}"
        }}
      </div>
    </div>
  </div>
</div>
`;
