import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import { Block } from "../../8_utils/helpers/block";
import s from "./ModalWithInput.module.scss";
import { Input } from "../Input/Input";

const modalWithInputTemplate = `
  <div class=${s["background"]}>
  </div>
  <form class=${s["container-modal"]}>
    <div class=${s["title"]}>
      {{{TypographyTittle}}}
    </div>
    <div class=${s["input"]}>
      {{{Input}}}
    </div>
    {{{ApplyButton}}}
    <div class=${s["cancel-button"]}>
    </div>
     {{{CancelButton}}}
  </form>
`;

export type TProps = {
  title: string;
  value?: string;
  textLabel: string;
  textApplyButton: string;
  textCancelButton: string;
  onClickApply: (e: Event) => void;
  onClickCancel: () => void;
};

export class ModalWithInput extends Block<TProps> {
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
    return this.compile(modalWithInputTemplate, this.props);
  }
}
