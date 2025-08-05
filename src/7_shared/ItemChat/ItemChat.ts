import { TChat } from "../../1_app/types";
import { Block } from "../../8_utils/helpers/block";
import s from "./ItemChat.module.scss";
import { Typography } from "../Typography/Typography";

const listChatsTemplate = (props: TProps) => {
  const resultCountUnreadMessage = props.chat.unreadMessagesCount
    ? `<div class=${s["count-message"]}> {{{TypographyCountMessage}}}</div>`
    : "";

  return `
  <div
  class="${`${s["container"]} ${props.selectedChat ? s["container_selected-container"] : ""}`}"
  id=${props.chatId}
  >
    <div class=${s["avatar"]}>
      {{{ImgAvatar}}}
    </div>
    <div class=${s["info-chat"]}>
    {{{TypographyName}}}
      <div class=${s["description"]}>
      {{{TypographyDescriptionMyMessage}}}
      {{{TypographyDescription}}}
      </div>
    </div>
    <div class=${s["data-chat"]}>
    {{{TypographyDateTime}}}
      ${resultCountUnreadMessage}
    </div>
  </div>
`;
};

export type TProps = {
  chat: TChat;
  chatId: string;
  selectedChat: boolean;
  onClick?: (e: Event) => void;
};

export class ItemChat extends Block<TProps> {
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
      TypographyName: new Typography({
        variant: "h4",
        text: this.props.chat.name,
      }),
      TypographyDescriptionMyMessage: new Typography({
        variant: "b5",
        text: this.props.chat.lastMessage.myMessage ? "Вы:" : "",
      }),
      TypographyDescription: new Typography({
        variant: "b5",
        color: "grey",
        text: this.props.chat.lastMessage.text,
      }),
      TypographyDateTime: new Typography({
        variant: "b5",
        text: this.props.chat.lastMessage.timeSend,
      }),
      TypographyCountMessage: new Typography({
        variant: "b6",
        color: "white",
        withoutLineHeight: true,
        text: String(this.props.chat.unreadMessagesCount),
      }),
    };

    return this.compile(listChatsTemplate(this.props as TProps), this.props);
  }
}
