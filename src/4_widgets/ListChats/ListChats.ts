import chatApi from "../../6_entites/Chat/chatApi";
import { ChatStore } from "../../6_entites/Chat/store";
import { TChat } from "../../6_entites/Chat/types";
import { Button } from "../../7_shared/Button/Button";
import { Input } from "../../7_shared/Input/Input";
import { ItemChat } from "../../7_shared/ItemChat/ItemChat";
import { Link } from "../../7_shared/Link/Link";
import { URL_NAMES } from "../../8_utils/constants/type";
import { Block } from "../../8_utils/helpers/block";
import router from "../../8_utils/helpers/router";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ListChats.module.scss";

const listChatsTemplate = (props: TProps) => {
  const listChats =
    props.chats?.length > 0
      ? props.chats.map((_, index) => `{{{ItemChat_${index}}}}`).join("")
      : "";

  return `
  <div class=${s["header"]}>
    <div class=${s["link-back"]}>
    {{{LinkBack}}}
    <div class=${s["icon"]}>
      <img 
        src="/icons/arrowHead.svg"
        alt="${getLang("profilePage.altImageProfile")}"
        />
      </div>
    </div>
    <form class=${s["search-input"]}>
    {{{SearchChatInput}}}
    </form>
    <div class=${s["create-chat-button"]}>
      {{{CreateChatButton}}}
    </div>
  </div>
  <div class=${s["list-chats-container"]}>
    ${listChats}
  </div>
`;
};

export type TProps = {
  chats: TChat[];
  selectedChat?: number;
  onSelectedChat: (index: number) => void;
  onOpenCreateChatModal: () => void;
};

export class ListChats extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
      LinkBack: new Link({
        href: "#",
        variant: "text",
        text: getLang("chatsPage.listChats.linkProfile"),
        color: "grey",
        onClick: (e: Event) => {
          e.preventDefault();
          router.go(URL_NAMES.SETTINGS);
        },
      }),
      SearchChatInput: new Input({
        inputId: "searchChatsId",
        nameInput: "searchChats",
        value: "",
        variant: "text",
        backgroundColor: "grey",
        borderRadius: true,
        textPosition: "center",
        textPlaceholder: getLang("chatsPage.listChats.search"),
        upHeight: true,
      }),
      CreateChatButton: new Button({
        disabled: false,
        id: "createChatButton",
        text: getLang("chatsPage.listChats.createChat"),
        onClick: props.onOpenCreateChatModal,
      }),
    });
  }

  override render() {
    const listChats =
      (this.props as TProps).chats?.reduce(
        (acc, curr, index) => {
          acc[`ItemChat_${index}`] = new ItemChat({
            chat: curr,
            chatId: `ItemChat_${index}`,
            selectedChat: index === this.props.selectedChat ? true : false,
            onClick: (e: Event) => {
              e.stopPropagation();

              this.props.onSelectedChat(index);
              this.setProps({ selectedChat: index });
              ChatStore.setState({ selectedChatId: curr.id });
              chatApi.getUsersFromChat(curr.id);

              if (curr.id) {
                chatApi.getChatToken(curr.id);
              }
            },
          });
          return acc;
        },
        {} as Record<string, ItemChat>,
      ) || {};

    this.children = { ...this.children, ...listChats };
    return this.compile(listChatsTemplate(this.props as TProps), this.props);
  }
}
