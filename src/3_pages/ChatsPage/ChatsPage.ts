import { TChat } from "../../1_app/types";
import { ListChats } from "../../4_widgets/ListChats/ListChats";
import { ListMessages } from "../../4_widgets/ListMessages/ListMessages";
import { Block } from "../../8_utils/helpers/block";
import s from "./ChatsPage.module.scss";

const chatsPageTemplate = `
 {{{ListChats}}}
 {{{ListMessages}}}
`;

type TProps = {
  chats: TChat[];
};

export class ChatsPage extends Block {
  constructor(props: TProps) {
    super("div", {
      attr: {
        class: `${s["container"]}`,
      },
      ListChats: new ListChats(props),
      ListMessages: new ListMessages({ chat: props.chats[0] }),
    });
  }

  override render() {
    return this.compile(chatsPageTemplate, this.props);
  }
}
