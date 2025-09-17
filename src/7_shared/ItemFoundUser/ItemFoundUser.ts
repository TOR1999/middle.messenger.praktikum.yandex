import { Block } from "../../8_utils/helpers/block";
import s from "./ItemFoundUser.module.scss";
import { Typography } from "../Typography/Typography";

const listChatsTemplate = `
  <div class=${s["container"]}>
    <div class=${s["login"]}>
    {{{TypographyLogin}}}
    </div>
     <div class=${s["role"]}>
    {{{TypographyRole}}}
    </div>
  </div>
`;

export type TProps = {
  login: string;
  role?: string;
  onClick?: (e: Event) => void;
};

export class ItemFoundUser extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      ...props,
      ImgAvatar: "",
    });
    this.setProps(props);
  }

  override render() {
    this.children = {
      ...this.children,
      TypographyLogin: new Typography({
        variant: "h4",
        text: this.props.login || "",
      }),

      TypographyRole: new Typography({
        variant: "b4",
        text: this.props.role || "",
      }),
    };

    return this.compile(listChatsTemplate, this.props);
  }
}
