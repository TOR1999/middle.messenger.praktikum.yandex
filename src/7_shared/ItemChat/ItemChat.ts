import { TChat } from "../../1_app/types";
import { Block } from "../../8_utils/helpers/block";
import s from "./ItemChat.module.scss";
import { Typography } from "../Typography/Typography";

const listChatsTemplate = (props: TProps) => {
  const resultCountUnreadMessage = props.chat.unreadMessagesCount
    ? `<div class=${s["count-message"]}> {{{TypographyCountMessage}}}</div>`
    : "";

  return `
  <div class=${s["avatar"]}>
    {{{ImgAvatar}}}
  </div>
  <div class=${s["info-chat"]}>
  {{{TypographyName}}}
    <div class=${s["description"]}>
    {{{TypographyDescription}}}
    </div>
  </div>
  <div class=${s["data-chat"]}>
  {{{TypographyDateTime}}}
    ${resultCountUnreadMessage}
  </div>
`;
};

export type TProps = {
  chat: TChat;
  chatId: string;
  selectedChat: boolean;
  onClick?: (e: Event) => void;
};

export class ItemChat extends Block {
  constructor(props: TProps) {
    console.log("props", props);
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
        id: `${props.chatId}`,
      },
      ImgAvatar: "",
      TypographyName: new Typography({
        variant: "h5",
        text: props.chat.name,
      }),
      TypographyDescription: new Typography({
        variant: "b5",
        text: props.chat.lastMessage.text,
      }),
      TypographyDateTime: new Typography({
        variant: "b5",
        text: props.chat.lastMessage.timeSend,
      }),
      TypographyCountMessage: new Typography({
        variant: "b5",
        text: String(props.chat.unreadMessagesCount),
      }),
    });
  }

  override render() {
    return this.compile(listChatsTemplate(this.props as TProps), this.props);
  }
}
