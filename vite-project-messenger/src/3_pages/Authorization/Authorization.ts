import { getLang } from "../../8_utils/langs/getLang";

export default class Authorization {
  state: {};

  constructor() {
    this.state = {
      currentPage: "createQuestionnaire",
      questions: [],
      answers: [],
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    // this.appElement.innerHTML = template({
    //   questions: this.state.questions,
    //   createButtonEnabled: this.state.questions.length == 0
    // });

    const welcomeLang = getLang("first.hello");

    console.log("welcomeLang:", welcomeLang);

    this.appElement.innerHTML = `<div>${welcomeLang}</div>`;
  }
}
