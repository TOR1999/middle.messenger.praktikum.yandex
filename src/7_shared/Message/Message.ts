import { TMessage } from "../../1_app/types";
import { Block } from "../../8_utils/helpers/block";
import s from "./Message.module.scss";
import { Typography } from "../Typography/Typography";

const messageTemplate = (props: TProps) => {
  const messageStyle = props.myMessage ? "message_other" : "message_my";

  return `
  <div class="${`${s["message"]} ${s[messageStyle]}`}" id=${`${props.messageId}`}>
    {{{TypographyText}}}
    <div class="${s["time"]}">
      {{{TypographyTime}}}
  </div>
  </div>
`;
};

export type TProps = {
  messageId: string;
  message: TMessage;
  myMessage: boolean;
  onClick?: (e: Event) => void;
};

export class Message extends Block {
  constructor(props: TProps) {
    const messagePosition = props.myMessage ? "" : "container_message-right";

    super("div", {
      ...props,
      attr: {
        class: `${s["container"]} ${s[messagePosition]}`,
      },
      TypographyText: new Typography({
        variant: "b5",
        text: props.message.text,
      }),
      TypographyTime: new Typography({
        variant: "b7",
        text: props.message.timeSend,
      }),
    });
  }

  override render() {
    return this.compile(messageTemplate(this.props as TProps), this.props);
  }
}
