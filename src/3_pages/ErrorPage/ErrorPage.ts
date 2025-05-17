import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import s from "./ErrorPage.module.scss";

const errorPageTemplate = `
  <div class=${s["code-container"]}>
    {{{TypographyTextCode}}}
  </div>
  <div class=${s["message-container"]}>
     {{{TypographyTextMessage}}}
  </div>
  {{{LinkBack}}}
`;
type TProps = {
  textCode: string;
  textLink: string;
  textMessage: string;
};

export class ErrorPage extends Block {
  constructor(props: TProps) {
    super("div", {
      attr: {
        class: `${s["container"]}`,
      },
      TypographyTextCode: new Typography({
        variant: "h1",
        text: props.textCode,
      }),
      TypographyTextMessage: new Typography({
        variant: "b2",
        text: props.textMessage,
      }),
      LinkBack: new Link({
        href: "#",
        variant: "text",
        text: props.textLink,
        onClick: () => {
          console.log("Назад к чатам со страницы ошибки");
        },
      }),
    });
  }

  override render() {
    return this.compile(errorPageTemplate, this.props);
  }
}
