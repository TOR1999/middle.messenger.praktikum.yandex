import { Block } from "../../8_utils/helpers/block";
import { Typography } from "../Typography/Typography";
import s from "./Input.module.scss";

const inputTemplate = (props: TProps) => {
  const borderRadius = props.borderRadius ? "input_border-radius" : "";
  const upHeight = props.upHeight ? "input_up-height" : "";
  return `
{{#if textLabel}}
  <label class=${s["label"]} for={{inputId}}>
    {{textLabel}}
  </label>
{{/if}}
<input
 class="${`${s["input"]}
 ${s[`${upHeight}`]}
 ${s[`input_text-${props.textPosition}`]} 
 ${s[`input_background-color-${props.backgroundColor}`]} 
 ${s[`${borderRadius}`]}`}"
id={{inputId}}
name={{nameInput}}
value="{{value}}"
type=${props.variant}
placeholder=${props.textPlaceholder}
/>
<div class=${s["text-error"]}>
{{{TypographyError}}}
</div>
`;
};

type TProps = {
  variant: "text" | "password";
  value: string;
  nameInput: string;
  onBlur?: (e: Event) => void;
  textPlaceholder?: string;
  textPosition?: "right" | "center";
  inputId?: string;
  textLabel?: string;
  textError?: string;
  backgroundColor?: "grey";
  borderRadius?: boolean;
  upHeight?: boolean;
};

export class Input extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
      TypographyError: new Typography({
        variant: "b6",
        text: props.textError,
        color: "red",
      }),
    });
  }

  override render() {
    return this.compile(inputTemplate(this.props as TProps), this.props);
  }
}
