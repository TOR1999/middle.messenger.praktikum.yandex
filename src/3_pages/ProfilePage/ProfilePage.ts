import { getLang } from "../../8_utils/langs/getLang";
import s from "./ProfilePage.module.scss";

export const ProfilePage = `
<div class=${s["container"]}>
  <div class=${s["button-back-container"]}>
    <div class=${s["button-back"]}>
      {{> CircleIconButton iconSrc="/icons/arrowBack.svg"}}
    </div>
  </div>
  <div class=${s["content"]}>
    <div class=${s["image-profile-container"]}>
      <img src="/icons/imageProfile.svg"/>
    </div>
    {{> Link href="#" variant="text" text="${getLang(
      "profilePage.changeImageProfile"
    )}"}}
    <div class=${s["user-name"]}>
      {{> Typography variant="h2" text="Иван"}}
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography variant="h3" text="${getLang("profilePage.email")}"}}
      <div class=${s["info"]}>
        {{> Typography variant="h3" text="Ivan@yandex.ru"}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography variant="h3" text="${getLang("common.login")}"}}
      <div class=${s["info"]}>
        {{> Typography variant="h3" text="Ivan"}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography variant="h3" text="${getLang("profilePage.name")}"}}
      <div class=${s["info"]}>
        {{> Typography variant="h3" text="Иван"}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography variant="h3" text="${getLang("profilePage.secondName")}"}}
      <div class=${s["info"]}>
        {{> Typography variant="h3" text="Иванов"}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography variant="h3" text="${getLang("profilePage.nickName")}"}}
      <div class=${s["info"]}>
        {{> Typography variant="h3" text="Иван"}}
      </div>
    </div>
    <div class=${s["info-line-container"]}>
      {{> Typography variant="h3" text="${getLang("profilePage.telephone")}"}}
      <div class=${s["info"]}>
        {{> Typography variant="h3" text="+7 (913) 170 50 60"}}
      </div>
    </div>
    <div class=${s["actions-container"]}>
      <div class=${s["info-line-container"]}>
        {{> Link href="#" variant="text" text="${getLang(
          "profilePage.changeData"
        )}"}}
      </div>
       <div class=${s["info-line-container"]}>
        {{> Link href="#" variant="text" text="${getLang(
          "profilePage.changePassword"
        )}"}}
      </div>
       <div class=${s["info-line-container"]}>
        {{> Link href="#" variant="text" color="red" text="${getLang(
          "profilePage.logOut"
        )}"}}
      </div>
    </div>
  </div>
</div>
`;
