import { TUserFromChat } from "../../6_entites/Auth/model/types";
import chatApi from "../../6_entites/Chat/chatApi";
import MessagesSoket from "../../6_entites/Chat/MessagesSoket";
import { ChatStore } from "../../6_entites/Chat/store";
import { TChat, TMessage } from "../../6_entites/Chat/types";
import { ProfileStore } from "../../6_entites/Profile/model/store";
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
  const listMessages = props.messages
    ? props.messages.map((_, index) => `{{{Message_${index}}}}`).join("")
    : "";

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
  <form class=${s["footer"]}>
    <div class=${s["input-container"]}>
      {{{MessageInput}}}
    </div>   
    {{{IconButtonSendMessage}}}
   </form>
`;
};

export type TProps = {
  chat: TChat;
  messages?: TMessage[];
  onOpenActionChatModal: () => void;
};

export class ListMessages extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
      TypographyName: new Typography({
        variant: "h5",
        text: props.chat?.title || "",
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
        submit: true,
        iconSrc: "/icons/arrowRight.svg",
        onClick: () => {
          const message = getValueById("messageInputId");

          if (message.length > 0) {
            MessagesSoket.sendMessage(message);
            chatApi.getChats({ offset: 0, limit: 10, title: "" });
          }
        },
      }),
    });
  }

  override render() {
    const myUser = ProfileStore.getState().myUser;
    const listUsersFromChat = ChatStore.getState().listUsersFromChat;

    const listMessages =
      (this.props as TProps).messages?.reduce(
        (acc, curr, index) => {
          const isMyMessage =
            listUsersFromChat.length > 1
              ? Number(curr.user_id) === myUser.id
              : true;
          const usersFromChat: null | Record<number, TUserFromChat> =
            listUsersFromChat.length > 1
              ? listUsersFromChat.reduce(
                  (acc, curr) => ({
                    ...acc,
                    [curr.id]: curr,
                  }),
                  {},
                )
              : null;
          const nameSenderUser =
            !isMyMessage && usersFromChat
              ? usersFromChat[Number(curr.user_id)]?.login
              : undefined;

          acc[`Message_${index}`] = new Message({
            message: curr,
            messageId: `Message_${index}`,
            isMyMessage: isMyMessage,
            nameSenderUser: nameSenderUser,
          });

          return acc;
        },
        {} as Record<string, Message>,
      ) ?? {};

    this.children = {
      ...this.children,
      ...listMessages,
      IconButtonActionChat: new IconButton({
        id: "IconButtonActionChatId",
        altText: "",
        iconSrc: "/icons/threeDots.svg",
        onClick: this.props.onOpenActionChatModal,
      }),
    };
    return this.compile(listMessagesTemplate(this.props as TProps), this.props);
  }
}
