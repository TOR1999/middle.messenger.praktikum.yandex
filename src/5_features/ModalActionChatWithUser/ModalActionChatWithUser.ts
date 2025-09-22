import {
  TFoundUserInfo,
  TUserFromChat,
} from "../../6_entites/Auth/model/types";
import chatApi from "../../6_entites/Chat/chatApi";
import { ChatStore } from "../../6_entites/Chat/store";
import { Button } from "../../7_shared/Button/Button";
import { Input } from "../../7_shared/Input/Input";
import { ItemFoundUser } from "../../7_shared/ItemFoundUser/ItemFoundUser";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import s from "./ModalActionChatWithUser.module.scss";

const enum modeActionChatWithUser {
  addUser = "addUser",
  deleteUser = "deleteUser",
}

const modalActionChatWithUserTemplate = (props: TProps) => {
  const listSearchingUsers = props?.searchingUsers
    ? props.searchingUsers
        .map((_, index) => `{{{ItemFoundUser${index}}}}`)
        .join("")
    : "";

  const listUsersFromChat = props?.listUsersFromChat
    ? props.listUsersFromChat
        .map((_, index) => `{{{listUserFromChat${index}}}}`)
        .join("")
    : "";

  const listUsers =
    props.mode === modeActionChatWithUser.addUser
      ? listSearchingUsers
      : listUsersFromChat;

  const input =
    props.mode === modeActionChatWithUser.addUser
      ? ` <div class=${s["input"]}>
      {{{Input}}}
    </div>`
      : "";

  const applyButton =
    props.mode === modeActionChatWithUser.addUser
      ? ` {{{ApplyButton}}}
    <div class=${s["cancel-button"]}>
    </div>`
      : "";

  return `
  <div class=${s["background"]}>
  </div>
  <form class=${s["container-modal"]}>
    <div class=${s["title"]}>
      {{{TypographyTittle}}}
    </div>
    ${input}
    <div class=${s["found-user"]}> ${listUsers} </div>
    ${applyButton}
     {{{CancelButton}}}
  </form>
`;
};

export type TProps = {
  title: string;
  value?: string;
  textLabel: string;
  textApplyButton: string;
  textCancelButton: string;
  mode: "addUser" | "deleteUser";
  searchingUsers?: TFoundUserInfo[];
  listUsersFromChat?: TUserFromChat[];
  onClickApply: (e: Event) => void;
  onClickCancel: () => void;
};

export class ModalActionChatWithUser extends Block<TProps> {
  constructor(props: TProps) {
    super("form", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
    });
  }

  override render() {
    const listSearchingUsers =
      (this.props as TProps).searchingUsers?.reduce(
        (acc, curr, index) => {
          acc[`ItemFoundUser${index}`] = new ItemFoundUser({
            login: curr.login,
            onClick: (e: Event) => {
              e.stopPropagation();
              const chatId = ChatStore.getState().selectedChatId;

              chatApi.addUsersToChat({ users: [curr.id], chatId });
            },
          });
          return acc;
        },
        {} as Record<string, ItemFoundUser>,
      ) || {};

    const listUserFromChat =
      (this.props as TProps).listUsersFromChat?.reduce(
        (acc, curr, index) => {
          acc[`listUserFromChat${index}`] = new ItemFoundUser({
            login: curr.login,
            role: curr.role,
            onClick: (e: Event) => {
              e.stopPropagation();
              const chatId = ChatStore.getState().selectedChatId;

              chatApi.deleteUsersToChat({ users: [curr.id], chatId });
            },
          });
          return acc;
        },
        {} as Record<string, ItemFoundUser>,
      ) || {};

    this.children = {
      ...this.children,
      ...listSearchingUsers,
      ...listUserFromChat,
      TypographyTittle: new Typography({
        variant: "h4",
        text: this.props.title,
      }),
      Input: new Input({
        inputId: "modalInputId",
        nameInput: "modalInput",
        variant: "text",
        value: this.props.value || "",
        textLabel: this.props.textLabel,
        backgroundColor: "grey",
        borderRadius: true,
        upHeight: true,
      }),
      ApplyButton: new Button({
        id: "ApplyButtonId",
        disabled: false,
        typeSubmit: true,
        text: this.props.textApplyButton,
        onClick: this.props.onClickApply,
      }),
      CancelButton: new Button({
        id: "CancelButtonId",
        disabled: false,
        text: this.props.textCancelButton,
        onClick: this.props.onClickCancel,
      }),
    };

    return this.compile(
      modalActionChatWithUserTemplate(this.props),
      this.props,
    );
  }
}
