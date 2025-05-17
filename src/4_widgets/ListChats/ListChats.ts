import { TChat } from "../../1_app/types";
import { Input } from "../../7_shared/Input/Input";
import { ItemChat } from "../../7_shared/ItemChat/ItemChat";
import { Link } from "../../7_shared/Link/Link";
import { Block } from "../../8_utils/helpers/block";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ListChats.module.scss";

const listChatsTemplate = (props: TProps) => {
  const listChats = props.chats
    .map((_, index) => `{{{ItemChat${index + 1}}}}`)
    .join("");
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
    <div class=${s["search-input"]}>
    {{{SearchChatInput}}}
    </div>
  </div>
  <div class=${s["list-chats-container"]}>
    ${listChats}
  </div>
`;
};

export type TProps = {
  chats: TChat[];
};

export class ListChats extends Block {
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
        onClick: () => {
          console.log("Переход в профиль");
        },
      }),
      ArrowRightIcon: "",
      SearchChatInput: new Input({
        inputId: "searchChatsId",
        nameInput: "searchChats",
        value: "",
        variant: "text",
        backgroundColor: "grey",
        borderRadius: true,
        textPosition: "center",
        textPlaceholder: getLang("chatsPage.listChats.search"),
      }),
    });
  }

  override render() {
    const listChats = (this.props as TProps).chats.reduce(
      (acc, curr, index) => {
        acc[`ItemChat${index + 1}`] = new ItemChat({
          chat: curr,
          chatId: `ItemChat${index + 1}`,
          onClick: () => {
            console.log("Клик по чату");
          },
          selectedChat: index === 1 ? true : false,
        });
        return acc;
      },
      {} as Record<string, ItemChat>,
    );
    this.children = { ...this.children, ...listChats };
    return this.compile(listChatsTemplate(this.props as TProps), this.props);
  }
}
