import { Button } from "../../7_shared/Button/Button";
import { Input } from "../../7_shared/Input/Input";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import { getValueById } from "../../8_utils/helpers/getValueById";
import { getLang } from "../../8_utils/langs/getLang";
import s from "./ChooseAvatarModal.module.scss";

const chooseAvatarModalTemplate = `
  <div class=${s["background"]}>
  </div>
  <form class=${s["container-modal"]}>
    <div class=${s["title"]}>
      {{{TypographyTittle}}}
    </div>
    <div class=${s["input-file"]}>
      {{{InputFile}}}
    </div>
    {{{ButtonChangeAvatar}}}
    <div class=${s["cancel-button"]}>
    </div>
     {{{CancelButtonChangeAvatar}}}
  </form>
`;

export type TProps = {
  onClickCancel?: (e: Event) => void;
};

export class ChooseAvatarModal extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
      TypographyTittle: new Typography({
        variant: "h4",
        text: getLang("ChooseAvatarModal.title"),
      }),
      InputFile: new Input({
        inputId: "avatarId",
        nameInput: "avatar",
        value: "",
        variant: "file",

        textLabel: getLang("ChooseAvatarModal.textInput"),
      }),
      ButtonChangeAvatar: new Button({
        id: "ButtonChangeAvatarId",
        disabled: false,
        typeSubmit: true,
        text: getLang("ChooseAvatarModal.buttonText"),
        onClick: (e: Event) => {
          e.preventDefault();
          const avatar = getValueById("avatarId");
          console.log({ avatar });
        },
      }),
      CancelButtonChangeAvatar: new Button({
        id: "CancelButtonChangeAvatarId",
        disabled: false,
        text: getLang("ChooseAvatarModal.cancelButtonText"),
        onClick: props.onClickCancel,
      }),
    });
  }

  override render() {
    return this.compile(chooseAvatarModalTemplate, this.props);
  }
}
