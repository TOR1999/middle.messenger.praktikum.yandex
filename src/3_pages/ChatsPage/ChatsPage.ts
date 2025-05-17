import { TChat } from "../../1_app/types";
import { ListChats } from "../../4_widgets/ListChats/ListChats";
import { ListMessages } from "../../4_widgets/ListMessages/ListMessages";
import { Block } from "../../8_utils/helpers/block";
import s from "./ChatsPage.module.scss";

const chatsPageTemplate = `
<div class=${s["container"]}>
 {{{ListChats}}}
 {{{ListMessages}}}
</div>
`;

type TProps = {
  chats: TChat[];
};

export class ChatsPage extends Block {
  constructor(props: TProps) {
    super("div", {
      ListChats: new ListChats(props),
      ListMessages: new ListMessages({ chat: props.chats[0] }),
    });
  }

  override render() {
    return this.compile(chatsPageTemplate, this.props);
  }
}
