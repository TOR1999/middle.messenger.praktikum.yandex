import { TChat } from "../../1_app/types";
import { CircleIconButton } from "../../7_shared/CircleIconButton/CircleIconButton";
import { IconButton } from "../../7_shared/IconButton/IconButton";
import { Input } from "../../7_shared/Input/Input";
import { Message } from "../../7_shared/Message/Message";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ListMessages.module.scss";

const listMessagesTemplate = (props: TProps) => {
  const listMessages = props.chat.messages
    .map((_, index) => `{{{message_${index + 1}}}}`)
    .join("");
  return `
  <div class=${s["header"]}>
   <div class=${s["recipient-info"]}>
      <div class=${s["img-avatar"]}> 
      </div>
       {{{TypographyName}}}
   </div>
   {{{IconButtonActionChat}}}
  </div>
  <div class=${s["content"]}>
     ${listMessages}
  </div>
  <div class=${s["footer"]}>
    {{{IconButtonPaperClip}}}
    <div class=${s["input-container"]}>
      {{{MessageInput}}}
    </div>   
    {{{IconButtonSendMessage}}}
   </div>
`;
};

export type TProps = {
  chat: TChat;
};

export class ListMessages extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
      TypographyName: new Typography({
        variant: "h5",
        text: props.chat.name,
      }),
      IconButtonActionChat: new IconButton({
        id: "IconButtonActionChatId",
        altText: "",
        iconSrc: "/icons/threeDots.svg",
      }),
      IconButtonPaperClip: new IconButton({
        id: "IconButtonActionChatId",
        altText: "",
        iconSrc: "/icons/paperClip.svg",
      }),

      MessageInput: new Input({
        inputId: "messageInputId",
        nameInput: "message",
        value: "",
        variant: "text",
        backgroundColor: "grey",
        borderRadius: true,
        textPlaceholder: getLang("chatsPage.listMessages.placeHolderMessage"),
        upHeight: true,
      }),
      IconButtonSendMessage: new CircleIconButton({
        id: "IconButtonSendMessageId",
        altText: "",
        iconSrc: "/icons/arrowRight.svg",
        onClick: () => {
          const message = getValueById("messageInputId");
          console.log({ message });
        },
      }),
    });
  }

  override render() {
    const listMessages = (this.props as TProps).chat.messages.reduce(
      (acc, curr, index) => {
        acc[`message_${index + 1}`] = new Message({
          message: curr,
          messageId: `message_${index + 1}`,
          myMessage: curr.myMessage,
        });
        return acc;
      },
      {} as Record<string, Message>,
    );
    this.children = { ...this.children, ...listMessages };
    return this.compile(listMessagesTemplate(this.props as TProps), this.props);
  }
}
