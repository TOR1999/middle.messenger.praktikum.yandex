import { TLink } from "../7_shared/Link/Link";
import {
  NamePages,
  TAuthData,
  TNewPasswordData,
  TProfileData,
  TRegistrationData,
} from "./types";

export const LIST_PAGES: TLink[] = [
  {
    href: "#",
    text: "Страница авторизации",
    dataPage: NamePages.AUTHORIZATION,
    variant: "text",
  },
  {
    href: "#",
    text: "Страница регистрации",
    dataPage: NamePages.REGISTRATION,
    variant: "text",
  },
  {
    href: "#",
    text: "Страница списка чатов",
    dataPage: NamePages.CHATS,
    variant: "text",
  },
  {
    href: "#",
    text: "Страница профиля",
    dataPage: NamePages.PROFILE,
    variant: "text",
  },
  {
    href: "#",
    text: "Страница редактирования информации пользователя",
    dataPage: NamePages.PROFILE_PAGE_EDITOR_INFO,
    variant: "text",
  },
  {
    href: "#",
    text: "Страница редактирования пароля пользователя",
    dataPage: NamePages.PROFILE_PAGE_EDITOR_PASSWORD,
    variant: "text",
  },
  {
    href: "#",
    text: "Страница ошибки 404",
    dataPage: NamePages.NOTFOUND,
    variant: "text",
  },
  {
    href: "#",
    text: "Страница ошибки 500",
    dataPage: NamePages.SERVERERROR,
    variant: "text",
  },
];

export const AUTH_PAGE_DATA: TAuthData = {
  valueLogin: "Iliya",
  valuePassword: "Qwerty",
};

export const REGISTRATION_PAGE_DATA: TRegistrationData = {
  valueEmail: "Torzh@yandex.ru",
  valueLogin: "Torzh",
  valueFirstName: "Илья",
  valueSecondName: "Торжевский",
  valuePhone: "+7-913-170-50-60",
  valuePassword: "Qwerty",
  valueRepeatPassword: "Qwerty",
};

export const PROFILE_PAGE_DATA: TProfileData = {
  valueEmail: "Torzh@yandex.ru",
  valueLogin: "Torzh",
  valueFirstName: "Илья",
  valueSecondName: "Торжевский",
  valueNickName: "Torzh_TOP",
  valuePhone: "+7-913-170-50-60",
};

export const PROFILE_PAGE_EDIT_PASSWORD_DATA: TNewPasswordData = {
  valueOldPassword: "Qwerty",
  valueNewPassword: "Qwerty12345",
  valueRepeatNewPassword: "Qwerty12345",
};
