import { Block } from "../../8_utils/helpers/block";
import s from "./Input.module.scss";

const inputTemplate = `
{{#if textLabel}}
  <label class=${s["label"]} for={{inputId}}>
    {{textLabel}}
  </label>
{{/if}}
<input
{{#if (isSimpleEquals classStyle "textRight")}}
  class="${`${s["input"]} ${s["input_text_right"]}`}"
{{else}}
  class=${s["input"]}
{{/if}}
id={{inputId}}
name={{nameInput}}
value="{{value}}"
{{#if (isSimpleEquals variant "text")}} 
  type=text
{{/if}}
{{#if (isSimpleEquals variant "password")}} 
  type=password
{{/if}}
{{#if textPlaceholder}}
  placeholder={{textPlaceholder}}
{{/if}}
/>
`;

export type TProps = {
  variant: "text" | "password";
  value: string;
  nameInput: string;
  textPlaceholder?: string;
  classStyle?: "textRight";
  inputId?: string;
  textLabel?: string;
};

export class Input extends Block {
  constructor(props: TProps) {
    super("div", { ...props });
  }

  override render() {
    return this.compile(inputTemplate, this.props);
  }
}
