import { Block } from "../../8_utils/helpers/block";
import { Typography } from "../Typography/Typography";
import s from "./FileInput.module.scss";

const inputTemplate = `
  <input
 class="${s[`input-file`]}"
id={{inputId}}
name={{nameInput}}
value="{{value}}"
type="file"
accept=".png, .jpg, .jpeg .gif .WebP"
/>
`;

type TProps = {
  value: string;
  nameInput: string;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: Event) => void;
  inputId?: string;
  textLabel?: string;
};

class Input extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      ...props,
    });
  }

  override render() {
    return this.compile(inputTemplate, this.props);
  }
}

const fileInputTemplate = `
{{#if textLabel}}
  <label class="${s["label"]}" for={{inputId}}>
    {{{TypographyFileLabel}}}
  </label>
{{/if}}
{{{input}}}
<div class=${s["text-error"]}>
{{{TypographyError}}}
</div>
`;

export class FileInput extends Block<TProps> {
  constructor(props: TProps) {
    super("div", {
      ...props,
      attr: {
        class: `${s["container"]}`,
      },
    });

    this.setProps(props);
  }

  override render() {
    this.children = {
      ...this.children,
      TypographyFileLabel: new Typography({
        variant: "b6",
        text: this.props.textLabel,
        color: "blue",
      }),
      input: new Input({
        nameInput: "fileInput",
        value: this.props.value,
        onBlur: this.props.onBlur,
        onChange: this.props.onChange,
      }),
    };

    return this.compile(fileInputTemplate, this.props);
  }
}
