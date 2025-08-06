import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import s from "./ActionChatModal.module.scss";
import { getLang } from "../../8_utils/langs/getLang";

const modalWithInputTemplate = `
  <div class=${s["background"]}>
  </div>
  <div class=${s["container-modal"]}>
    <div class=${s["title"]}>
      {{{TypographyTittle}}}
    </div>
    {{{AddUserButton}}}
    {{{DeleteUserButton}}}
    {{{DeleteChatButton}}}
    {{{CancelButton}}}
  </div>
`;

export type TProps = {
  onClickAddUser: () => void;
  onClickDeleteUser: () => void;
  onClickDeleteChat: () => void;
  onClickCancel: () => void;
};

export class ActionChatModal extends Block<TProps> {
  constructor(props: TProps) {
    super("form", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
    });
  }

  override render() {
    this.children = {
      ...this.children,
      TypographyTittle: new Typography({
        variant: "h4",
        text: getLang("chatsPage.actionChatModal.title"),
      }),
      AddUserButton: new Button({
        id: "addUserButtonId",
        disabled: false,
        typeSubmit: true,
        text: getLang("chatsPage.actionChatModal.addUserButton"),
        onClick: this.props.onClickAddUser,
      }),
      DeleteUserButton: new Button({
        id: "deleteUserButtonId",
        disabled: false,
        typeSubmit: true,
        text: getLang("chatsPage.actionChatModal.deleteUserButton"),
        onClick: this.props.onClickDeleteUser,
      }),
      DeleteChatButton: new Button({
        id: "deleteChatButtonId",
        disabled: false,
        typeSubmit: true,
        text: getLang("chatsPage.actionChatModal.deleteChatButton"),
        onClick: this.props.onClickDeleteChat,
      }),
      CancelButton: new Button({
        id: "CancelButtonId",
        disabled: false,
        text: getLang("common.buttons.cancel"),
        onClick: this.props.onClickCancel,
      }),
    };
    return this.compile(modalWithInputTemplate, this.props);
  }
}
