import { AuthorizationPage } from "../3_pages/AuthorizationPage/AuthorizationPage";
import { Navigation } from "../4_widgets/Navigation/Navigation";
import { RegistrationPage } from "../3_pages/RegistrationPage/RegistrationPage";
import "../8_utils/helpers/isSimpleEquals";
import { ProfilePage } from "../3_pages/ProfilePage/ProfilePage";
import { ErrorPage } from "../3_pages/ErrorPage/ErrorPage";
import { getLang } from "../8_utils/langs/getLang";
import { NamePages, TState } from "./types";
import {
  AUTH_PAGE_DATA,
  LIST_PAGES,
  PROFILE_PAGE_DATA,
  PROFILE_PAGE_EDIT_PASSWORD_DATA,
  REGISTRATION_PAGE_DATA,
} from "./MockData";
import { ProfilePageEditorInfo } from "../3_pages/ProfilePageEditorInfo/ProfilePageEditorInfo";
import { ProfilePageEditorPassword } from "../3_pages/ProfilePageEditorPassword/ProfilePageEditorPassword";

export default class App {
  state: TState;
  appElement: HTMLElement | null;
  navigationElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: NamePages.PROFILE_PAGE_EDITOR_PASSWORD,
    };
    this.appElement = document.getElementById("app");
    this.navigationElement = document.getElementById("navigation");
  }

  render() {
    if (!this.appElement || !this.navigationElement) return;

    //чистим перед рендером новой страницы
    this.appElement.innerHTML = "";

    const navigationWidget = new Navigation({
      title: "Список страниц:",
      pages: LIST_PAGES,
    });

    const navigationWidgetContent: Node | null = navigationWidget.getContent();
    if (navigationWidgetContent) {
      this.navigationElement.innerHTML = "";
      this.navigationElement.appendChild(navigationWidgetContent);
    }

    switch (this.state.currentPage) {
      case NamePages.AUTHORIZATION: {
        const authorizationPage = new AuthorizationPage(AUTH_PAGE_DATA);

        const authorizationPageContent: Node | null =
          authorizationPage.getContent();
        if (authorizationPageContent) {
          this.appElement.appendChild(authorizationPageContent);
        }
        break;
      }
      case NamePages.REGISTRATION: {
        const registrationPage = new RegistrationPage(REGISTRATION_PAGE_DATA);

        const registrationPageContent: Node | null =
          registrationPage.getContent();
        if (registrationPageContent) {
          this.appElement.appendChild(registrationPageContent);
        }
        break;
      }
      case NamePages.PROFILE: {
        const profilePage = new ProfilePage(PROFILE_PAGE_DATA);

        const profilePageContent: Node | null = profilePage.getContent();
        if (profilePageContent) {
          this.appElement.appendChild(profilePageContent);
        }
        break;
      }
      case NamePages.PROFILE_PAGE_EDITOR_INFO: {
        const profilePageEditorInfo = new ProfilePageEditorInfo(
          PROFILE_PAGE_DATA,
        );

        const profilePageEditorInfoContent: Node | null =
          profilePageEditorInfo.getContent();
        if (profilePageEditorInfoContent) {
          this.appElement.appendChild(profilePageEditorInfoContent);
        }
        break;
      }
      case NamePages.PROFILE_PAGE_EDITOR_PASSWORD: {
        const profilePageEditorPassword = new ProfilePageEditorPassword(
          PROFILE_PAGE_EDIT_PASSWORD_DATA,
        );

        const profilePageEditorPasswordContent: Node | null =
          profilePageEditorPassword.getContent();
        if (profilePageEditorPasswordContent) {
          this.appElement.appendChild(profilePageEditorPasswordContent);
        }
        break;
      }
      case NamePages.CHATS: {
        // template = Handlebars.compile(DevelopmentPage);
        // this.appElement.innerHTML = template({
        //   text: getLang("developmentPage"),
        // });
        break;
      }
      case NamePages.NOTFOUND: {
        const notFoundPage = new ErrorPage({
          textCode: getLang("ErrorPage.notFound.textCode"),
          textMessage: getLang("ErrorPage.notFound.textMessage"),
          textLink: getLang("ErrorPage.notFound.textLink"),
        });

        const errorPageContent: Node | null = notFoundPage.getContent();
        if (errorPageContent) {
          this.appElement.appendChild(errorPageContent);
        }

        break;
      }
      case NamePages.SERVERERROR: {
        const serverErrorPage = new ErrorPage({
          textCode: getLang("ErrorPage.serverError.textCode"),
          textMessage: getLang("ErrorPage.serverError.textMessage"),
          textLink: getLang("ErrorPage.serverError.textLink"),
        });

        const errorPageContent: Node | null = serverErrorPage.getContent();
        if (errorPageContent) {
          this.appElement.appendChild(errorPageContent);
        }

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
