import { TLink } from "../7_shared/Link/Link";
import {
  NamePages,
  TAuthData,
  TDataChats,
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
  valueLogin: "Torzh",
  valuePassword: "12345Qwerty",
};

export const REGISTRATION_PAGE_DATA: TRegistrationData = {
  valueEmail: "Torzhyandex@mail.ru",
  valueLogin: "Torzh",
  valueFirstName: "Петя",
  valueSecondName: "Оржевский",
  valuePhone: "+7-913-999-99-99",
  valuePassword: "12345Qwerty",
  valueRepeatPassword: "12345Qwerty",
};

export const PROFILE_PAGE_DATA: TProfileData = {
  valueEmail: "Torzh@yandex.ru",
  valueLogin: "Torzh",
  valueFirstName: "Илья",
  valueSecondName: "Торжевский",
  valueNickName: "Torzh_TOP",
  valuePhone: "+7-913-170-50-60",
  valueAvatar: "/icons/imageProfile.svg",
};

export const PROFILE_PAGE_EDIT_PASSWORD_DATA: TNewPasswordData = {
  valueOldPassword: "Qwerty",
  valueNewPassword: "Qwerty12345",
  valueRepeatNewPassword: "Qwerty12345",
};

export const CHATS_PAGE_DATA: TDataChats = {
  chats: [
    {
      name: "Друг1",
      unreadMessagesCount: 0,
      lastMessage: {
        text: "Читаю книгу",
        dataSend: "10.03.2024",
        timeSend: "14:33",
        senderName: "Я",
        myMessage: true,
      },
      messages: [
        {
          text: "Привет! Как дела?",
          dataSend: "10.03.2024",
          timeSend: "14:30",
          senderName: "Друг1",
          myMessage: false,
        },
        {
          text: "Всё хорошо, спасибо!",
          dataSend: "10.03.2024",
          timeSend: "14:31",
          senderName: "Я",
          myMessage: true,
        },
        {
          text: "Чем занимаешься?",
          dataSend: "10.03.2024",
          timeSend: "14:32",
          senderName: "Друг1",
          myMessage: false,
        },
        {
          text: "Читаю книгу",
          dataSend: "10.03.2024",
          timeSend: "14:33",
          senderName: "Я",
          myMessage: true,
        },
        {
          text: "Круто! Какую?",
          dataSend: "10.03.2024",
          timeSend: "14:34",
          senderName: "Друг1",
          myMessage: false,
        },
      ],
    },
    {
      name: "Чат с Максимом и Еленой",
      unreadMessagesCount: 1,
      lastMessage: {
        text: "Отлично, договорились!",
        dataSend: "2024-09-22",
        timeSend: "13:50",
        senderName: "Максим",
        myMessage: false,
      },
      messages: [
        {
          text: "Когда будет встреча?",
          dataSend: "2024-09-20",
          timeSend: "14:10",
          senderName: "Максим",
          myMessage: false,
        },
        {
          text: "Предлагаю в следующую пятницу в 11:00.",
          dataSend: "2024-09-21",
          timeSend: "09:25",
          senderName: "Елена",
          myMessage: false,
        },
        {
          text: "Отлично, договорились!",
          dataSend: "2024-09-22",
          timeSend: "13:50",
          senderName: "Максим",
          myMessage: false,
        },
      ],
    },
    {
      name: "Чат с Сергеем, Анной и Дмитрием",
      unreadMessagesCount: 2,
      lastMessage: {
        text: "Я думаю, это может быть полезно для всех.",
        dataSend: "2024-09-25",
        timeSend: "11:15",
        senderName: "Дмитрий",
        myMessage: false,
      },
      messages: [
        {
          text: "Привет! Есть предложение по проекту.",
          dataSend: "2024-09-23",
          timeSend: "15:00",
          senderName: "Сергей",
          myMessage: false,
        },
        {
          text: "Звучит интересно, расскажи подробнее.",
          dataSend: "2024-09-24",
          timeSend: "09:30",
          senderName: "Анна",
          myMessage: false,
        },
        {
          text: "Я думаю, это может быть полезно для всех.",
          dataSend: "2024-09-25",
          timeSend: "11:15",
          senderName: "Дмитрий",
          myMessage: false,
        },
      ],
    },
    {
      name: "Друг2",
      unreadMessagesCount: 0,
      lastMessage: {
        text: "Да, конечно!",
        dataSend: "09.03.2024",
        timeSend: "11:46",
        senderName: "Я",
        myMessage: true,
      },
      messages: [
        {
          text: "Увидимся завтра?",
          dataSend: "09.03.2024",
          timeSend: "11:45",
          senderName: "Друг2",
          myMessage: false,
        },
        {
          text: "Да, конечно!",
          dataSend: "09.03.2024",
          timeSend: "11:46",
          senderName: "Я",
          myMessage: true,
        },
      ],
    },
    {
      name: "Чат с Марией и Виктором",
      unreadMessagesCount: 0,
      lastMessage: {
        text: "Отличное! А у тебя?",
        dataSend: "2024-09-27",
        timeSend: "08:55",
        senderName: "Виктор",
        myMessage: false,
      },
      messages: [
        {
          text: "Привет, как настроение?",
          dataSend: "2024-09-26",
          timeSend: "16:20",
          senderName: "Мария",
          myMessage: false,
        },
        {
          text: "Отличное! А у тебя?",
          dataSend: "2024-09-27",
          timeSend: "08:55",
          senderName: "Виктор",
          myMessage: false,
        },
      ],
    },
    {
      name: "Чат с Иваном и Ольгой",
      unreadMessagesCount: 0,
      lastMessage: {
        text: "Всё отлично, спасибо! А у тебя?",
        dataSend: "2024-09-16",
        timeSend: "08:45",
        senderName: "Ольга",
        myMessage: false,
      },
      messages: [
        {
          text: "Привет! Как твои дела?",
          dataSend: "2024-09-15",
          timeSend: "10:30",
          senderName: "Иван",
          myMessage: false,
        },
        {
          text: "Всё отлично, спасибо! А у тебя?",
          dataSend: "2024-09-16",
          timeSend: "08:45",
          senderName: "Ольга",
          myMessage: false,
        },
      ],
    },
  ],
};
