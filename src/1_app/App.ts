import Handlebars from "handlebars";
import { Button } from "../7_shared/Button/Button";
import { AuthorizationPage } from "../3_pages/AuthorizationPage/AuthorizationPage";
import { Link } from "../7_shared/Link/Link";
import { Navigation } from "../4_widgets/Navigation/Navigation";
import { RegistrationPage } from "../3_pages/RegistrationPage/RegistrationPage";
import "../8_utils/helpers/isSimpleEquals";
import { Typography } from "../7_shared/Typography/Typography";
import { AuthorizationModal } from "../4_widgets/AuthorizationModal/AuthorizationModal";
import { Input } from "../7_shared/Input/Input";
import { RegistrationModal } from "../4_widgets/RegistrationModal/RegistrationModal";
import { ProfilePage } from "../3_pages/ProfilePage/ProfilePage";
import { CircleIconButton } from "../7_shared/CircleIconButton/CircleIconButton";
import { ErrorPage } from "../3_pages/ErrorPage/ErrorPage";
import { getLang } from "../8_utils/langs/getLang";
import { DevelopmentPage } from "../3_pages/DevelopmentPage/DevelopmentPage";
import { NamePages, TState } from "./types";
import { AUTH_PAGE_DATA, LIST_PAGES, REGISTRATION_PAGE_DATA } from "./MockData";

Handlebars.registerPartial("Typography", Typography);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("AuthorizationModal", AuthorizationModal);
Handlebars.registerPartial("RegistrationModal", RegistrationModal);
Handlebars.registerPartial("CircleIconButton", CircleIconButton);

export default class App {
  state: TState;
  appElement: HTMLElement | null;
  navigationElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: NamePages.REGISTRATION,
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
      pages: LIST_PAGES,
    });

    switch (this.state.currentPage) {
      case NamePages.AUTHORIZATION: {
        template = Handlebars.compile(AuthorizationPage);
        this.appElement.innerHTML = template(AUTH_PAGE_DATA);
        break;
      }
      case NamePages.REGISTRATION: {
        template = Handlebars.compile(RegistrationPage);
        this.appElement.innerHTML = template(REGISTRATION_PAGE_DATA);
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
