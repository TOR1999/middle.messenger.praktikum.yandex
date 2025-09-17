import { Block } from "../../8_utils/helpers/block";
import s from "./Message.module.scss";
import { Typography } from "../Typography/Typography";
import { TMessage } from "../../6_entites/Chat/types";
import { getDateTimeFromStr } from "../../8_utils/helpers/getDateTimeFromStr";

const messageTemplate = (props: TProps) => {
  const messageStyle = props.isMyMessage ? "message_my" : "message_other";
  const messagePosition = props.isMyMessage
    ? "message-container-right"
    : "message-container";

  return `
  <div class="${`${s[messagePosition]} `}">
    <div class="${`${s["message"]} ${s[messageStyle]}`}" id=${`${props.messageId}`}>
    {{{TypographyTextNameUser}}}  
    {{{TypographyText}}}
      <div class="${s["time"]}">
        {{{TypographyTime}}}
      </div>
    </div>
  <div>
`;
};

export type TProps = {
  messageId: string;
  message: TMessage;
  isMyMessage: boolean;
  nameSenderUser?: string;
  onClick?: (e: Event) => void;
};

export class Message extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]} `,
      },
    });
  }

  override render() {
    this.children = {
      ...this.children,
      TypographyTextNameUser: new Typography({
        variant: "h4",
        text: this.props.isMyMessage ? "" : this.props?.nameSenderUser,
      }),
      TypographyText: new Typography({
        variant: "b4",
        text: this.props.message.content,
      }),
      TypographyTime: new Typography({
        variant: "b7",
        text: getDateTimeFromStr(this.props.message.time),
      }),
    };

    return this.compile(messageTemplate(this.props as TProps), this.props);
  }
}
