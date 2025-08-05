import { TChat } from "../../1_app/types";
import { ListChats } from "../../4_widgets/ListChats/ListChats";
import { ListMessages } from "../../4_widgets/ListMessages/ListMessages";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ChatsPage.module.scss";

const chatsPageTemplate = `
 {{{ListChats}}}
 {{{ListMessages}}}
`;

type TProps = {
  chats: TChat[];
  selectedChat?: number;
};

export class ChatsPage extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
    });
  }

  override render() {
    const childListMessages = this.props.selectedChat
      ? new ListMessages({ chat: this.props.chats[this.props.selectedChat] })
      : new Typography({
          variant: "b5",
          text: getLang("chatsPage.listMessages.unselectedChat"),
          color: "grey",
          textAlign: "center",
        });
    this.children = {
      ...this.children,
      ListChats: new ListChats({
        chats: this.props.chats,
        selectedChat: this.props.selectedChat,
        onSelectedChat: (index) => {
          this.setProps({ selectedChat: index });
        },
      }),
      ListMessages: childListMessages,
    };

    return this.compile(chatsPageTemplate, this.props);
  }
}
