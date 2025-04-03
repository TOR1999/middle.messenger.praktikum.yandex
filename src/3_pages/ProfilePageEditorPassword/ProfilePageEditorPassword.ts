import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePageEditorPassword.module.scss";

export const ProfilePageEditorPassword = `
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
          text="${getLang("profilePage.editPassword.old")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="oldPasswordId"
            classStyle="textRight"
            nameInput="oldPassword"
            variant="password"
            value=valueOldPassword
        }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.editPassword.new")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="newPasswordId"
            classStyle="textRight"
            nameInput="newPassword"
            variant="password"
            value=valueNewPassword
        }}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography
          variant="h3"
          text="${getLang("profilePage.editPassword.repeatNew")}"
       }}
      <div class=${s["info"]}>
        {{> Input
            inputId="repeatNewPasswordId"
            classStyle="textRight"
            nameInput="repeatNewPassword"
            variant="password"
            value=valueRepeatNewPassword
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
