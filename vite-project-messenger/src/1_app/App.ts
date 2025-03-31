import Handlebars from "handlebars";
import { Button } from "../7_shared/Button/Button";
import { AuthorizationPage } from "../3_pages/AuthorizationPage/AuthorizationPage";
import { Link } from "../7_shared/Link/Link";
import { Navigation } from "../4_widgets/Navigation/Navigation";
import { RegistrationPage } from "../3_pages/RegistrationPage/RegistrationPage";
import "../8_utils/helpers/isSimpleEquals";
import { Typography } from "../7_shared/Typography/Typography";
import { AuthorizationModal } from "../4_widgets/AuthorizationModal/AuthorizationModal";
import { Input } from "../7_shared/LoginInput/Input";
import { RegistrationModal } from "../4_widgets/RegistrationModal/RegistrationModal";
import { ProfilePage } from "../3_pages/ProfilePage/ProfilePage";
import { CircleIconButton } from "../7_shared/CircleIconButton/CircleIconButton";
import { ErrorPage } from "../3_pages/ErrorPage/ErrorPage";
import { getLang } from "../8_utils/langs/getLang";
import { DevelopmentPage } from "../3_pages/DevelopmentPage/DevelopmentPage";

Handlebars.registerPartial("Typography", Typography);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("AuthorizationModal", AuthorizationModal);
Handlebars.registerPartial("RegistrationModal", RegistrationModal);
Handlebars.registerPartial("CircleIconButton", CircleIconButton);

enum NamePages {
  AUTHORIZATION = "authorization",
  REGISTRATION = "registration",
  CHATS = "chats",
  PROFILE = "profile",
  NOTFOUND = "notFound",
  SERVERERROR = "serverError",
}

type TLinkData = {
  text: string;
  dataPages: string;
  variant: "underline" | "text";
};

type TTypographyData = {
  text: string;
  variant:
    | "b1"
    | "b2"
    | "b3"
    | "b4"
    | "b5"
    | "b6"
    | "b7"
    | "b8"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h8";
};

const PAGES: TLinkData[] = [
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

type TState = {
  currentPage: NamePages;
};

export default class App {
  state: TState;
  appElement: HTMLElement | null;
  navigationElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: NamePages.NOTFOUND,
    };
    this.appElement = document.getElementById("app");
    this.navigationElement = document.getElementById("navigation");
  }

  render() {
    if (!this.appElement || !this.navigationElement) return;

    let template;
    template = Handlebars.compile(Navigation);
    this.navigationElement.innerHTML = template({
      title: "Список страниц:",
      pages: PAGES,
    });

    switch (this.state.currentPage) {
      case NamePages.AUTHORIZATION: {
        template = Handlebars.compile(AuthorizationPage);
        this.appElement.innerHTML = template({});
        break;
      }
      case NamePages.REGISTRATION: {
        template = Handlebars.compile(RegistrationPage);
        this.appElement.innerHTML = template({});
        break;
      }
      case NamePages.PROFILE: {
        template = Handlebars.compile(ProfilePage);
        this.appElement.innerHTML = template({});
        break;
      }
      case NamePages.CHATS: {
        template = Handlebars.compile(DevelopmentPage);
        this.appElement.innerHTML = template({
          text: getLang("developmentPage"),
        });
        break;
      }
      case NamePages.NOTFOUND: {
        template = Handlebars.compile(ErrorPage);
        this.appElement.innerHTML = template({
          textCode: getLang("ErrorPage.notFound.textCode"),
          textMessage: getLang("ErrorPage.notFound.textMessage"),
          textLink: getLang("ErrorPage.notFound.textLink"),
        });
        break;
      }
      case NamePages.SERVERERROR: {
        template = Handlebars.compile(ErrorPage);
        this.appElement.innerHTML = template({
          textCode: getLang("ErrorPage.serverError.textCode"),
          textMessage: getLang("ErrorPage.serverError.textMessage"),
          textLink: getLang("ErrorPage.serverError.textLink"),
        });
        break;
      }
      default: {
        console.log("error switch page");
        break;
      }
    }

    this.attachEventListeners();
  }

  attachEventListeners() {
    const listLinks = document.querySelectorAll(".navigation-link");
    listLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const value = e.target as HTMLElement;
        this.changePage(value.dataset.page as NamePages);
      });
    });
  }

  changePage(page: NamePages) {
    this.state.currentPage = page;
    this.render();
  }
}
