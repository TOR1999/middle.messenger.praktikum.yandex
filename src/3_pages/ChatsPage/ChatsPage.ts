import { TChat } from "../../1_app/types";
import { ListChats } from "../../4_widgets/ListChats/ListChats";
import { ListMessages } from "../../4_widgets/ListMessages/ListMessages";
import { ActionChatModal } from "../../7_shared/ActionChatModal/ActionChatModal";
import { ModalWithInput } from "../../7_shared/ModalWithInput/ModalWithInput";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ChatsPage.module.scss";

const chatsPageTemplate = (props: TProps) => {
  const CreateChatModal = props.openedCreateChatModal
    ? "{{{CreateChatModal}}}"
    : "";
  const ActionChatModal = props.openedActionChatModal
    ? "{{{ActionChatModal}}}"
    : "";
  const AddUserModal = props.openedAddUserModal ? "{{{AddUserModal}}}" : "";
  const DeleteUserModal = props.openedDeleteUserModal
    ? "{{{DeleteUserModal}}}"
    : "";

  return `
  ${CreateChatModal}
  ${ActionChatModal}
  ${AddUserModal}
  ${DeleteUserModal}
 {{{ListChats}}}
 {{{ListMessages}}}
`;
};

type TProps = {
  chats: TChat[];
  selectedChat?: number;
  openedCreateChatModal?: boolean;
  openedActionChatModal?: boolean;
  openedAddUserModal?: boolean;
  openedDeleteUserModal?: boolean;
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
      ? new ListMessages({
          chat: this.props.chats[this.props.selectedChat],
          onOpenActionChatModal: () => {
            this.setProps({ openedActionChatModal: true });
          },
        })
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
        onOpenCreateChatModal: () => {
          this.setProps({ openedCreateChatModal: true });
        },
      }),
      ListMessages: childListMessages,
      CreateChatModal: new ModalWithInput({
        title: getLang("chatsPage.createChatModal.title"),
        textLabel: getLang("chatsPage.createChatModal.label"),
        textApplyButton: getLang("common.buttons.add"),
        textCancelButton: getLang("common.buttons.cancel"),
        onClickApply: () => {},
        onClickCancel: () => {
          this.setProps({ openedCreateChatModal: false });
        },
      }),
      ActionChatModal: new ActionChatModal({
        onClickAddUser: () => {
          this.setProps({
            openedActionChatModal: false,
            openedAddUserModal: true,
          });
        },
        onClickDeleteUser: () => {
          this.setProps({
            openedActionChatModal: false,
            openedDeleteUserModal: true,
          });
        },
        onClickDeleteChat: () => {
          this.setProps({ openedActionChatModal: false });
        },
        onClickCancel: () => {
          this.setProps({ openedActionChatModal: false });
        },
      }),
      AddUserModal: new ModalWithInput({
        title: getLang("chatsPage.addUserModal.title"),
        textLabel: getLang("chatsPage.addUserModal.label"),
        textApplyButton: getLang("common.buttons.add"),
        textCancelButton: getLang("common.buttons.cancel"),
        onClickApply: () => {},
        onClickCancel: () => {
          this.setProps({ openedAddUserModal: false });
        },
      }),
      DeleteUserModal: new ModalWithInput({
        title: getLang("chatsPage.deleteUserModal.title"),
        textLabel: getLang("chatsPage.deleteUserModal.label"),
        textApplyButton: getLang("common.buttons.delete"),
        textCancelButton: getLang("common.buttons.cancel"),
        onClickApply: () => {},
        onClickCancel: () => {
          this.setProps({ openedDeleteUserModal: false });
        },
      }),
    };

    return this.compile(chatsPageTemplate(this.props as TProps), this.props);
  }
}
