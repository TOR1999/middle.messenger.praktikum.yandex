import profileApi from "../../6_entites/Profile/model/profileApi";
import { Button } from "../../7_shared/Button/Button";
import { FileInput } from "../../7_shared/FileInput/FileInput";
import { Typography } from "../../7_shared/Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
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
  fileName?: string;
  formFile?: HTMLFormElement;
  onClickCancel?: (e: Event) => void;
};

export class ChooseAvatarModal extends Block<TProps> {
  constructor(props: TProps) {
    super("form", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
      TypographyTittle: new Typography({
        variant: "h4",
        text: getLang("ChooseAvatarModal.title"),
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
    this.children = {
      ...this.children,
      InputFile: new FileInput({
        inputId: "avatarId",
        nameInput: "avatar",
        value: this.props.fileName ?? "",
        onChange: (e) => {
          const target = e.target as HTMLInputElement;
          if (!target.files?.[0]) return;
          const fileImg = target.files[0];

          const img = new Image();
          img.src = URL.createObjectURL(fileImg);

          img.onload = () => {
            this.setProps({
              fileName: fileImg.name,
              formFile: document.forms[1],
            });
          };
        },
        textLabel: this.props.fileName
          ? this.props.fileName
          : getLang("ChooseAvatarModal.textInput"),
      }),
      ButtonChangeAvatar: new Button({
        id: "ButtonChangeAvatarId",
        disabled: false,
        typeSubmit: true,
        text: getLang("ChooseAvatarModal.buttonText"),
        onClick: (e: Event) => {
          e.preventDefault();
          if (!this.props.formFile) return;
          const imageFormData = new FormData(this.props.formFile);
          profileApi.changeAvatar(imageFormData);
        },
      }),
    };
    return this.compile(chooseAvatarModalTemplate, this.props);
  }
}
