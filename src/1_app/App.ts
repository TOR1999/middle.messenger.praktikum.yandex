import { AuthorizationPage } from "../3_pages/AuthorizationPage/AuthorizationPage";
import { RegistrationPage } from "../3_pages/RegistrationPage/RegistrationPage";
import "../8_utils/helpers/isSimpleEquals";
import { ProfilePage } from "../3_pages/ProfilePage/ProfilePage";
import { ErrorPage } from "../3_pages/ErrorPage/ErrorPage";
import { getLang } from "../8_utils/langs/getLang";
import { NamePages, TState } from "./types";
import { AUTH_PAGE_DATA, REGISTRATION_PAGE_DATA } from "./MockData";
import { ProfilePageEditorInfo } from "../3_pages/ProfilePageEditorInfo/ProfilePageEditorInfo";
import { ProfilePageEditorPassword } from "../3_pages/ProfilePageEditorPassword/ProfilePageEditorPassword";
import { ChatsPage } from "../3_pages/ChatsPage/ChatsPage";
import { URL_NAMES } from "../8_utils/constants/type";
import router from "../8_utils/helpers/router";
import { checkAuth } from "../8_utils/helpers/checkAuth";

export default class App {
  state: TState;
  appElement: HTMLElement | null;
  navigationElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: NamePages.PROFILE,
    };
    this.appElement = document.getElementById("app");
    this.navigationElement = document.getElementById("navigation");
  }

  render() {
    const authorizationPage = new AuthorizationPage(AUTH_PAGE_DATA);
    const registrationPage = new RegistrationPage(REGISTRATION_PAGE_DATA);
    const profilePage = new ProfilePage();
    const profilePageEditorInfo = new ProfilePageEditorInfo();
    const profilePageEditorPassword = new ProfilePageEditorPassword();
    const сhatsPage = new ChatsPage();
    const notFoundPage = new ErrorPage({
      textCode: getLang("ErrorPage.notFound.textCode"),
      textMessage: getLang("ErrorPage.notFound.textMessage"),
      textLink: getLang("ErrorPage.notFound.textLink"),
    });
    const serverErrorPage = new ErrorPage({
      textCode: getLang("ErrorPage.serverError.textCode"),
      textMessage: getLang("ErrorPage.serverError.textMessage"),
      textLink: getLang("ErrorPage.serverError.textLink"),
    });

    router
      .use(URL_NAMES.SIGNIN, authorizationPage, () => !checkAuth())
      .use(URL_NAMES.SIGNUP, registrationPage, () => !checkAuth())
      .use(URL_NAMES.MESSAGER, сhatsPage, () => checkAuth())
      .use(URL_NAMES.SETTINGS, profilePage, () => checkAuth())
      .use(URL_NAMES.EDIT_SETTINGS, profilePageEditorInfo, () => checkAuth())
      .use(URL_NAMES.EDIT_PASSWORD, profilePageEditorPassword, () =>
        checkAuth(),
      )
      .use(URL_NAMES.NOT_FOUND, notFoundPage)
      .use(URL_NAMES.SERVER_ERROR, serverErrorPage)
      .start();
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
