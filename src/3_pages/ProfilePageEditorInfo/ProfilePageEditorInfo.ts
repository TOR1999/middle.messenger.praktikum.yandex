import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorInfo.module.scss";

export const ProfilePageEditorInfo = `
<div class=${s["container"]}>
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{> CircleIconButton 
       iconSrc="/icons/arrowBack.svg"
       altText="${getLang("common.buttons.altBack")}"
       }}
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
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.email")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="emailId"
            classStyle="textRight"
            nameInput="email"
            variant="text"
            textPlaceholder=valueEmail
        }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("common.login")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="loginId"
            classStyle="textRight"
            nameInput="login"
            variant="text"
            textPlaceholder=valueLogin
        }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.name")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="firstNameId"
            classStyle="textRight"
            nameInput="first_name"
            variant="text"
            textPlaceholder=valueFirstName
        }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.secondName")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="secondNameId"
            classStyle="textRight"
            nameInput="second_name"
            variant="text"
            textPlaceholder=valueSecondName
        }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.nickName")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="displayNameId"
            classStyle="textRight"
            nameInput="display_name"
            variant="text"
            textPlaceholder=valueNickName
        }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.phone")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="phoneId"
            classStyle="textRight"
            nameInput="phone"
            variant="text"
            textPlaceholder=valuePhone
        }}
      </div>
    </div>
    <div class=${s["button-save"]}>
      {{> Button
          id="editProfileId"
          text="${getLang("common.buttons.save")}"
      }}
    </div>
  </form>
</div>
`;
