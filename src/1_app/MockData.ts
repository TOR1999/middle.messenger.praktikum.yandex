import { NamePages, TAuthData, TLinkData, TRegistrationData } from "./types";

export const LIST_PAGES: TLinkData[] = [
  {
    text: "Страница авторизации",
    dataPages: NamePages.AUTHORIZATION,
    variant: "text",
  },
  {
    text: "Страница регистрации",
    dataPages: NamePages.REGISTRATION,
    variant: "text",
  },
  {
    text: "Страница списка чатов",
    dataPages: NamePages.CHATS,
    variant: "text",
  },
  { text: "Страница профиля", dataPages: NamePages.PROFILE, variant: "text" },
  {
    text: "Страница ошибки 404",
    dataPages: NamePages.NOTFOUND,
    variant: "text",
  },
  {
    text: "Страница ошибки 500",
    dataPages: NamePages.SERVERERROR,
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
  valuePhone: "+7 (913) 170 50 60",
  valuePassword: "Qwerty",
  valueRepeatPassword: "Qwerty",
};

export const PROFILE_PAGE_DATA = {};

export const ERROR_PAGE_DATA = {};
