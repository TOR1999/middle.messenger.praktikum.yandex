import { Link } from "../../7_shared/Link/Link";
import { Typography } from "../../7_shared/Typography/Typography";
import { URL_NAMES } from "../../8_utils/constants/type";
import { Block } from "../../8_utils/helpers/block";
import { checkAuth } from "../../8_utils/helpers/checkAuth";
import router from "../../8_utils/helpers/router";
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
        onClick(e) {
          e.stopPropagation();

          if (checkAuth()) {
            router.go(URL_NAMES.MESSAGER);
            return;
          }
          router.go(URL_NAMES.SIGNIN);
        },
      }),
    });
  }

  override render() {
    return this.compile(errorPageTemplate, this.props);
  }
}
