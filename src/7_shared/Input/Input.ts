import s from "./Input.module.scss";

export const Input = `
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
