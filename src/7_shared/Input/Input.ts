import { Block } from "../../8_utils/helpers/block";
import { Typography } from "../Typography/Typography";
import s from "./Input.module.scss";

const inputTemplate = (props: TProps) => {
  const borderRadius = props.borderRadius ? "input_border-radius" : "";
  const upHeight = props.upHeight ? "input_up-height" : "";
  const resultTextLabel =
    props.variant === "file" ? "{{{TypographyFileLabel}}}" : "{{textLabel}}";
  const styleFileLabel = props.variant === "file" ? "label_file" : "";
  return `
{{#if textLabel}}
  <label class="${`${s["label"]} ${s[styleFileLabel]}`}" for={{inputId}}>
    ${resultTextLabel}
  </label>
{{/if}}
<input
 class="${`${s["input"]}
 ${s[`${upHeight}`]}
 ${s[`input_${props.variant}`]}
 ${s[`input_text-${props.textPosition}`]} 
 ${s[`input_background-color-${props.backgroundColor}`]} 
 ${s[`${borderRadius}`]}`}"
id={{inputId}}
name={{nameInput}}
value="{{value}}"
type=${props.variant}
placeholder="${props.textPlaceholder}"
accept=".png, .jpg, .jpeg .gif .WebP"
/>
<div class=${s["text-error"]}>
{{{TypographyError}}}
</div>
`;
};

type TProps = {
  variant: "text" | "password" | "file";
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
      TypographyFileLabel: new Typography({
        variant: "b6",
        text: props.textLabel,
        color: "blue",
      }),
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
