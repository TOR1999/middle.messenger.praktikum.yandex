import { Block } from "../../8_utils/helpers/block";
import s from "./ItemChat.module.scss";
import { Typography } from "../Typography/Typography";
import { TChat } from "../../6_entites/Chat/types";
import { getDisplayNameLastMessages } from "./helper/getDisplayNameLastMessages";

const listChatsTemplate = (props: TProps) => {
  const resultCountUnreadMessage = props.chat.unread_count
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
        text: this.props.chat?.title || "",
      }),
      TypographyDescriptionMyMessage: new Typography({
        variant: "b5",
        text: getDisplayNameLastMessages(this.props.chat.last_message),
      }),
      TypographyDescription: new Typography({
        variant: "b5",
        color: "grey",
        text: this.props.chat.last_message?.content || "",
      }),
      TypographyDateTime: new Typography({
        variant: "b5",
        text: this.props.chat.last_message?.time || "",
      }),
      TypographyCountMessage: new Typography({
        variant: "b6",
        color: "white",
        withoutLineHeight: true,
        text: String(this.props.chat.unread_count),
      }),
    };

    return this.compile(listChatsTemplate(this.props as TProps), this.props);
  }
}
