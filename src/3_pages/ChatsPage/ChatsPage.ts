import { ListChats } from "../../4_widgets/ListChats/ListChats";
import { ListMessages } from "../../4_widgets/ListMessages/ListMessages";
import { ModalActionChatWithUser } from "../../5_features/ModalActionChatWithUser/ModalActionChatWithUser";
import {
  TFoundUserInfo,
  TUserFromChat,
} from "../../6_entites/Auth/model/types";
import chatApi from "../../6_entites/Chat/chatApi";
import { ChatStore } from "../../6_entites/Chat/store";
import { TChat, TMessage } from "../../6_entites/Chat/types";
import profileApi from "../../6_entites/Profile/model/profileApi";
import { ProfileStore } from "../../6_entites/Profile/model/store";
import { ActionChatModal } from "../../7_shared/ActionChatModal/ActionChatModal";
import { ModalWithInput } from "../../7_shared/ModalWithInput/ModalWithInput";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { checkAuth } from "../../8_utils/helpers/checkAuth";
import { getValueById } from "../../8_utils/helpers/getValueById";
import { StoreEvents } from "../../8_utils/helpers/store";
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
  searchingUsers?: TFoundUserInfo[];
  listUsersFromChat?: TUserFromChat[];
  messages?: TMessage[];
};

export class ChatsPage extends Block<TProps> {
  constructor() {
    if (checkAuth()) {
      chatApi.getChats({ offset: 0, limit: 10, title: "" });
    }

    ChatStore.on(StoreEvents.UPDATE, () => {
      const store = ChatStore.getState();
      this.setProps({
        messages: store.messages,
        chats: store.chats,
        listUsersFromChat: store.listUsersFromChat,
      });
    });

    ProfileStore.on(StoreEvents.UPDATE, () => {
      const storeState = ProfileStore.getState().searchingUsers;
      this.setProps({
        searchingUsers: storeState,
      });
    });

    super("div", {
      attr: {
        class: `${s["container"]}`,
      },
    });
  }

  override render() {
    const childListMessages =
      this.props.selectedChat !== undefined
        ? new ListMessages({
            chat: this.props.chats[this.props.selectedChat],
            messages: this.props.messages,
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
        onClickApply: (e) => {
          e.preventDefault();

          const title = getValueById("modalInputId");
          chatApi.createChat({ title });
          this.setProps({ openedCreateChatModal: false });
        },
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
          const selectedChatId = ChatStore.getState().selectedChatId;
          chatApi.getUsersFromChat(selectedChatId);
        },
        onClickDeleteChat: (e) => {
          e.preventDefault();

          if (this.props.selectedChat === undefined) return;

          const chatId = ChatStore.getState().chats[this.props.selectedChat].id;
          chatApi.deleteChatById({ chatId: String(chatId) });

          this.setProps({ openedActionChatModal: false });
        },
        onClickCancel: () => {
          this.setProps({ openedActionChatModal: false });
        },
      }),
      AddUserModal: new ModalActionChatWithUser({
        title: getLang("chatsPage.addUserModal.title"),
        textLabel: getLang("chatsPage.addUserModal.label"),
        textApplyButton: getLang("common.buttons.find"),
        textCancelButton: getLang("common.buttons.cancel"),
        searchingUsers: this.props.searchingUsers,
        mode: "addUser",
        onClickApply: (e) => {
          e.preventDefault();

          profileApi.searchUserByLogin({
            login: getValueById("modalInputId"),
          });
        },
        onClickCancel: () => {
          this.setProps({ openedAddUserModal: false });
          ProfileStore.setState({ searchingUsers: [] });
        },
      }),
      DeleteUserModal: new ModalActionChatWithUser({
        title: getLang("chatsPage.deleteUserModal.title"),
        textLabel: getLang("chatsPage.deleteUserModal.label"),
        textApplyButton: getLang("common.buttons.delete"),
        textCancelButton: getLang("common.buttons.cancel"),
        mode: "deleteUser",
        listUsersFromChat: this.props.listUsersFromChat,
        onClickApply: () => {},
        onClickCancel: () => {
          this.setProps({ openedDeleteUserModal: false });
        },
      }),
    };

    return this.compile(chatsPageTemplate(this.props as TProps), this.props);
  }
}
